import React from 'react';
import NavButton from '../nav_button';
import Progress from '../compute/progress';
import ResultsGraph from './results_graph';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';

/*
 * Sub-page of Compute
 */
export default function Results() {
  const URLparams = useParams();

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
    const parameterInput = JSON.parse(localStorage.getItem('compute-selected-model-params'));
    const graphingOutput = JSON.parse(localStorage.getItem('compute-selected-model-graph'));

    let computeCall = '/compute/models/' + URLparams.modelid + '/perform_computation/?';
    let first = true;

    for (const [key, value] of Object.entries(parameterInput))
    {
      if (!first) computeCall += '&';
      computeCall += key + '=' + value;
      first = false;
    }

    axiosInstance
      .get(computeCall, {})
      .then(res => {
        // Set x and y data
        setXData(res.data[graphingOutput.X.VariableName]);
        yDataDispatch( { yOutput: graphingOutput.Y, yData: res.data } );
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