// src/components/OfferCarrousal.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const OfferCarrousal = ({ offers }) => {
  return (
    <div className="bg-yellow-100 p-4 rounded-lg">
      <Swiper
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {offers.map((offer, index) => (
          <SwiperSlide key={index}>
            <div className="text-center p-6 bg-yellow-300 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-white">{offer.title}</h2>
              <p className="text-lg text-white mt-2">{offer.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OfferCarrousal;
