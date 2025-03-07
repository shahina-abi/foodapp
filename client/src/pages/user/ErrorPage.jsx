// export default ErrorPage;
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError(); // Gets the error from React Router
  console.error("Error in Routing:", error);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg text-gray-700">Something went wrong.</p>
      <p className="text-gray-500">
        {error?.statusText || error?.message || "Unknown error occurred."}
      </p>
      <a href="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Go Home
      </a>
    </div>
  );
};

export default ErrorPage;
