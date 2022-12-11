import React from 'react';
import { Outlet } from 'react-router-dom'
import './compute.css'

/*
 * Base page for Compute
 */
export default function Compute() {

  const isLogged = localStorage.getItem('access_token') ? true : false;

  if (!isLogged) {
    window.location.href = '/account/sign-in';
  }

  return (
    <div>
      <h1>Compute</h1>
      <Outlet />
    </div>
  );
}
