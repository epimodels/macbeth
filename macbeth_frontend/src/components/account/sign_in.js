import {React, useState} from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

// React Bootstrap
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import NavButton from '../nav_button'


// React sign in component
// Accepts a username and password as input

export default function SignIn() {
  const history = useNavigate();
  const initialFormData = Object.freeze({
    email: '',
    password: '',
    visiblePassword: false,
  })

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axiosInstance
      .post('auth/login/', {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        axiosInstance.defaults.headers['Authorization'] =
          'JWT ' + localStorage.getItem('access_token');
        history('/');
        console.log(res);
        console.log(res.data);
      });
  };

    return (
      <Container>
        <div className="signin">
          <h2 style={{'margin-top':'3%'}}>Sign In</h2>
          <Form>
            <Form.Group as={Row} controlId="formUsername" className="justify-content-center" style={{'marginTop':'5%'}}>
              <Form.Label column sm={1} style={{display:'flex',justifyContent:'right'}}>
                email:
              </Form.Label>
              <Col sm={4}>
                <Form.Control type="text" name="email" placeholder="Enter email" onChange={handleChange} />
              </Col>
              <Col sm={1}></Col>
            </Form.Group>
            <Form.Group as={Row} controlID="formPassword" className="justify-content-center" style={{'marginTop':'2%', 'marginBottom':'3%'}}>
              <Form.Label column sm={1} style={{display:'flex',justifyContent:'right'}}>
                password:
              </Form.Label>
              <Col sm={4}>
                <Form.Control type={formData.visiblePassword ? "text" : "password"} name = "password" placeholder="Enter password" onChange={handleChange} />
              </Col>
              <Col sm={1}>
                <FontAwesomeIcon icon={formData.visiblePassword ? faEyeSlash : faEye} id="togglepassword" onClick={() => updateFormData({...formData, visiblePassword: !formData.visiblePassword})} style={{'marginTop':'10%', 'marginLeft':'-100%'}}/>
              </Col>
            </Form.Group>
            <NavButton label="Sign In" variant="nextnopos" clickEvent={handleSubmit} />
          </Form>
        </div>
      </Container>
    );
}