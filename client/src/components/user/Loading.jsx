// src/components/user/Loading.jsx
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
