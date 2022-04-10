import React from 'react';
import ModelDropdown from './model_dropdown'
import NavButton from './nav_button'
import Progress from './progress'

/*
 * Sub-page of Compute
 */
class ModelSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // grab models here?
  }

  render() {
    return (
      <div className='select'>
        <Progress currentStep={1} />
        <h4>Epidemic Models</h4>
        <ModelDropdown />
        <NavButton label='Next' redirect='/compute/parameter-edit' variant='next'/>
      </div>
    )
  }
}

export default ModelSelect;