import sys
import zmq
import psycopg2
from settings import HOST_SETTINGS, DATABASE_SETTINGS
import json

# add parent directory to python path so we can find the backend modules
sys.path.append('../macbeth')

# import remaining required elements
from macbeth_backend import COMPUTE_MODELS, ComputeModel
from macbeth_backend.computations.config import Config
from rest_framework_dataclasses.serializers import DataclassSerializer

# set up contexts
context = zmq.Context()
receiver = context.socket(zmq.PULL)
binding = "tcp://{}:{}".format(HOST_SETTINGS['ADDRESS'], HOST_SETTINGS['PORT'])
print("Establishing connection to host at {}".format(binding))
receiver.connect(binding)

# helpers
MODEL_TO_CONF_DICT = {}
for model in COMPUTE_MODELS:
    MODEL_TO_CONF_DICT[model.name] = model


# create DB connection
def connect_to_db():
    return psycopg2.connect(
        host=DATABASE_SETTINGS['HOST'],
        database=DATABASE_SETTINGS['NAME'],
        user=DATABASE_SETTINGS['USER'],
        password=DATABASE_SETTINGS['PASSWORD'],
        port=DATABASE_SETTINGS['PORT'])


def get_job(jobid):
    """get job information from the table"""
    try:
        conn = connect_to_db()
        with conn.cursor() as cur:
            cur.execute("SELECT id, model_id, input_params FROM macbeth_backend_job WHERE id = {}".format(jobid))
            jobresult = cur.fetchone()
            job = {
                "id": jobresult[0],
                "model_id": jobresult[1],
                "params": jobresult[2],
            }
            return job
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


def update_job_results(jobid, results):
    """write the results of the job to the table"""
    sql = """ UPDATE macbeth_backend_job
                SET results = %s
                WHERE id = %s"""
    conn = None
    try:
        conn = connect_to_db()
        with conn.cursor() as cur:
            print(len(json.dumps(results)))
            cur.execute(sql, (json.dumps(results), jobid))
            conn.commit()
            cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


def main():
    while True:
        print("Waiting for job assignment.")
        s = receiver.recv()
        print("Received compute request for job {}".format(s))
        jobid = int(s)
        job = get_job(jobid)
        model_info: ComputeModel = MODEL_TO_CONF_DICT[job['model_id']]
        kwargs = Config.generate_kwargs_for_obj(model_info.model, job['params'])
        computed_result = model_info.model(**kwargs).compute_model()
        serializer = DataclassSerializer(instance=computed_result, dataclass=type(computed_result))
        update_job_results(jobid, serializer.data)
        print("Results for {} saved to database.".format(jobid))


main()
