import React from 'react';
import ResultsGraph from './results_graph';
import axiosInstance from '../../axios';
import { TestColor, GetNextColor, GetCertainColor } from './color_manager';

/*
 * Sub-page of Compute
 */
export default function Results(props) {
  const [xData, xDataDispatch] = React.useReducer(xDataReducer, []);
  const [yData, yDataDispatch] = React.useReducer(yDataReducer, []);

  function xDataReducer(state, action) {
    return action.xOutput;
  }

  /*
   * Reducer function for the datasets that are the y-axis (updating just the data)
   */
  function yDataReducer(state, action) {
    for (let i = 0; i < action.yOutput.length; i++)
    {
      state[i] = {};
      state[i].label = action.yOutput[i].Name;
      state[i].data = action.yData[action.yOutput[i].VariableName];

      // **Setting color**
      const color = action.yOutput[i]["Color"];
      if (color !== undefined) {
        // If in config, is it already in hexadecimal?
        if (TestColor(color)) state[i].borderColor = color;
        else state[i].borderColor = GetCertainColor(color);  
      }
      // Not set in config? Get default color
      else state[i].borderColor = GetNextColor(i);

      // Add 60 to the end of the hexadecimal to make backgroundColor sorta transparent
      state[i].backgroundColor = state[i].borderColor + "60";

      // **Setting line type**
      const lineType = action.yOutput[i]["LineType"];
      switch (lineType) {
        case 'dashed':
          state[i].borderDash = [10, 10];
          break;
        case 'dotted':
          state[i].borderDash = [5, 5];
          break;
        case 'dotdash':
          state[i].borderDash = [15, 5, 3, 5];
          break;
        case 'longdash':
          state[i].borderDash = [20, 5];
          break;
        case 'twodash':
          state[i].borderDash = [20, 3, 5, 3];
          break;
        case 'solid':
        default: // default behavior is solid
          state[i].borderDash = [];
          break;
      }
      
    }
    return [...state];
  }

  React.useEffect(() => {
    if (props.generateGraph) {
      // Change this to a post/job request eventually
      let computeCall = '/compute/models/' + props.modelID + '/perform_computation/?';
      let first = true;

      for (const [key, value] of Object.entries(props.modelParams))
      {
        if (!first) computeCall += '&';
        computeCall += key + '=' + value;
        first = false;
      }

      axiosInstance
        .get(computeCall, {})
        .then(res => {
          // Set x and y data
          xDataDispatch( { xOutput: res.data[props.modelGraphing.X.VariableName] } );
          yDataDispatch( { yOutput: props.modelGraphing.Y, yData: res.data } );
        });
    }
  }, [props]);

  return (
    <div>
      <ResultsGraph title={props.modelName} xData={xData} yData={yData} />
    </div>
  )
}