import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import {Row, Col, Button, Container, Nav} from 'react-bootstrap'
import NavButton from '../nav_button'
import Progress from '../compute/progress'
import Parameter from './parameter'
import axiosInstance from '../../axios';
import useLocalStorage from '../useLocalStorage';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/*
 * Sub-page of Compute
 * Future: if no parameters are received, show an error screen (with potentially a report a bug button?)
 */



const ParameterEdit = ({ modelID, modelParams, modelParamsInfo, setModelParams, setModelParamsInfo, setModelInfo }) => {

  useEffect(() => {
    if (modelID !== -1) {
      axiosInstance
        .get('/compute/models/' + modelID + '/', {})
        .then(res => {
          console.log(res.data.Parameters);
          setModelParamsInfo(res.data.Parameters);
          setModelInfo({ "Author": res.data.Author, "Description": res.data.Description });
          console.log('MODEL PARAMS INFO')
          console.log(modelParamsInfo)
          console.log('MODEL PARAMS')
          console.log(modelParams)
        })
      }
  }, [modelID]);

  return(
    <Container>
    <Container style={{"overflow-x":"hidden","overflow-y":"scroll", "maxHeight": "45vh", 'marginBottom': '70px'}}>
      <h3>Model Parameters</h3>
      <Form>
        <Row className='justify-content-center'>
        {(Array.isArray(modelParamsInfo) && modelParamsInfo.length) ?
              modelParamsInfo.map((item, idx) => {
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
      </Container>
      </Container>
  )
}










/*ParameterEdit.defaultProps = {
  // This is for testing only
  parameters: [<Parameter controlId='formBasicParameter' label='Parameter1' type='parameter' placeholder='enter parameter here'/>,
              <Parameter controlId='formBasicParameter' label='Parameter2' type='parameter' placeholder='enter parameter here'/>,
              <Parameter controlId='formBasicParameter' label='Parameter3' type='parameter' placeholder='enter parameter here'/>]
}*/

export default ParameterEdit;
