import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import dataJson from './beat.json'; // Path to your JSON file

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const rentedData = dataJson?.rented_people;

    if (rentedData) {
      const chartData = {
        labels: Object.keys(rentedData),
        datasets: [
          {
            label: 'Count of People',
            data: Object.values(rentedData).map(item => item.count),
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
    } else {
      console.error("Data for 'rented_people' not found.");
    }
  }, []);

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataIndex = tooltipItem.dataIndex; // Index of the hovered bar
            const label = tooltipItem.label; // Label ("Yes" or "No")
            const percentage = dataJson.rented_people[label].percentage; // Get percentage from the JSON
            const count = tooltipItem.raw; // Get the count value
            return `Percentage: ${percentage}%, Count: ${count}`;
          },
        },
      },
    },
  };

  if (!chartData.labels) {
    return <div>Loading chart...</div>; // Display a loading state while data is being prepared
  }

  return (
    <div>
      <h2>Rented People Count</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
