import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'


// React sign in component
// Accepts a username and password as input

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      password: props.password,
      visiblePassword: false,
    };
  }

  attemptLogin = () => {
    alert(`Attempting to login with username: ${this.state.username} and password: ${this.state.password}`);
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
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
                <Form.Control type="text" name="username" placeholder="Enter username" onChange={this.handleChange.bind(this)} value={this.state.username} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlID="formPassword">
              <Form.Label column sm={2}>Password:</Form.Label>
              <Col sm={4}>
                <Form.Control type={this.state.visiblePassword ? "text" : "password"} name = "password" placeholder="Enter password" onChange={this.handleChange.bind(this)} value={this.state.password} />
              </Col>
              <Col sm={2}>
                <FontAwesomeIcon icon={this.state.visiblePassword ? faEyeSlash : faEye} id="togglepassword" onClick={() => this.setState({visiblePassword: !this.state.visiblePassword})} />
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.attemptLogin} >Sign In</Button>
          </Form>
        </div>
      </Container>
    );
  }
}

export default SignIn;