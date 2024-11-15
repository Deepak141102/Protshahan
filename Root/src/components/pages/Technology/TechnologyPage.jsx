import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // For Doughnut chart
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { icon } from "leaflet";
import { data } from "autoprefixer";
import SalaryChart from "./Income";
import BarChart from "./Issues";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const GraphFourth = () => {
  console.log("GraphFourth is rendering...");

  const [doughnutFilter, setDoughnutFilter] = useState("all");
  const [barFilter, setBarFilter] = useState("all");
  const [isDoughnutDropdownOpen, setDoughnutDropdownOpen] = useState(false);
  const [isBarDropdownOpen, setBarDropdownOpen] = useState(false);

  // Data for Doughnut chart
  const scholarshipData = {
    "0-50k": 10,
    "50k-1L": 15,
    "1L-1.5L": 7,
    "1.5L-2L": 8,
    "2L+": 5,
  };

  // Function to filter Doughnut chart data based on the selected filter
  const filterScholarshipData = () => {
    switch (doughnutFilter) {
      case "low":
        return {
          "0-50k": scholarshipData["0-50k"],
          "50k-1L": scholarshipData["50k-1L"],
        };
      case "mid":
        return {
          "1L-1.5L": scholarshipData["1L-1.5L"],
          "1.5L-2L": scholarshipData["1.5L-2L"],
        };
      case "high":
        return { "2L+": scholarshipData["2L+"] };
      default:
        return scholarshipData;
    }
  };

  // Doughnut chart data configuration
  const doughnutData = {
    labels: Object.keys(filterScholarshipData()),
    datasets: [
      {
        label: "Count of Girls",
        data: Object.values(filterScholarshipData()),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Light Red
          "rgba(255, 205, 86, 0.6)", // Light Yellow
          "rgba(75, 192, 192, 0.6)", // Light Teal
          "rgba(54, 162, 235, 0.6)", // Light Blue
          "rgba(153, 102, 255, 0.6)", // Light Purple
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Dark Red
          "rgba(255, 205, 86, 1)", // Dark Yellow
          "rgba(75, 192, 192, 1)", // Dark Teal
          "rgba(54, 162, 235, 1)", // Dark Blue
          "rgba(153, 102, 255, 1)", // Dark Purple
        ],
        borderWidth: 2,
      },
    ],
  };

  // Doughnut chart options
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#fff" } },
      title: {
        display: true,
        text: "Monthly Income vs Scholarship Distribution",
        color: "#fff",
        font: {
          size: 15, // Default size, can be adjusted as needed
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutBounce",
    },
  };

  // Data for Bar chart
  const rightsData = {
    Aadhar: 30,
    PAN: 40,
    "Birth Certificate": 25,
    "Other Docs": 35,
  };

  // Function to filter Bar chart data based on the selected filter
  const filterRightsData = () => {
    switch (barFilter) {
      case "Aadhar":
        return { Aadhar: rightsData["Aadhar"] };
      case "PAN":
        return { PAN: rightsData["PAN"] };
      case "Birth Certificate":
        return { "Birth Certificate": rightsData["Birth Certificate"] };
      case "Other Docs":
        return { "Other Docs": rightsData["Other Docs"] };
      default:
        return rightsData;
    }
  };

  // Bar chart data configuration
  const barData = {
    labels: Object.keys(filterRightsData()),
    datasets: [
      {
        label: "Percentage of Students without Documentation",
        data: Object.values(filterRightsData()),
        backgroundColor: [
          "linear-gradient(45deg, rgba(255, 99, 132, 0.7), rgba(255, 99, 132, 1))",
          "linear-gradient(45deg, rgba(54, 162, 235, 0.7), rgba(54, 162, 235, 1))",
          "linear-gradient(45deg, rgba(75, 192, 192, 0.7), rgba(75, 192, 192, 1))",
          "linear-gradient(45deg, rgba(153, 102, 255, 0.7), rgba(153, 102, 255, 1))",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Bar chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#fff" } },
      title: {
        display: true,
        text: "Students without Basic Documentation after Parent Loss",
        color: "#fff",
        font: {
          size: 15,
          lineHeight: 1.2,
        },
      },
    },
    scales: {
      x: { ticks: { color: "rgba(255, 255, 255, 0.8)" } },
      y: { ticks: { color: "rgba(255, 255, 255, 0.8)" } },
    },
    animation: {
      duration: 1500,
      easing: "easeInOutCubic",
    },
  };

  // Handlers for filter selection
  const handleDoughnutFilterSelection = (value) => {
    setDoughnutFilter(value);
    setDoughnutDropdownOpen(false);
  };

  const handleBarFilterSelection = (value) => {
    setBarFilter(value);
    setBarDropdownOpen(false);
  };

  return (
    <>
      <div className=" bg-frameImg bg-no-repeat bg-fixed bg-cover bg-bottom">
        <div className=" bg-black bg-opacity-75 text-white py-8 px-12 max-md:p-0  ">
          <div className="flex text-4xl max-md:text-2xl mb-4">
            <h1 className="text-center">
              <span className="text-yellow-400">Protsahan</span>
              -For a Better Future | Data Visualization
            </h1>
          </div>
          <div className="bg-black py-11 max-p-0 rounded-lg bg-opacity-60">
            <div className="border-[2px] border-dashed border-white rounded-md p-5 m-5">
              <div className="flex justify-around flex-wrap">
                <div className="flex">
                  <span className="text-yellow-300">Timeline:</span>
                  <p>Child entering Protsahan</p>
                </div>
                <div className="flex flex-wrap max-md:flex-col max-md:m-auto">
                  <p className="max-sm:text-center">
                    <span className="text-yellow-300">
                      Potential Consumers:
                    </span>
                    Protsahan Executive Team | Governmental Bodies
                  </p>
                </div>
              </div>
              <div className="text-center p-4">
                <p>
                  These set of data visualisations paints a story of the
                  enrolment data of students on a specified date range/ month/
                  year. It tells the user – how many children have enrolled in
                  Protsahan, basic data related to the pool of children etc.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center max-md:flex-col flex-wrap">
              <div className="flex justify-between items-center w-1/3 max-md:w-full max-md:flex-col mt-10 relative">
                {isDoughnutDropdownOpen && (
                  <div className="absolute md:left-72 max-md:right-2 top-12 mt-2 bg-black bg-opacity-80 border border-purple-600 text-white rounded-md shadow-lg z-10">
                    <div
                      className="p-3 hover:bg-[#080420] cursor-pointer"
                      onClick={() => handleDoughnutFilterSelection("low")}
                    >
                      Low Income
                    </div>
                    <div
                      className="p-3 hover:bg-[#080420] cursor-pointer"
                      onClick={() => handleDoughnutFilterSelection("mid")}
                    >
                      Middle Income
                    </div>
                    <div
                      className="p-3 hover:bg-[#080420] cursor-pointer"
                      onClick={() => handleDoughnutFilterSelection("high")}
                    >
                      High Income
                    </div>
                  </div>
                )}
                <button
                  className="bg-transparent text-white border border-white px-3 py-2 rounded-md flex items-center"
                  onClick={() => setDoughnutDropdownOpen(!isDoughnutDropdownOpen)}
                >
                  <FontAwesomeIcon icon={faFilter} className="mr-2" />
                  Filter Doughnut Chart
                </button>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>

              <div className="flex justify-between items-center w-1/3 max-md:w-full max-md:flex-col mt-10 relative">
                {isBarDropdownOpen && (
                  <div className="absolute md:left-72 max-md:right-2 top-12 mt-2 bg-black bg-opacity-80 border border-purple-600 text-white rounded-md shadow-lg z-10">
                    <div
                      className="p-3 hover:bg-[#080420] cursor-pointer"
                      onClick={() => handleBarFilterSelection("Aadhar")}
                    >
                      Aadhar
                    </div>
                    <div
                      className="p-3 hover:bg-[#080420] cursor-pointer"
                      onClick={() => handleBarFilterSelection("PAN")}
                    >
                      PAN
                    </div>
                    <div
                      className="p-3 hover:bg-[#080420] cursor-pointer"
                      onClick={() => handleBarFilterSelection("Birth Certificate")}
                    >
                      Birth Certificate
                    </div>
                    <div
                      className="p-3 hover:bg-[#080420] cursor-pointer"
                      onClick={() => handleBarFilterSelection("Other Docs")}
                    >
                      Other Documents
                    </div>
                  </div>
                )}
                <button
                  className="bg-transparent text-white border border-white px-3 py-2 rounded-md flex items-center"
                  onClick={() => setBarDropdownOpen(!isBarDropdownOpen)}
                >
                  <FontAwesomeIcon icon={faFilter} className="mr-2" />
                  Filter Bar Chart
                </button>
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphFourth;
