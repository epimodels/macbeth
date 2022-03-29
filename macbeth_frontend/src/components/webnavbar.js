import React from 'react';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
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
          <Navbar.Brand className="brand" href="#home">
            <img
             alt="logo"
             src="assets/images/teamnightingale.png"
             width="100"
             height="100"
             className="d-inline-block align-top"
            />{' '}
            MACBETH
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home <span className="visually-hidden">(current)</span></Nav.Link>
                <Nav.Link href="#compute">Compute</Nav.Link>
                <NavDropdown title="Help" id="basic-nav-dropdown">
                <NavDropdown.Item href="#help/FAQ">FAQ</NavDropdown.Item>
                <NavDropdown.Item href="#help/contact-us">Contact Us</NavDropdown.Item>
                </NavDropdown>
               </Nav>
            </Navbar.Collapse>
        </Container>
        <Container>
          <Nav className="ms-auto">
            <Nav.Link href="#account">Sign In</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
  }
}

export default WebNavbar;