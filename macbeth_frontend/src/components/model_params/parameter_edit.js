import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap'
import NavButton from '../nav_button'
import Progress from '../progress'
import Parameter from './parameter'
import axiosInstance from '../../axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

/*
 * Sub-page of Compute
 * Future: if no parameters are received, show an error screen (with potentially a report a bug button?)
 */

const ParameterEdit = (props) => {
  const [rowNum, setRowNum] = useState('');
  const URLparams = useParams();
  const [parameters, setParameters] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/compute/models/' + URLparams.modelid +'/', {})
      .then(res => {
        setParameters(res.data.Parameters);
      })
    }
  , []);

  const _create2dArray = () => {
    let rows = [[], []];
    let cols = 1;
    parameters.forEach((parameter, idx) => {
      if (idx % rowNum === 0 && idx !== 0) {
        cols++;
        rows.push([]);
        rows[cols].push(parameter);
      } else {
        rows[cols].push(parameter);
      }
    })
    return rows;
  }

  return(
    <div>
        <h4 style={{'margin-bottom':'2%'}}>{localStorage.getItem('compute-selected-model-name')}</h4>
        <Progress currentStep={2} />
        <h4 style={{'margin-bottom':'2%'}}>Edit Parameters</h4>
        <Form> {/* dynamically organizes the parameters into rows and columns based on number */}
          <Row className='justify-content-center'>
            {parameters.map((item, idx) => {
              return (
                <Col xs={'auto'}>
                  <Parameter controlID='default' label={item.Name} type='basicDefualt' 
                    placeholder={item.DefaultValue} 
                    text={item.Description} />
                </Col>
              )
            })}
          </Row>
        </Form>
        <NavButton label='Back' redirect='/compute/model-select' variant='prev'/>
        <NavButton label='Next' redirect='/compute/results' variant='next'/>
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