import React from 'react';
import { Outlet } from 'react-router-dom'
import './compute.css'

/*
 * Base page for Compute
 */
export default function Compute() {
  return (
    <div>
      <h1>Compute</h1>
      <Outlet />
    </div>
  );
}