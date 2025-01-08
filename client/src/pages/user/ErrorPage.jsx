import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error("Error caught by ErrorPage:", error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
      <p className="text-gray-700 mt-4">Something went wrong.</p>
      <p className="text-gray-500 mt-2">
        {error.statusText || error.message || "An unexpected error occurred."}
      </p>
      <a href="/" className="mt-6 text-blue-500 hover:underline">
        Go back to the homepage
      </a>
    </div>
  );
};

export default ErrorPage;
