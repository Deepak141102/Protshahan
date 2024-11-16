import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Importing the JSON file directly
import jsonData from './Barchart2.json';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart02 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Transforming the imported JSON into an array of objects
    const chartData = Object.entries(jsonData).map(([key, value]) => ({ label: key, value }));
    setData(chartData);
  }, []);

  // Define custom colors for the bars
  const barColors = [
    "rgb(224, 70, 31)",
    "rgb(101, 25, 11)",
    "rgb(134, 37, 15)",
    "rgb(223, 107, 79)"
  ];

  // Create a color array for the bars, cycling through if there are more bars than colors
  const barColorArray = data.map((_, index) => barColors[index % barColors.length]);

  const chartData = {
    labels: data.map((item) => item.label),  // x-axis labels (categories)
    datasets: [
      {
        label: 'Services Data',  // The label for the dataset
        data: data.map((item) => item.value),  // y-axis values
        backgroundColor: barColorArray,  // Use the custom colors for the bars
        borderColor: barColorArray,  // Border color for the bars (optional)
        borderWidth: 1,  // Border width for the bars
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Assistance Services Distribution',
        font: {
          size: 20,    // Font size
          weight: 'bold', // Font weight
          family: "'Arial', sans-serif",  // Font family (optional)
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categories',  // X-axis label
          font: {
            size: 16,  // Font size for x-axis label
            weight: 'bold',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Values',  // Y-axis label
          font: {
            size: 16,  // Font size for y-axis label
            weight: 'bold',
          },
        },
        beginAtZero: true,  // Ensure the y-axis starts at zero
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart02;
