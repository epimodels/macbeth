import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import {Row, Col, Button} from 'react-bootstrap'
import NavButton from '../nav_button'
import Progress from '../compute/progress'
import Parameter from './parameter'
import axiosInstance from '../../axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/*
 * Sub-page of Compute
 * Future: if no parameters are received, show an error screen (with potentially a report a bug button?)
 */



const ParameterEdit = ({ modelID, modelParams, setModelParams, setModelInfo, setModelGraphing }) => {
  const URLparams = useParams();
  const [parameters, setParameters] = useState([]);
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate

  function createJob()
  {
    const parameterInput = JSON.parse(localStorage.getItem('compute-selected-model-params'));
    let data = {
      "model_id" : localStorage.getItem('compute-selected-model'),
      "created_by" : 1,
      "input_params" : parameterInput
    }
    console.log(data)

    axiosInstance
      .post('compute/job/', data)
      .then(res => {
        console.log(res.data)
        window.location.href = window.location.origin + "/results/" + res.data.job_id
      })

  }

  useEffect(() => {
    if (modelID !== -1) {
      axiosInstance
        .get('/compute/models/' + modelID + '/', {})
        .then(res => {
          setModelParams(res.data.Parameters);
          setModelInfo({ "Author": res.data.Author, "Description": res.data.Description });
          setModelGraphing(res.data.GraphingData);
        })
      }
  }, [URLparams.modelid]);

  return(
    <div style={{"overflow-x":"hidden","overflow-y":"scroll", "maxHeight": "45vh"}}>
      <h3>Model Parameters</h3>
      <Form>
        <Row className='justify-content-center'>
        {(Array.isArray(modelParams) && modelParams.length) ?
              modelParams.map((item, idx) => {
                return (
                  <Col xs={'auto'} key={item.Name}>
                    <Parameter controlid='default' type='basicDefault'
                      modelParams={modelParams}
                      setModelParams={setModelParams}
                      label={item.Name}
                      variableName={item.VariableName}
                      placeholder={item.DefaultValue}
                      text={item.Description} />
                  </Col>
                )
              }) : <div/>}
        </Row>
      </Form>
      </div>
  )
}










/*ParameterEdit.defaultProps = {
  // This is for testing only
  parameters: [<Parameter controlId='formBasicParameter' label='Parameter1' type='parameter' placeholder='enter parameter here'/>,
              <Parameter controlId='formBasicParameter' label='Parameter2' type='parameter' placeholder='enter parameter here'/>,
              <Parameter controlId='formBasicParameter' label='Parameter3' type='parameter' placeholder='enter parameter here'/>]
}*/

export default ParameterEdit;
