import React from "react";

const AdminHeader = () => {
  return (
    <header className="bg-blue-800 text-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
