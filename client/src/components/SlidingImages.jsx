import React, { useEffect, useState } from "react";
import PromotionalImage from "../assets/pictures/promotionalPicture.jpg";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";

const SlidingImages = ({ item }) => {
  return (
    <div className="carousel-item inline-flex items-center justify-center font-monsterrat overflow-hidden">
      <img className="carousel-image aspect-auto" src={item.imgUrl} alt="" />
      <div className="carousel-item-text text-[#fff7f7] text-4xl absolute font-semibold left-[26%] mt-40   drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]">
        <h1 className="">{item.title}</h1>
        <p className="text-xl font-normal w-[900px] whitespace-pre-line">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default SlidingImages;
