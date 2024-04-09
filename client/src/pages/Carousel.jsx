import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current) => (current + 1) % 3); // Assuming you have 3 images in the carousel
    }, 9000);
    return () => clearInterval(interval);
  });

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative font-monsterrat ">
      <div
        className=" flex transition ease-in-out duration-500"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, i) => {
          return (
            <img className="opacity-50" src={slide.imgUrl} key={i} alt="" />
          );
        })}
      </div>
      <div className="absolute z-20 top-0 w-full h-full justify-between items-center text-white px-10 text-3xl flex">
        <button onClick={previousSlide}>
          <FaArrowCircleLeft />
        </button>
        <button onClick={nextSlide}>
          <FaArrowCircleRight />
        </button>
      </div>
      <div className="text-white absolute z-10 top-72 flex space-x-96 whitespace-nowrap ml-24 ">
        {slides.map((slide, index) => {
          return (
            <div
              key={index}
              className=" duration-500 transition ease-out w-[40rem]"
              style={{
                transform: `translateX(-${current * 140}%)`,
              }}
            >
              <h1 className="text-4xl font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  ">
                {slide.title}
              </h1>
              <p className="text-2xl font-medium whitespace-normal drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {slide.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
