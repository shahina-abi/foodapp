import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-screen text-white"
        style={{
          backgroundImage: `url(https://t3.ftcdn.net/jpg/02/79/75/74/360_F_279757406_PjHAMPHNAEyf5NvyEYlC7mJNRKHHkmCz.jpg)`,
        }}
      >
        <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl font-extrabold mb-6">
            Your Favorite Restaurants in Your Doorstep
          </h1>
          <p className="text-lg mb-8">
            Find your favorite meals delivered fresh and fast.
          </p>
          <div className="w-full max-w-md">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Enter delivery address"
              className="w-full py-3 px-5 text-gray-800 rounded-lg focus:outline-none"
            />
            <div className="flex justify-center space-x-4 p-4">
              <Link
                to="/restaurants"
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-md transition duration-300"
              >
                Find Restaurants
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Join the FoodBae Family</h2>
          <p className="text-lg mb-8">
            Partner with us to grow your business or become a driver and earn on
            your schedule.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/about"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
            >
              About Us
            </Link>
            <Link
              to="/admin/login"
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
            >
              login as admin
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
