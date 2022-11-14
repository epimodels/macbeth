import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import Parameter from './parameter';
import axiosInstance from '../../axios';

/*
 * Sub-page of Compute
 */

const ParameterEdit = ({ modelID, modelParams, setModelParams, setModelInfo, setModelGraphing }) => {
  useEffect(() => {
    if (modelID !== -1)
    {
      axiosInstance
      .get('/compute/models/' + modelID + '/', {})
      .then(res => {
        setModelParams(res.data.Parameters);
        setModelInfo({ "Author": res.data.Author, "Description": res.data.Description });
        setModelGraphing(res.data.GraphingData);
      })
    }
  }, [modelID, setModelParams, setModelInfo, setModelGraphing]);

  return(
    <div style={{"overflow-x":"hidden","overflow-y":"scroll", "maxHeight": "50vh"}}>
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