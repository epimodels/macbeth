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



const ParameterEdit = (props) => {
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
    axiosInstance
      .get('/compute/models/' + URLparams.modelid + '/', {})
      .then(res => {
        setParameters(res.data.Parameters);
        setAuthor(res.data.Author);
        setDescription(res.data.Description);
        localStorage.setItem('compute-selected-model-graph', JSON.stringify(res.data.GraphingData));
      })
  }, [URLparams.modelid]);

  return(
    <div>
        <h4>{localStorage.getItem('compute-selected-model-name')}</h4>
        <span className={'text-muted'} style={{'marginBottom':'2%'}}>{author}</span><br />
        <span className={'text-muted'} style={{'marginBottom':'2%'}}>{description}</span>
        <Progress currentStep={2} />
        <h4 style={{'marginBottom':'2%'}}>Edit Parameters</h4>
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
        <Button label ='Submit' onClick={createJob}>Submit</Button>
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