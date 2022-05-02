import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import './progress.css'

/*
 * Compute progress bar
 * currentStep: 1, 2, or 3
 */
function Progress(props) {
  switch(props.currentStep) {
    case 1:
      return (
        <ProgressBar>
          <ProgressBar animated className='model-select' now={33} label={`${33}%`} visuallyHidden key={1}/>
        </ProgressBar>
      )
    case 2:
      return ( 
        <ProgressBar>
          <ProgressBar striped className='model-select' now={33} label={`${33}%`} visuallyHidden key={1}/>
          <ProgressBar animated className='parameter-edit' now={33} label={`${33}%`} visuallyHidden key={2}/>
        </ProgressBar>
      )
    case 3:
      return (
        <ProgressBar>
          <ProgressBar striped className='model-select' now={33} label={`${33}%`} visuallyHidden key={1}/>
          <ProgressBar striped className='parameter-edit' now={33} label={`${33}%`} visuallyHidden key={2}/>
          <ProgressBar animated className='results' now={34} label={`${33}%`} visuallyHidden key={3}/>
        </ProgressBar>
      )
    default:
      return null;
  }
}

export default Progress;