import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap'
import NavButton from '../nav_button'
import Progress from '../compute/progress'
import Parameter from './parameter'
import axiosInstance from '../../axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useLocalStorage from '../useLocalStorage';

/*
 * Sub-page of Compute
 */

const ParameterEdit = (props) => {
  useEffect(() => {
    if (props.modelID != -1)
    {
      axiosInstance
      .get('/compute/models/' + props.modelID + '/', {})
      .then(res => {
        props.setModelParams(res.data.Parameters);
        props.setModelInfo({ "Author": res.data.Author, "Description": res.data.Description });
        props.setModelGraphing(res.data.GraphingData);
      })
    }
  }, [props.modelID]);

  return(
    <div>
        <Form> {/* dynamically organizes the parameters into rows and columns based on number */}
          <Row className='justify-content-center'>
            {(Array.isArray(props.modelParams) && props.modelParams.length) ? 
              props.modelParams.map((item, idx) => {
                return (
                  <Col xs={'auto'} key={item.Name}>
                    <Parameter controlID='default' type='basicDefault' 
                      modelParams={props.modelParams}
                      setModelParams={props.setModelParams}
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