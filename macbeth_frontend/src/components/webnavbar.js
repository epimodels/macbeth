import React from 'react';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink } from 'react-router-dom'
import './webnavbar.css'

class WebNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
            <Nav className="me-auto" activeClassName="active">
              <Nav.Link as={NavLink} to='/'>Home <span className="visually-hidden">(current)</span></Nav.Link>
              <Nav.Link as={NavLink} to='/compute/model-select'>Compute</Nav.Link>
              <NavDropdown title="Help" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to='/help/faq'>FAQ</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='/help/contact-us'>Contact Us</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Container>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to='/account/sign-in'>Sign In</Nav.Link>
            <Nav.Link as={NavLink} to='/account/register'>Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
  }
}

export default WebNavbar;