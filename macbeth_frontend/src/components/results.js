import React from 'react';
import NavButton from './nav_button'
import Progress from './progress'

/*
 * Sub-page of Compute
 */
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <div>
        <Progress currentStep={3} />
        <h4>Viewing Results</h4>
        <NavButton label='Back' redirect='/compute/parameter-edit' variant='prev'/>
      </div>
    )
  }
}

export default Results;