import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

//Bootstrap
import { Form, Row, Col } from 'react-bootstrap';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import NavButton from '../nav_button'

export default function Register() {
  const history = useNavigate();
  const initialFormData = Object.freeze({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    over13: '',
  })

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // trimming whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // ensure that password and password confirmation match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    } 
    
    axiosInstance
      .post('auth/register/', {
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        over13: formData.over13,
      })
      .then((res) => {
        history('/account/sign-in');
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <div>
      <h2 style={{'margin-top':'2%'}}>Register an Account</h2>
      <Form>
        <Form.Group as={Row} controlId="formEmail" className="justify-content-center" style={{'margin-top':'3%'}}>
          <Form.Label column sm={1} style={{display:'flex',justifyContent:'right'}}>
            email:
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
          </Col>
          <Col sm={1}></Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formName" className="justify-content-center" style={{'margin-top':'1%'}}>
          <Form.Label column sm={1} style={{display:'flex',justifyContent:'right'}}>
            nickname:
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="text" placeholder="Enter your nickname" name="nickname" onChange={handleChange} />
          </Col>
          <Col sm={1}></Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPassword" className="justify-content-sm-center" style={{'margin-top':'1%'}}>
          <Form.Label column sm={1} style={{display:'flex',justifyContent:'right'}}>
            password:
          </Form.Label>
          <Col sm={3}>
            <Form.Control type={formData.visiblePassword1 ? "text" : "password"} placeholder="Password" name="password" onChange={handleChange} />
          </Col>
          <Col sm={1}>
            <FontAwesomeIcon icon={formData.visiblePassword1 ? faEyeSlash : faEye} id="togglepassword1" onClick={() => updateFormData({...formData, visiblePassword1: !formData.visiblePassword1})} style={{'margin-top':'10%', 'margin-left':'-100%'}}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlID="formPasswordConfirmation" className="justify-content-center" style={{'margin-top':'1%'}}>
          <Form.Label column sm={1} style={{display:'flex',justifyContent:'right'}}>
            repeat password:
          </Form.Label>
          <Col sm={3}>
            <Form.Control type={formData.visiblePassword2 ? "text" : "password"}  placeholder="Password" name="confirmPassword" onChange={handleChange} />
          </Col>
          <Col sm={1}>
            <FontAwesomeIcon icon={formData.visiblePassword2 ? faEyeSlash : faEye} id="togglepassword2" onClick={() => updateFormData({...formData, visiblePassword2: !formData.visiblePassword2})} style={{'margin-top':'10%', 'margin-left':'-100%'}}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formOver13" className="justify-content-center" style={{'margin-top':'2%', 'margin-bottom':'2%'}}>
        <Col sm={3}>
          <Form.Check type="checkbox" label="By checking this box, I verify that I am over 13 years old" name="over13" onChange={handleChange} />
        </Col>
        </Form.Group>
        <NavButton label="Register" variant="account" clickEvent={handleSubmit}/>
      </Form>
    </div>
  );
}