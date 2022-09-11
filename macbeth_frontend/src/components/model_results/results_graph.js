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
 * Title (title of graph)
 * Datasets (list of objects with a 'label' (legend key), 'data', 'borderColor', and 'backgorundColor')
 * 
 */
export default function ResultsGraph(props) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: props.title,
            },
        },
    };

    const data = {
        labels: [0, 1, 2],
        datasets: props.datasets.map((dataset) =>
        (
            {
                label: dataset.label,
                data: dataset.data,
                borderColor: dataset.borderColor,
                backgroundColor: dataset.backgroundColor,
            }
        ))
    };

    return (
      <Line options={options} data={data} />
    )
  }