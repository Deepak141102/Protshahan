import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { IoMdArrowRoundBack } from "react-icons/io";
import data from "./GovtLinkage.json"; // Ensure path is correct

const ChartComponent = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedYearData, setSelectedYearData] = useState(null);
  const [showCategoryChart, setShowCategoryChart] = useState(false);

  const yearData = Object.keys(data).map((year) => ({
    year,
    total: data[year].total_grand_total,
  }));

  const handleYearClick = (year) => {
    const yearDetails = data[year].data;
    setSelectedYear(year);
    setSelectedYearData(yearDetails);
    setShowCategoryChart(true);
  };

  const handleBackToYearlyChart = () => {
    setShowCategoryChart(false);
    setTimeout(() => {
      setSelectedYear(null);
      setSelectedYearData(null);
    }, 500); // Delay for smooth transition
  };

  const totalChartData = {
    labels: yearData.map((item) => item.year),
    datasets: [
      {
        label: "Grand Total",
        data: yearData.map((item) => item.total),
        backgroundColor: "rgba(224, 70, 31, 1)",
        borderColor: "rgba(224, 70, 31, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  const categoryChartData = {
    labels: selectedYearData
      ? selectedYearData.map((item) => item.category)
      : [],
    datasets: [
      {
        label: `Category Grand Total for ${selectedYear}`,
        data: selectedYearData
          ? selectedYearData.map((item) => item.grand_total)
          : [],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex justify-center py-10 px-4 bg-[#dcdcdc]">
      <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg max-w-6xl">
        <div className="flex justify-start p-4">
          {showCategoryChart && (
            <button
              className="transition-button"
              onClick={handleBackToYearlyChart}
            >
              <IoMdArrowRoundBack className="text-white text-2xl hover:text-gray-300" />
            </button>
          )}
        </div>
        <h1 className="text-2xl font-bold text-[#212331] text-center mb-4">
          Interactive Data Visualization
        </h1>
        <div className="chart-wrapper">
          <div
            className={`chart-container ${
              showCategoryChart ? "slide-out-left" : "slide-in-left"
            }`}
          >
            {!showCategoryChart && (
              <>
                <Bar
                  data={totalChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    onClick: (event, elements) => {
                      if (elements.length > 0) {
                        const year = yearData[elements[0].index].year;
                        handleYearClick(year);
                      }
                    },
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Years →",
                          color: "#e0461f",
                          font: {
                            size: 16,
                            weight: "bold",
                          },
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Total Compensation →",
                          color: "#e0461f",
                          font: {
                            size: 16,
                            weight: "bold",
                          },
                        },
                      },
                    },
                  }}
                />
                <p className="text-center text-[#e0461f] mt-4 text-xl font-semibold">
                  Click on any bar to see the categories
                </p>
              </>
            )}
          </div>
          <div
            className={`chart-container ${
              showCategoryChart ? "slide-in-right" : "slide-out-right"
            }`}
          >
            {showCategoryChart && (
              <Bar
                data={categoryChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Categories →",
                        color: "#9966ff",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Category Total →",
                        color: "#9966ff",
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
      <style>{`.chart-wrapper {
  position: relative;
  width: 100%;
  height: 60vh; /* Set height to 75vh for both charts */
  overflow: hidden;
}

.chart-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 55vh;
  transition: transform 0.5s ease, opacity 0.5s ease;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
}

.slide-in-left {
  transform: translateX(0);
  opacity: 1;
}

.slide-out-left {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-in-right {
  transform: translateX(0);
  opacity: 1;
}

.slide-out-right {
  transform: translateX(100%);
  opacity: 0;
}

.transition-button {
  background: linear-gradient(to right, #333, #555);
  padding: 0.75rem;
  border-radius: 50%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.transition-button:hover {
  transform: scale(1.15);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}
`}</style>
    </div>
  );
};

export default ChartComponent;
