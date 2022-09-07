import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InfoCard from './info_card'
import UpdateLogCard from './update_log_card';
import './home.css'

/* 
 * Base page for Home
 * Handles sizing of children
 */ 
export default function Home() {
  return (
    <div className='cards'>
      <h1>Home</h1>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={6}><InfoCard /></Col>
          <Col xs={3}><UpdateLogCard /></Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}