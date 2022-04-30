import React from 'react';
import { Accordion } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

/* 
 * User-friendly update log, goes on the Home page
 * width: width of card
 */
class UpdateLogCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'pink',
    };
    }
  
  render() {
    return (
      <Card id={'card-' + this.state.theme} className='text-start'>
        <Card.Body>
          <Card.Title>What's New</Card.Title>
          <Card.Title className={'card-' + this.state.theme + '-muted'}>Update Log</Card.Title>
          <Card.Text>
            <Accordion>
            <Accordion.Item className={'accordion-' + this.state.theme} eventKey="1">
                <Accordion.Header>April 14, 2022</Accordion.Header>
                <Accordion.Body>
                  - Finished adding 3 new color themes: pink, gray, and brown
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className={'accordion-' + this.state.theme} eventKey="0">
                <Accordion.Header>April 12, 2022</Accordion.Header>
                <Accordion.Body>
                  - Added the update log :)
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default UpdateLogCard;