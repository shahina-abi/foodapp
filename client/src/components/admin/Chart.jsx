import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ data }) => {
  return (
    <div className="max-w-md mx-auto">
      <Pie data={data} />
    </div>
  );
};

export default Chart;
