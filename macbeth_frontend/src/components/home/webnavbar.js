import React from 'react';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink } from 'react-router-dom'
import './webnavbar.css'

class WebNavbar extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      accountNav: null,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick()
    );
  }

  tick() {
    this.setState({
      accountNav: localStorage.getItem('access_token') ?
      <Nav>
        <Nav.Link as={NavLink} to ='/account/view'>View Account</Nav.Link>
        <Nav.Link as={NavLink} to='/account/sign-out'>Sign Out</Nav.Link>
      </Nav> :
        <Nav>
          <Nav.Link as={NavLink} to='/account/sign-in'>Sign In</Nav.Link>
        </Nav>
    })
  }

  render() {
    return (
      <Navbar bg="light" expand="lg" sticky="top">
        <Container>
          <Nav.Link as={NavLink} to='/'>
            <Navbar.Brand className="brand">
              <img
              alt="logo"
              src="/assets/images/teamnightingale.png"
              width="70"
              height="70"
              className="d-inline-block align-top"
              />{' '}
              MACBETH
            </Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to='/'>Home <span className="visually-hidden">(current)</span></Nav.Link>
              <Nav.Link as={NavLink} to='/compute/model-select'>Compute</Nav.Link>
              <NavDropdown title="Help" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to='/help/faq'>FAQ</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='/help/contact-us'>Contact Us</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto">
              {this.state.accountNav}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default WebNavbar;
