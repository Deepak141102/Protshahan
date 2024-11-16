import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register necessary Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

// Importing data
import dataJson from "../Art/beat.json"; // Replace with the correct path
import IncomeIssuesJson from "../Technology/Issues.json"; // Replace with the correct path

const LostChart = () => {
  // Lost Parent Chart Data Processing
  const lostParentData = Array.isArray(IncomeIssuesJson?.Has_Lost_Parent)
    ? IncomeIssuesJson.Has_Lost_Parent
    : [];

  const lostParentPercentage = lostParentData.map((item) => {
    const lostParentCount = item?.Has_Lost_A_Parent || 0;
    const totalAttended = item?.total_attended || 1; // Avoid division by zero
    return ((lostParentCount / totalAttended) * 100).toFixed(2);
  });

  const lostParentChartData = {
    labels: lostParentData.map((item) => item?.Salary || "Unknown"),
    datasets: [
      {
        label: "Lost A Parent Percentage (%)",
        data: lostParentPercentage,
        backgroundColor: ["rgb(224, 70, 31)", "rgb(101, 25, 11)"],
        borderWidth: 1,
      },
    ],
  };

  const lostParentOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
      },
      title: {
        display: true,
        text: "Percentage of People Who Have Lost A Parent by Salary",
        color: "#2D3748",
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const salary = lostParentData[index]?.Salary || "Unknown";
            const total = lostParentData[index]?.total_attended || 0;
            const percentage = lostParentPercentage[index];
            return `${salary}: ${percentage}% (${total} responses)`;
          },
        },
      },
    },
   
  };

  // Rented Chart Data Processing
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const rentedData = dataJson?.rented_people;

    if (rentedData) {
      const chartData = {
        labels: Object.keys(rentedData),
        datasets: [
          {
            label: "Count of People",
            data: Object.values(rentedData).map((item) => item.count || 0),
            backgroundColor: [
              "rgb(224, 70, 31)", // Color 1
              "rgb(101, 25, 11)", // Color 2
            ],
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
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataIndex = tooltipItem.dataIndex; // Index of the hovered bar
            const label = tooltipItem.label; // Label ("Yes" or "No")
            const percentage = dataJson.rented_people[label]?.percentage || 0; // Get percentage from the JSON
            const count = tooltipItem.raw; // Get the count value
            return `Percentage: ${percentage}%, Count: ${count}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        
        title: {
          display: true,
          text: "Percentage of People (%)",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
      x:{
        title: {
          display: true,
          text: "Responses",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
      }
    },
  };

  // Render Charts
  return (
    <div className="flex  justify-center items-center gap-6 p-5 bg-[#dcdcdc]  max-md:flex-col">
      {/* Rented People Bar Chart */}
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 py-6 flex justify-center items-center flex-col shadow-md rounded-lg">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-700">
          Rented People Count
        </h2>
        {Object.keys(chartData).length ? (
        <div className="w-full max-md:h-[54vh] h-full">

          <Bar data={chartData} options={options} />
          </div>
        ) : (
          <p>No data available for rented people.</p>
        )}
      </div>
      {/* Lost Parent Doughnut Chart */}
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
        
        <h2 className="text-xl font-bold text-center mb-4 text-gray-700">
          Salary Analysis - Lost A Parent Percentage
        </h2>
        {lostParentData.length ? (
        <div className="w-full max-md:h-[54vh] h-full">

          <Doughnut data={lostParentChartData} options={lostParentOptions} />
          </div>
        ) : (
          <p>No data available for lost parent chart.</p>
        )}
      </div>
    </div>
  );
};

export default LostChart;
