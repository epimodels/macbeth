import React from 'react';
import { Outlet } from 'react-router-dom'
import './compute.css'

/*
 * Base page for Compute
 */
class Compute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Compute</h1>
        <Outlet />
      </div>
    );
  }
}

export default Compute;