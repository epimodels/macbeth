import React from 'react';
import { Chart as ChartJS, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);


/*
 * Displays the graph when showing off results
 * Parameters:
 * title (title of graph)
 * xData 
 * yData (array with each element a dict with label, data, borderColor, backgroundColor)
 */
export default function ResultsGraph(props) {
    const [data, setData] = React.useState({
        labels: props.xData,
        datasets: props.yData.map((dataset) =>
        (
            {
                label: dataset.label,
                data: dataset.data,
                borderColor: dataset.borderColor,
                backgroundColor: dataset.backgroundColor,
            }
        ))
    });

    const [options, optionsDispatch] = React.useReducer(optionsReducer, {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
            },
        },
    });

    /*
    * Reducer function for the options (updating just the title)
    * title: new title
    */
    function optionsReducer(state, action) {
        state.plugins.title.text = action.title;
        return state;
    }

    // If parameters are updated
    React.useEffect(() => {
        // update title
        optionsDispatch({title: props.title});
        // update x and y data
        setData({
            labels: props.xData,
            datasets: props.yData.map((dataset) =>
            (
                {
                    label: dataset.label,
                    data: dataset.data,
                    borderColor: dataset.borderColor,
                    backgroundColor: dataset.backgroundColor,
                }
            ))
        });
    }, [props.title, props.xData, props.yData]);

    return (
      <div>
        <Line options={options} data={data} /> 
      </div>
    )
  }