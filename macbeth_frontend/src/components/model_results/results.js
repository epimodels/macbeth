import React from 'react';
import NavButton from '../nav_button';
import Progress from '../compute/progress';
import ResultsGraph from './results_graph';
import axiosInstance from '../../axios';

/*
 * Sub-page of Compute
 */
export default function Results() {
  const [xData, setXData] = React.useState([]);
  const [yData, yDataDispatch] = React.useReducer(yDataReducer, [
    {
      'borderColor': 'rgb(255, 99, 132)',
      'backgroundColor': 'rgba(255, 99, 132, 0.5)',
    },
    {
      'borderColor': 'rgb(25, 255, 100)',
      'backgroundColor': 'rgba(53, 162, 235, 0.5)',
    },
    {
      'borderColor': 'rgb(53, 162, 235)',
      'backgroundColor': 'rgba(53, 162, 235, 0.5)',
    },
    {
      'borderColor': 'rgb(0, 0, 0)',
      'backgroundColor': 'rgba(0, 0, 0, 0.5)',
    }
  ]);

  /*
   * Reducer function for the datasets that are the y-axis (updating just the data)
   */
  function yDataReducer(state, action) {
    for (let i = 0; i < action.yOutput.length; i++)
    {
      state[i].label = action.yOutput[i].Name;
      state[i].data = action.yData[action.yOutput[i].VariableName];
    }
    return [...state];
  }

  React.useEffect(() => {
    axiosInstance
      .get('http://127.0.0.1:8000/api/compute/models/ZombieSEIR/perform_computation/?infect_prob\=0.5\&infect_duration\=0.1\&latent_period\=0.5', {})
      .then(res => {
        // Set x and y data
        const graphingData = JSON.parse(localStorage.getItem('compute-selected-model-graph'));
        setXData(res.data[graphingData.X.VariableName]);
        yDataDispatch( { yOutput: graphingData.Y, yData: res.data } );
      });
  }, []);

  return (
    <div>
      <Progress currentStep={3} />
      <h4>Viewing Results</h4>
      <div style={{'width':'50%', 'height':'50%', 'paddingLeft':'5%'}}>
        <ResultsGraph title={"Test"} xData={xData} yData={yData} />
      </div>
      <NavButton label='Back' redirect='/compute/parameter-edit' variant='prev'/>
    </div>
  )
}