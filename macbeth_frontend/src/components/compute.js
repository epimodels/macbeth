import React from 'react';
import Container from 'react-bootstrap/Container'

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
        <Container>Compute</Container>
      </div>
    );
  }
}

export default Compute;