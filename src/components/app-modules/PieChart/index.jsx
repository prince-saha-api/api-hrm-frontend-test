import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function index() {
  const data = {
    labels: [
      "Early Leave",
      "Today Present",
      "Today On Leave",
      "Today Absent",
      "Today Late",
    ],
    datasets: [
      {
        // label: "",
        type: "doughnut",
        data: [6, 30, 3, 2, 12],
        backgroundColor: [
          "#f9e2af",
          "#50b498",
          "#3fa2f6",
          "#ff4c4c",
          "#ffa823",
        ],
        hoverOffset: 4,
        borderWidth: [2],
      },
    ],
  };
  const options = {};

  return (
    <>
      <div className="pieChartBox">
        <Pie data={data} options={options}></Pie>
      </div>
    </>
  );
}

export default index;
