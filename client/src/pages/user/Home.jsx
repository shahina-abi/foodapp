import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";

function Home() {
  // Access popular items from Redux store

  const popularItems = useSelector((state) => state.food.popularItems);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to FoodBae</h1>
          <p className="text-lg mb-8">
            Your favorite meals delivered fresh and fast, anytime.
          </p>
          <Link
            to="/menu"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition duration-300"
          >
            Order Now
          </Link>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Popular Dishes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Food Item Cards */}
            {popularItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-500">${item.price}</p>
                  <Link
                    to={`/menu/${item.id}`}
                    className="mt-2 inline-block text-orange-500 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Want to Partner With Us?</h2>
          <p className="text-lg mb-6">
            Join the FoodBae family and grow your business.
          </p>
          <Link
            to="/admin/partner"
            className="bg-white text-orange-500 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition duration-300"
          >
            Partner With Us
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
