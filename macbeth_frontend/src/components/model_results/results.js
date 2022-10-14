import React from 'react';
import NavButton from '../nav_button'
import Progress from '../compute/progress'

/*
 * Sub-page of Compute
 */
export default function Results() {
  return (
    <div>
      <Progress currentStep={3} />
      <h4>Viewing Results</h4>
      <NavButton label='Back' redirect={'/compute/parameter-edit/' + localStorage.getItem('compute-selected-model')} variant='prev'/>
    </div>
  )
}