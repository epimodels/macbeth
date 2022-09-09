import React from 'react';
import NavButton from '../nav_button';
import Progress from '../compute/progress';
import ResultsGraph from './results_graph';

/*
 * Sub-page of Compute
 */
export default function Results() {
  const datasets = [
    {
      'label': 'Testing Label',
      'data': [(0, 0), (1, 1), (2, 2)],
      'borderColor': 'rgb(255, 99, 132)',
      'backgroundColor': 'rgba(255, 99, 132, 0.5)',
    },
    {
      'label': 'Testing Label2',
      'data': [(2, 2), (1, 1), (0, 0)],
      'borderColor': 'rgb(53, 162, 235)',
      'backgroundColor': 'rgba(53, 162, 235, 0.5)',
    }
  ]


  return (
    <div>
      <Progress currentStep={3} />
      <h4>Viewing Results</h4>
      <div style={{'width':'50%', 'height':'50%', 'paddingLeft':'5%'}}><ResultsGraph title={"Test"} datasets={datasets} /></div>
      <NavButton label='Back' redirect='/compute/parameter-edit' variant='prev'/>
    </div>
  )
}