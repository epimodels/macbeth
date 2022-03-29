import React from 'react';
import Container from 'react-bootstrap/Container'
import ModelDropdown from './model_dropdown'

class ComputeModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Container>Compute</Container>
        <ModelDropdown />
      </div>
    );
  }
}

export default ComputeModel;