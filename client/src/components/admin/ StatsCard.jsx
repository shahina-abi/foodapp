import React from "react";

const StatsCard = ({ title, value, color }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg text-white ${color}`}>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
};

export default StatsCard;
