import React from "react";
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
import activityData from "./art.json";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  // Access dataset1 data from JSON
  const dataset1 = activityData.dataset1;

  // Prepare data for the first chart (Activity Counts and Percentages)
  const activityNames = dataset1.activities.map((activity) => activity.name);
  const activityCounts = dataset1.activities.map((activity) => activity.count);
  const percentages = activityCounts.map((count) =>
    ((count / dataset1.total) * 100).toFixed(2)
  );

  // Chart.js data for the first chart (Percentage of activities)
  const data = {
    labels: activityNames,
    datasets: [
      {
        label: "Percentage",
        data: percentages,
        backgroundColor: "#982722",
      },
    ],
  };

  // Chart options for the first chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Activities Conducted (Total of 511 Female Applicants)",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const activityName = dataset1.activities[index].name;
            const count = activityCounts[index];
            const percentage = percentages[index];

            return `${activityName}: ${percentage}% participants (${count} of total ${dataset1.total})`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#3c3950",
        },
        title: {
          display: true,
          text: "Activities",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`,
          color: "rgba(33, 35, 49, 0.7)",
        },
        title: {
          display: true,
          text: "Female applicants percentage",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
    },
  };

  // Access dataset2 data from JSON (Sessions)
  const dataset2 = activityData.sessions;

  // Prepare data for the second chart (Sessions Count)
  const sessionCounts = dataset2.activities_session.map((session) => session.count);

  // Chart.js data for the second chart (Sessions)
  const sessionData = {
    labels: activityNames,
    datasets: [
      {
        label: "Sessions Count",
        data: sessionCounts,
        backgroundColor: "#3d1512",
      },
    ],
  };

  // Chart options for the second chart
  const sessionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Activities and Total Sessions Conducted by Us",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const activityName = dataset2.activities_session[index].name;
            const count = sessionCounts[index];
            return `${activityName}: ${count} sessions`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#3c3950",
        },
        title: {
          display: true,
          text: "Activities",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "rgba(33, 35, 49, 0.7)",
        },
        title: {
          display: true,
          text: "Number of Sessions Conducted",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
    },
  };

  return (
    <div className="bg-[#3c3950] min-h-screen font-lato">
      <div className="bg-[#212331] text-white py-8 px-4 max-md:px-0 ">
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
          <div className="flex justify-center items-center gap-6 p-5 bg-[#dcdcdc] max-md:flex-col">
            <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 py-6 flex justify-center items-center flex-col shadow-md rounded-lg">
              <h2 className="text-xl font-semibold text-[#121331] mb-4 text-center">
                Activities Conducted (Total of 511 Female Applicants)
              </h2>
              <div className="w-full max-md:h-[54vh] h-full">
                <Bar data={data} options={options} />
              </div>
            </div>
            <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 py-6 flex justify-center items-center flex-col shadow-md rounded-lg">
              <h2 className="text-xl font-semibold text-[#121331] mb-4 text-center">
                Activities and Total Sessions Conducted by Us
              </h2>
              <div className="w-full max-md:h-[54vh] h-full">
                <Bar data={sessionData} options={sessionOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
