import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  console.error("Error in Routing:", error); // Debugging

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-700">Something went wrong.</p>
      <p className="text-gray-500">
        {error && typeof error === "object"
          ? JSON.stringify(error, null, 2)
          : "An unexpected error occurred."}
      </p>
      <a
        href="/"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Home
      </a>
    </div>
  );
};

export default ErrorPage;
