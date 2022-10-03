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
ChartJS.defaults.font.size = 20;

/*
 * Displays the graph when showing off results
 * Parameters:
 * title (title of graph)
 * xData 
 * yData (array with each element a dict with label, data, borderColor, backgroundColor)
 */
export default function ResultsGraph(props) {
    const chartRef = React.useRef(null);

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
                font: {
                    size: 25
                }
            },
        },
        scales: {
            x: {
                type: 'linear',
                ticks: {
                    stepSize: 10,
                }
            },
            y: {
                type: 'linear',
                ticks: {
                    stepSize: 0.5
                }
            }
        },
    });

    /*
    * Reducer function for the options (updating just the title and axis stepsizes)
    * title: new title
    * xData: x-axis dataset (assumes floats)
    * yData: y-axis datasets (assumes floats)
    */
    function optionsReducer(state, action) {
        if (action["title"] !== undefined) state.plugins.title.text = action.title;
        if (action["xData"] !== undefined && action["xData"].length > 0) {
            // If there is data in xData, then find the max and min to get the range
            let max = parseFloat(action.xData[0]);
            let min = max;
            action.xData.forEach(x => {
                let parsedX = parseFloat(x);
                if (parsedX > max) max = parsedX;
                if (parsedX < min) min = parsedX;
            });
            // Then if the range is over 25, round to the nearest 5, and if under 25, round to the nearest 0.1
            state.scales.x.ticks.stepSize = (max - min) >= 25 ? Math.round((max - min) / 50.0) * 5 : Math.round((max - min) * 2) / 10;
        }
        if (action["yData"] !== undefined && action["yData"].length > 0) {
            // If there is data in yData, then go through each dataset to find the range
            let max = parseFloat(action.yData[0].data[0]);
            let min = max;
            action.yData.forEach(dataset => {
                dataset.data.forEach(y => {
                    let parsedY = parseFloat(y);
                    if (parsedY > max) max = parsedY;
                    if (parsedY < min) min = parsedY;
                });
            });
            // Then if the range is over 25, round to the nearest 5, and if under 25, round to the nearest 0.1
            state.scales.y.ticks.stepSize = (max - min) >= 25 ? Math.round((max - min) / 50.0) * 5 : Math.round((max - min) * 2) / 10;
        }
        chartRef.current.options = state;
        chartRef.current.update();
        return state;
    }

    // If parameters are updated
    React.useEffect(() => {
        // update title and axis step sizes
        optionsDispatch({ title: props.title, xData: props.xData, yData: props.yData });
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
        <Line ref={chartRef} options={options} data={data} /> 
      </div>
    )
  }