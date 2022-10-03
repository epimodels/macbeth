import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap'
import NavButton from '../nav_button'
import Progress from '../compute/progress'
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
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    axiosInstance
      .get('/compute/models/' + URLparams.modelid + '/', {})
      .then(res => {
        setParameters(res.data.Parameters);
        setAuthor(res.data.Author);
        setDescription(res.data.Description);
        localStorage.setItem('compute-selected-model-graph', JSON.stringify(res.data.GraphingData));
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
        <h4>{localStorage.getItem('compute-selected-model-name')}</h4>
        <span class={'text-muted'} style={{'margin-bottom':'2%'}}>{author}</span><br />
        <span class={'text-muted'} style={{'margin-bottom':'2%'}}>{description}</span>
        <Progress currentStep={2} />
        <h4 style={{'margin-bottom':'2%'}}>Edit Parameters</h4>
        <Form> {/* dynamically organizes the parameters into rows and columns based on number */}
          <Row className='justify-content-center'>
            {parameters.map((item, idx) => {
              return (
                <Col xs={'auto'} key={item.Name}>
                  <Parameter controlID='default' type='basicDefault' 
                    label={item.Name} 
                    variableName={item.VariableName}
                    placeholder={item.DefaultValue} 
                    text={item.Description} />
                </Col>
              )
            })}
          </Row>
        </Form>
        <NavButton label='Back' redirect='/compute/model-select' variant='prev'/>
        <NavButton label='Submit' redirect={'/compute/results/' + localStorage.getItem('compute-selected-model')} variant='next'/>
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