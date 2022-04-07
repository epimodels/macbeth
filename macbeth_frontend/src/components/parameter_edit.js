import React from 'react';
import NavButton from './nav_button'
import Progress from './progress'

class ParameterEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    }
  
  render() {
    return (
      <div>
        <Progress currentStep={2} />
        <h4>Edit a Parameter</h4>
        <NavButton label='Back' redirect='/compute/model-select' variant='prev'/>
        <NavButton label='Next' redirect='/compute/results' variant='next'/>
      </div>
    )
  }
}

export default ParameterEdit;