import React from 'react';
import ResultsGraph from './results_graph';
import axiosInstance from '../../axios';
import { useHref, useParams } from 'react-router-dom';
import { TestColor, GetNextColor, GetCertainColor } from './color_manager';

/*
 * Sub-page of Results
 */
export default function JobView() {
  const {job_id} = useParams();
  console.log(job_id)

  const [xData, setXData] = React.useState([]);
  const [yData, yDataDispatch] = React.useReducer(yDataReducer, []);
  const [Title, setTitle] = React.useState([]);
  const [Pending, setPending] = React.useState(true);

  let graphingOutput = ""

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
    // Lookup code goes here
    let jobData = ""
    axiosInstance
        .get('compute/job/'+ job_id + "/")
        .then(res => {
            jobData = res.data
            if(jobData.status == 1) // complete
            {
                setPending(false)
            }
            axiosInstance
            .get('/compute/models/' + jobData.model_id + '/', {})
            .then(res => {
                graphingOutput = res.data.GraphingData;
                let jobDataResults = JSON.parse(jobData.results)
                console.log(jobDataResults)
                setXData(jobDataResults[graphingOutput.X.VariableName]);
                setTitle(jobData.model_id)
                yDataDispatch( { yOutput: graphingOutput.Y, yData: jobDataResults } );
                console.log(xData)
                console.log(yData)
            })
        })
        .catch((err) => {
            window.location.href = window.location.origin
            // TODO: Add error message when we get flashes to work.
        })
   
  },[]);

  return (
    
    <div>
        {(Pending == false) ? 
        <div>
            <h4>Viewing Results of Job {job_id}</h4>
            <div style={{'width':'50%', 'height':'50%', 'paddingLeft':'5%'}}>
                <ResultsGraph title={Title} xData={xData} yData={yData}/>
            </div>
        </div> :
        <div>
            <h4>Your model is currently running!</h4>
            <p>Please wait a bit before refreshing the page.</p>
        </div>
         }
    </div>
  )
}