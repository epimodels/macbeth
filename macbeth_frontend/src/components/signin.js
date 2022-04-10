import {React, useState} from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

// React Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'




// React sign in component
// Accepts a username and password as input

export default function SignIn() {
  const history = useNavigate();
  const initialFormData = Object.freeze({
    email: '',
    password: '',
    visiblePassword: false,
  })

    const [formData, updateformData] = useState(initialFormData);

    const handleChange = (e) => {
      updateformData({
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
          <h1>Sign In</h1>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formUsername">
              <Form.Label column sm={2}>
                Username:
              </Form.Label>
              <Col sm={4}>
                <Form.Control type="text" name="email" placeholder="Enter username" onChange={handleChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlID="formPassword">
              <Form.Label column sm={2}>Password:</Form.Label>
              <Col sm={4}>
                <Form.Control type={formData.visiblePassword ? "text" : "password"} name = "password" placeholder="Enter password" onChange={handleChange} />
              </Col>
              <Col sm={2}>
                <FontAwesomeIcon icon={formData.visiblePassword ? faEyeSlash : faEye} id="togglepassword" onClick={() => updateformData({...formData, visiblePassword: !formData.visiblePassword})} />
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit} >Sign In</Button>
          </Form>
        </div>
      </Container>
    );
}