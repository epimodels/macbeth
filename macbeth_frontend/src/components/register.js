import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

//Bootstrap
import { Form, Button } from 'react-bootstrap';

export default function Register() {
    const history = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        date_of_birth: '',
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

        axiosInstance
            .post('auth/register/', {
                email: formData.email,
                password: formData.password,
                firstname: formData.firstname,
                lastname: formData.lastname,
                date_of_birth: formData.date_of_birth,
            })
            .then((res) => {
                history('/account/sign-in');
                console.log(res);
                console.log(res.data);
            });
    };

    return (
        <div className="d-flex
            justify-content-center align-items-center">
            <Form className="rounded p-4 p-sm-3">
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your first name" name="firstname" onChange={handleChange} />
                    <Form.Control type="text" placeholder="Enter your last name" name="lastname" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formDOB">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" placeholder="Enter your date of birth" name="date_of_birth" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlID="formPasswordConfirmation">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="confirmPassword" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
            </Form>
        </div>
    );
}