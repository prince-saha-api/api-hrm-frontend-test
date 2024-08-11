import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Index() {
  
  return (
    <>
      <div className="">
        <Bar
          data={{
            labels: ["A", "B", "C", "D"],
            datasets: [
              {
                labels: "Revenue",
                data: [50, 150, 100, 250],
              },
            ],
          }}
        />
      </div>
    </>
  );
}

export default Index;
