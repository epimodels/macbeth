import React from 'react';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap'
import NavButton from '../nav_button'
import Progress from '../compute/progress'
import Parameter from './parameter'

/*
 * Sub-page of Compute
 * Future: if no parameters are received, show an error screen (with potentially a report a bug button?)
 */
class ParameterEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row_num: 4, // change this number to change how many parameters are in one column
    };

    this._create2DArray.bind(this);
  }

  // Creates a 2D array of rows and columns to organize the parameters
  _create2DArray() {
    let rows = [[], []];
    let cols = 1;
    this.props.parameters.forEach((parameter, idx) => {
      if (idx % this.state.row_num === 0 && idx !== 0) {
        cols++;
        rows.push([]);
        rows[cols].push(parameter);
      } else {
        rows[cols].push(parameter);
      }
    })
    return rows;
  }

  render() {
    let rows = this._create2DArray(); // pre-processing
    return (
      <div>
        <Progress currentStep={2} />
        <h4 style={{'margin-bottom':'2%'}}>Edit a Parameter</h4>
        <Form> {/* dynamically organizes the parameters into rows and columns based on number */}
          <Row className='justify-content-center'>
            {rows.map((item, idx) => {
              return (
                <Col xs={'auto'}>
                  {item}
                </Col>
              )
            })}
          </Row>
        </Form>
        <NavButton label='Back' redirect='/compute/model-select' variant='prev'/>
        <NavButton label='Next' redirect='/compute/results' variant='next'/>
      </div>
    )
  }
}

ParameterEdit.defaultProps = {
  // This is for testing only
  parameters: [<Parameter controlId='formBasicParameter' label='Parameter1' type='parameter' placeholder='enter parameter here'/>, 
              <Parameter controlId='formBasicParameter' label='Parameter2' type='parameter' placeholder='enter parameter here'/>, 
              <Parameter controlId='formBasicParameter' label='Parameter3' type='parameter' placeholder='enter parameter here'/>]
}

export default ParameterEdit;