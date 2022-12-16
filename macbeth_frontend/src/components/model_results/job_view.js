import React from 'react';
import ResultsGraph from './results_graph';
import axiosInstance from '../../axios';
import { useHref, useParams } from 'react-router-dom';
import { TestColor, GetNextColor, GetCertainColor } from './color_manager';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import ParameterEdit from '../model_params/parameter_edit';
import JobParameterView from '../model_params/job_parameter_view';

/*
 * Sub-page of Results
 */
export default function JobView() {
  const {job_id} = useParams();

  const [xData, setXData] = React.useState([]);
  const [yData, yDataDispatch] = React.useReducer(yDataReducer, []);
  const [title, setTitle] = React.useState([]);
  const [pending, setPending] = React.useState(true);
  const [type, setType] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [parameters, setParameters] = React.useState([]);
  const [parameterInfo, setParameterInfo] = React.useState([]);

  /*
   * Reducer function for the datasets that are the y-axis (updating just the data)
   */
  function yDataReducer(state, action) {
    for (let i = 0; i < action.yOutput.length; i++)
    {
      state[i] = {};
      state[i].label = action.yOutput[i].Name;
      state[i].data = action.yData[action.yOutput[i].VariableName];

      // **Setting color**
      const color = action.yOutput[i]["Color"];
      if (color !== undefined) {
        // If in config, is it already in hexadecimal?
        if (TestColor(color)) state[i].borderColor = color;
        else state[i].borderColor = GetCertainColor(color);
      }
      // Not set in config? Get default color
      else state[i].borderColor = GetNextColor(i);

      // Add 60 to the end of the hexadecimal to make backgroundColor sorta transparent
      state[i].backgroundColor = state[i].borderColor + "60";

      // **Setting line type**
      const lineType = action.yOutput[i]["LineType"];
      switch (lineType) {
        case 'dashed':
          state[i].borderDash = [10, 10];
          break;
        case 'dotted':
          state[i].borderDash = [5, 5];
          break;
        case 'dotdash':
          state[i].borderDash = [15, 5, 3, 5];
          break;
        case 'longdash':
          state[i].borderDash = [20, 5];
          break;
        case 'twodash':
          state[i].borderDash = [20, 3, 5, 3];
          break;
        case 'solid':
        default: // default behavior is solid
          state[i].borderDash = [];
          break;
      }

    }
    return [...state];
  }

  const getJobResult = async () => {
    let jobData = ""
    axiosInstance
        .get('compute/job/'+ job_id + "/")
        .then(res => {
            jobData = res.data
            if(res.data.status == 1) // complete
            {
                setPending(false)
                axiosInstance
                  .get('/compute/models/' + jobData.model_id + '/', {})
                  .then(res => {
                    let graphingOutput = res.data.GraphingData;
                    let jobDataResults = JSON.parse(jobData.results)
                    setXData(jobDataResults[graphingOutput.X.VariableName]);
                    yDataDispatch( { yOutput: graphingOutput.Y, yData: jobDataResults } );

                    setTitle(jobData.model_id)
                    setAuthor(res.data.Author)
                    setDescription(res.data.Description)
                    setType(res.data.Type)

                    setParameters(jobData.input_params)
                    setParameterInfo(res.data.Parameters)
              })
            }
        })
        .catch((err) => {
            window.location.href = window.location.origin
            // TODO: Add error message when we get flashes to work.
        })
  }

  React.useEffect(() => {
    getJobResult();
  },[]);

  return (

    <div>
        {(pending == false) ?
        <Container>
            <h4>Viewing Results of Job {job_id}</h4>
            <Row style={{ 'marginTop': '5%', 'marginBottom': '5%' }}>
              <Col>
                <Stack gap={5}>
                  <ResultsGraph title={title} xData={xData} yData={yData}/>
                </Stack>
              </Col>
              <Col>
                <h4>Details</h4>
                <p>{title} - {author}</p>
                <p>{description}</p>
              </Col>
            </Row>
            <Row>
  <Col>
    <Container style={{ overflowX: "hidden", overflowY: "scroll", maxHeight: "45vh", marginBottom: "70px" }}>
      <Stack gap={5}>
        <h4>Inputs</h4>
        <Row>
          {parameterInfo.map((param) => {
            const paramName = param.Name;
            const paramValue = parameters[param.VariableName];
            const paramDescription = param.Description;
            return (
              <Col>
                <JobParameterView name={paramName} value={paramValue} description={paramDescription} />
              </Col>
            );
          })}
        </Row>
      </Stack>
    </Container>
  </Col>
</Row>
        </Container> :
        <Container>
            <h4>Your model is currently running!</h4>
            <p>Please wait a bit before refreshing the page.</p>
            <Button onClick={getJobResult}>Refresh</Button>
        </Container>
         }
    </div>
  )
}
