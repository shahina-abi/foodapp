import React from "react";

const About = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1683892034683-b6896f6245f9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')",
      }}
    >
      <div className="max-w-4xl bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 m-4">
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-6">
          About FoodBae
        </h1>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-teal-600">FoodBae</span>, your
          ultimate food ordering platform. At FoodBae, we are committed to
          connecting food lovers with their favorite restaurants and delivering
          delicious meals right to their doorsteps. Whether you're craving a
          pizza, a gourmet burger, or a fresh salad, we've got you covered.
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Our platform is designed to provide a seamless food ordering
          experience with an extensive menu selection, easy-to-use interface,
          and fast delivery. Discover new flavors, explore local favorites, and
          indulge in culinary delights from the comfort of your home.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-4">
          Why Choose FoodBae?
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <span className="font-semibold text-teal-600">
              Extensive Restaurant Network:
            </span>{" "}
            Access a wide range of restaurants and cuisines.
          </li>
          <li>
            <span className="font-semibold text-teal-600">
              Fast & Reliable Delivery:
            </span>{" "}
            Enjoy hot and fresh meals delivered quickly to your doorstep.
          </li>
          <li>
            <span className="font-semibold text-teal-600">
              Easy Payment Options:
            </span>{" "}
            Pay securely using your preferred method.
          </li>
          <li>
            <span className="font-semibold text-teal-600">
              Exclusive Deals:
            </span>{" "}
            Save money with special discounts and offers.
          </li>
        </ul>
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h3>
          <p className="text-lg text-gray-700">
            At FoodBae, our mission is to bring people together through the joy
            of food. We strive to create memorable dining experiences and make
            delicious meals accessible to everyone.
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <img
            src="https://cdn.prod.website-files.com/637d6390b70424b49c14ff1e/6452eb41efd9041db4444b33_how-to-start-a-food-delivery-service-THUMBNAIL.webp"
            alt="Food Delivery"
            className="rounded-lg shadow-lg w-80"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
