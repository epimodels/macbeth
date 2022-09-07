import React from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion'

/* 
 * Information for new Macbeth users, goes on the Home page
 * width: width of card
 */
class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'gray',
    };
    }
  
  render() {
    return (
      <Card id={'card-' + this.state.theme} className='text-start'>
        <Card.Body>
          <Card.Title>New to MACBETH?</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'></Card.Subtitle>
          <Card.Text>
            <Accordion defaultActiveKey="0"> {/* would be cool to implement if signed in, no default key, but if not, then this is active */}
              <Accordion.Item className={'accordion-' + this.state.theme} eventKey="0">
                <Accordion.Header>About MACBETH</Accordion.Header>
                <Accordion.Body>
                  MACBETH is a website with the goal of connecting clinicians to mathematical models commonly used in healthcare epidemiology.<br /><br />

                  The benefits these models bring to patient health should not be limited to only hospitals with dedicated computational researchers.<br /><br />
                  MACBETH hopes to close the gap and enable anyone without specialist expertise to be able to develop new health interventions!
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item className={'accordion-' + this.state.theme} eventKey="1">
                <Accordion.Header>Getting Started</Accordion.Header>
                <Accordion.Body>
                  To get started, click on "Compute" near the top left of this page. There will be 3 steps:<br /><br />
                  <ol>
                    <li>Select what model you would like to compute</li>
                    <li>Change any parameters as needed to match your situation</li>
                    <li>View the results</li>
                  </ol>

                  If you'd like to save the results to view at a later time, create an account!
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item className={'accordion-' + this.state.theme} eventKey="2">
                <Accordion.Header>Create an Account</Accordion.Header>
                <Accordion.Body>
                  To create an account, click on "Register" near the top right of this page.<br /><br />
                  You will need to fill in information regarding your:
                  <ul>
                    <li>Email</li>
                    <span className='text-muted'>We will never share your email with anyone else</span>
                    <li>Nickname</li>
                    <li>Password</li>
                    <li>Age </li>
                    <span className='text-muted'>We only need to verify that you are over the age of 13</span>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>       
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default InfoCard;