
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist

from macbeth_backend.models.jobs.job import Job


class JobSerializer(serializers.ModelSerializer):
    '''Serializer for creating a new Job
    '''

    class Meta:
        '''Meta class for the JobSerializer
        '''
        model = Job
        fields = ('model_id', 'created_by', 'input_params',
                  )

    def create(self, validated_data):
        '''
        Creates a new job with the validated data
        :param: validated_data
        '''
        job = Job.objects.create_job(**validated_data)
        return job

    def get_job(self, id):
        '''
        Returns a job with the passed id
        :param: id
        :return: job
        '''
        try:
            job = Job.objects.get(id=id)
        except ObjectDoesNotExist:
            job = None
        return job
