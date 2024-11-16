// src/components/BarChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import chartData from './Barchart.json'; // Import your JSON data

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TechBarChart = () => {
  const [data, setData] = useState(null);

  // Array of colors to be used for the bars
  const backgroundColors = [
    "rgb(224, 70, 31)",  // Color 1
    "rgb(101, 25, 11)",  // Color 2
    "rgb(134, 37, 15)",  // Color 3
    "rgb(223, 107, 79)",  // Color 4
  ];

  useEffect(() => {
    // Extracting the labels and data from the JSON file
    const labels = Object.keys(chartData); // ["500-5000", "5000-10000", "10000-15000", ...]
    const counts = labels.map(label => chartData[label].count); // [18, 28, 24, 10, 9]

    setData({
      labels: labels,
      datasets: [
        {
          label: 'Count',
          data: counts,
          backgroundColor: backgroundColors,  // Use the array of colors here
          borderColor: 'rgba(75,192,192,1)', // Bar border color
          borderWidth: 1, // Bar border width
        },
      ],
    });
  }, []);

  if (!data) return <div>Loading...</div>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Amount Range',
        font: {
          size: 20,  // Set the font size (increase this value to make the title larger)
          weight: 'bold',  // Set font weight to bold
          family: "'Arial', sans-serif",  // You can specify a custom font if needed
        },
      },
    },
    scales: {
      // X-Axis configuration
      x: {
        title: {
          display: true,
          text: 'Amount Range', // Label for the x-axis
          font: {
            size: 16,  // Font size for x-axis title
            weight: 'bold',  // Font weight for x-axis title
          },
        },
        ticks: {
          font: {
            size: 14,  // Font size for x-axis labels
          },
        },
      },
      // Y-Axis configuration
      y: {
        title: {
          display: true,
          text: 'Count', // Label for the y-axis
          font: {
            size: 16,  // Font size for y-axis title
            weight: 'bold',  // Font weight for y-axis title
          },
        },
        ticks: {
          font: {
            size: 14,  // Font size for y-axis labels
          },
          // Optional: Define a step size or interval for ticks (values)
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <Bar data={data} options={options} />
    </div>
  );
};

export default TechBarChart;
