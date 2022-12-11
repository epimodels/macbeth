import {React, useCallback, useState} from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

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
import validateTokenAndObtainSession from './sdk';


// React sign in component
// Accepts a username and password as input

export default function SignIn() {

  // if user is already logged in, redirect to home page
  if (localStorage.getItem('access_token')) {
    window.location.href = '/';
  }

  const onGoogleLoginSuccess = useCallback(res => {
    const tokenId = res.credential;
    console.log(res)


    validateTokenAndObtainSession(tokenId)
      .then((res) => {
        console.log('RESULT');
        console.log(res);
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const onGoogleLoginFailure = useCallback(response => {
    console.log('Google login failed');
    console.log(response);
  });

  const history = useNavigate();

    return (
      <Container>
        <div className="signin">
          <h2 style={{'margin-top':'3%'}}>Sign In</h2>
          <GoogleOAuthProvider clientId="881806212575-v01hph86no2rhp8vl4d7vp2dg9u58sjc.apps.googleusercontent.com">
          <GoogleLogin
              onSuccess={onGoogleLoginSuccess}
              onError={onGoogleLoginFailure}
            />
          </GoogleOAuthProvider>
        </div>
      </Container>
    );
}
