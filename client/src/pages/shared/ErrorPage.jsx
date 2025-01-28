// // src/pages/shared/ErrorPage.jsx
// import React from "react";

// export function ErrorPage() {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
//     </div>
//   );
// }
import React from "react";

const ErrorPage = ({ error }) => {
  console.error("Error caught by ErrorPage:", error); // Debugging the error

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl font-bold text-red-500">An Error Occurred</h1>
      <div className="text-center mt-4">
        <p className="text-lg">
          {error?.statusText || "Something went wrong. Please try again later."}
        </p>
        <p className="text-gray-500">
          {error?.message || "Unknown error occurred."}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
