import React from 'react';

class InvalidUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    }
  
  render() {
    return (
      <h1>This page doesn't exist!</h1>
    )
  }
}

export default InvalidUrl;