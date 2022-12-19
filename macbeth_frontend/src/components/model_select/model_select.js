import React from 'react';
import ModelDropdown from './model_dropdown'
import NavButton from '../nav_button'
import Progress from '../compute/progress'

export default function ModelSelect({setModelID}) {
  // TODO: Get copy of this implemented from Mikaela.
  // TODO: Was not pushed in any commit.




  return (
    <div className='select'>
        <h4>Epidemic Models</h4>
        <ModelDropdown setModelID={setModelID}/>
        <NavButton label='Next' redirect='/compute/parameter-edit'/>
        <Progress currentStep={1}/>
    </div>
  );
}

/*
 * Sub-page of Compute
class ModelSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextDisabled: true,
      redirectLink: '/compute/parameter-edit',
    };
    this.allowNext = this.allowNext.bind(this);
  }

  componentDidMount() {
    // grab models here?
  }

  allowNext() {
    this.setState({nextDisabled: false});
    const redirect = '/compute/parameter-edit/'.concat(localStorage.getItem('compute-selected-model'));
    this.setState({redirectLink: redirect});
  }

  render() {
    return (
      <div className='select'>
        <h4>Epidemic Models</h4>
        <ModelDropdown allowNextEvent={this.allowNext}/>
        <NavButton label='Next' redirect={this.state.redirectLink} variant='next' disabled={this.state.nextDisabled}/>
      </div>
    )
  }
}

export default ModelSelect;
 */
