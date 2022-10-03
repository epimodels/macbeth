import React from 'react';
import NavButton from '../nav_button';
import Progress from '../compute/progress';
import ResultsGraph from './results_graph';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
import { TestColor, GetNextColor, GetCertainColor } from './color_manager';

/*
 * Sub-page of Compute
 */
export default function Results() {
  const URLparams = useParams();

  const [xData, setXData] = React.useState([]);
  const [yData, yDataDispatch] = React.useReducer(yDataReducer, []);

  /*
   * Reducer function for the datasets that are the y-axis (updating just the data)
   */
  function yDataReducer(state, action) {
    for (let i = 0; i < action.yOutput.length; i++)
    {
      state[i] = {};
      state[i].label = action.yOutput[i].Name;
      state[i].data = action.yData[action.yOutput[i].VariableName];

      // Setting color
      const color = action.yOutput[i]["color"];
      if (color !== undefined) {
        // If in config, is it already in hexadecimal?
        if (TestColor(color)) { 
          state[i].borderColor = color;
        }
        else {
          state[i].borderColor = GetCertainColor(color);
        }
      }
      // Not set in config? Get default color
      else {
        state[i].borderColor = GetNextColor(i);
      }
      // Add 60 to the end of the hexadecimal to make backgroundColor sorta transparent
      state[i].backgroundColor = state[i].borderColor + "60";
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
  }, [URLparams.modelid]);

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