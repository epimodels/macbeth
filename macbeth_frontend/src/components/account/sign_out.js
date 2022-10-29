import React, { useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

export default function SignOut() {
  const history = useNavigate();

  useEffect(() => {
    axiosInstance
      .post('auth/logout/', {
        refresh_token: localStorage.getItem('refresh_token'),
      })
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      axiosInstance.defaults.headers['Authorization'] = null;
      history('/account/sign-in');
  });

  return (
    <Container>
      <h1>Signed Out</h1>
    </Container>
  );
}