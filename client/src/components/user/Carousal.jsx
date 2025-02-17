import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/img3.png";
import img4 from "../../assets/images/img4.png";
import img5 from "../../assets/images/img5.png";
import img6 from "../../assets/images/img6.png";
import img7 from "../../assets/images/img7.png";
import img8 from "../../assets/images/img8.jpg";
import img9 from "../../assets/images/img9.jpg";
import img10 from "../../assets/images/img10.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const Carousel = ({ interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group images into pairs (2 per slide)
  const groupedImages = [];
  for (let i = 0; i < images.length; i += 2) {
    groupedImages.push(images.slice(i, i + 2));
  }

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === groupedImages.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);
    return () => clearInterval(slideInterval);
  }, [interval, groupedImages.length]);

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-lg shadow-md">
      {/* Carousel Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {groupedImages.map((group, index) => (
          <div key={index} className="flex min-w-full">
            {group.map((image, imgIndex) => (
              <img
                key={imgIndex}
                src={image}
                alt={`Slide ${index * 2 + imgIndex + 1}`}
                className="w-1/2 h-96 object-contain"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? groupedImages.length - 1 : prevIndex - 1
          )
        }
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === groupedImages.length - 1 ? 0 : prevIndex + 1
          )
        }
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {groupedImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex
                ? "bg-orange-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
