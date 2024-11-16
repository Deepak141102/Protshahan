import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Importing the JSON files directly
import jsonData from "./Barchart2.json";
import chartData from "./Barchart.json";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CombinedBarChart = () => {
  // First chart data state
  const [firstChartData, setFirstChartData] = useState(null);

  // Array of colors to be used for the bars
  const backgroundColors = [
    "rgb(224, 70, 31)", // Color 1
    "rgb(101, 25, 11)", // Color 2
    "rgb(134, 37, 15)", // Color 3
    "rgb(223, 107, 79)", // Color 4
  ];

  useEffect(() => {
    // Extracting the labels and data from the first JSON file
    const labels = Object.keys(chartData); // ["500-5000", "5000-10000", "10000-15000", ...]
    const counts = labels.map((label) => chartData[label].count); // [18, 28, 24, 10, 9]

    setFirstChartData({
      labels: labels,
      datasets: [
        {
          label: "Count",
          data: counts,
          backgroundColor: backgroundColors, // Use the array of colors here
          borderColor: "rgba(75,192,192,1)", // Bar border color
          borderWidth: 1, // Bar border width
        },
      ],
    });
  }, []); // Empty dependency array means this effect runs only once, after the initial render

  // Second chart data state
  const [secondChartData, setSecondChartData] = useState(null);

  useEffect(() => {
    // Transforming the imported JSON into an array of objects
    const transformedData = Object.entries(jsonData).map(([key, value]) => ({
      label: key,
      value,
    }));
    setSecondChartData(transformedData);
  }, []);

  if (!firstChartData || !secondChartData) return <div>Loading...</div>;

  // Define custom colors for the bars of the second chart
  const barColors = [
    "rgb(224, 70, 31)",
    "rgb(101, 25, 11)",
    "rgb(134, 37, 15)",
    "rgb(223, 107, 79)",
  ];

  // Create a color array for the bars, cycling through if there are more bars than colors
  const barColorArray = secondChartData.map(
    (_, index) => barColors[index % barColors.length]
  );

  const secondChartDataFormatted = {
    labels: secondChartData.map((item) => item.label), // x-axis labels (categories)
    datasets: [
      {
        label: "Services Data", // The label for the dataset
        data: secondChartData.map((item) => item.value), // y-axis values
        backgroundColor: barColorArray, // Use the custom colors for the bars
        borderColor: barColorArray, // Border color for the bars (optional)
        borderWidth: 1, // Border width for the bars
      },
    ],
  };

  const firstChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Amount Range",
        font: {
          size: 20,
          weight: "bold",
          family: "'Arial', sans-serif",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Amount Range",
          color:"#e8461e",
          font: {
            size: 13,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size: 13,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
          color:"#e8461e",
          font: {
            size: 13,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size: 13,
          },
          stepSize: 5,
        },
      },
    },
  };

  const secondChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Assistance Services Distribution",
        font: {
          size: 20,
          weight: "bold",
          family: "'Arial', sans-serif",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Categories",
          color:"#e8461e",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
          color:"#e8461e",
          font: {
            size: 13,
            weight: "bold",
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-[#3c3950] min-h-screen font-lato">
      <div className="bg-[#212331] text-white py-8 px-4 max-md:px-0">
        <div className="flex text-2xl md:text-4xl p-4">
          <h1 className="text-yellow-400">
            Protsahan - For a Better Future | Data Visualization
          </h1>
        </div>
        <div className="bg-[#3c3950] rounded-lg shadow-lg pt-4">
          <div className="border-[2px] border-dashed border-white rounded-md p-5 m-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
              <div className="text-white">
                <span className="text-[#e8461e] mr-2">Timeline:</span>
                Child entering Protsahan
              </div>
              <div className="flex flex-wrap justify-center">
                <p className="text-white text-center">
                  <span className="text-[#e8461e] mr-2">
                    Potential Consumers:
                  </span>
                  Protsahan Executive Team | Governmental Bodies
                </p>
              </div>
            </div>
            <div className="text-center p-4 text-white">
              <p>
                These set of data visualisations paints a story of the enrolment
                data of students on a specified date range/month/year. It tells
                the user how many children have enrolled in Protsahan, basic
                data related to the pool of children, etc.
              </p>
            </div>
          </div>
          <div className="flex  justify-center items-center gap-6 p-5 bg-[#dcdcdc]  max-md:flex-col">
            <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
              <div className="w-full max-md:h-[75vh] h-full">
                <Bar data={firstChartData} options={firstChartOptions} />
              </div>
            </div>
            <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
              <h2 className="text-xl font-bold text-center mb-4 text-[#e8461e]">
                What skills do you possess among these?
              </h2>

              <div className="w-full max-md:h-[70vh] h-full">
                <Bar
                  data={secondChartDataFormatted}
                  options={secondChartOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedBarChart;
