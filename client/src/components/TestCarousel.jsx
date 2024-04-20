import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Dot,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { Link } from "react-router-dom";

const TestCarousel = () => {
  return (
    <CarouselProvider
      className="font-monsterrat h-[40vh] "
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={3}
      interval={3000}
      isPlaying={true}
      infinite={true}
    >
      <Slider>
        <Slide index={0}>
          <div className="pl-24 py-20 space-y-4">
            <h1 className="text-white text-4xl  font-semibold">
              {" "}
              Get yourselves the new nike 24's
            </h1>
            <p className="text-white w-[40rem] mt-5">
              Whether you're hitting the gym or the streets, gear up in Nike
              24's to experience unparalleled comfort and functionality. Don't
              miss out on the opportunity to step up your game – grab your Nike
              24's gear today!
            </p>
            <Link to={"/category/shoes"}>
              <button className="text-white text-lg border-white border-[1px] p-3 hover:bg-white hover:text-black duration-200 rounded-xl flex items-center space-x-3  ">
                <span>
                  <MdOutlineExplore className="text-2xl" />
                </span>
                <span>Check it out</span>
              </button>
            </Link>
          </div>

          <Image
            className="absolute top-0 -z-10 w-[80rem] h-[20rem]   opacity-40 object-cover aspect-auto"
            src="https://images.pexels.com/photos/1034675/pexels-photo-1034675.jpeg"
            alt=""
            index={0}
          />
        </Slide>
        <Slide index={1}>
          <div className="pl-24 py-20 space-y-4">
            <h1 className="text-white text-4xl  font-semibold">
              {" "}
              New street wears available!!
            </h1>
            <p className="text-white w-[40rem] mt-5">
              Exciting news! Fresh streetwear styles are now up for grabs!
              Elevate your urban look with the latest trends in street fashion.
              Explore our new arrivals today and upgrade your streetwear game!
            </p>
            <Link to={"/category/shirt"}>
              <button className="text-white text-lg border-white border-[1px] p-3 hover:bg-white hover:text-black duration-200 rounded-xl flex items-center space-x-3  ">
                <span>
                  <MdOutlineExplore className="text-2xl" />
                </span>
                <span>Check it out</span>
              </button>
            </Link>
          </div>
          <Image
            className="absolute top-0 -z-10 w-[80rem] h-[20rem]   opacity-40 object-cover aspect-auto"
            src="https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            index={0}
          />
        </Slide>
        <Slide index={2}>
          <div className="pl-24 py-20 space-y-4">
            <h1 className="text-white text-4xl  font-semibold">
              {" "}
              Summers here!!
            </h1>
            <p className="text-white w-[40rem] mt-5">
              Get ready to soak up the sun in style with our latest summer drop!
              From breezy tees to vibrant swimwear, we've got everything you
              need to make a splash this season. Click the "Check it out" button
              now to dive into our wide range of variety and find your perfect
              summer essentials.
            </p>
            <Link to={"/category/shirt"}>
              <button className="text-white text-lg border-white border-[1px] p-3 hover:bg-white hover:text-black duration-200 rounded-xl flex items-center space-x-3  ">
                <span>
                  <MdOutlineExplore className="text-2xl" />
                </span>
                <span>Check it out</span>
              </button>
            </Link>
          </div>
          <Image
            className="absolute top-0  -z-10 w-[80rem] h-[20rem]   opacity-40 object-cover aspect-auto"
            src="https://images.pexels.com/photos/5370424/pexels-photo-5370424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            index={0}
          />
        </Slide>
      </Slider>
      <div className="absolute top-[22%] w-[1080px] px-5 flex justify-between items-center">
        <ButtonBack className="bg-[#00000027] hover:bg-black duration-200 rounded-full p-2">
          <FaChevronLeft className="text-3xl text-white" />
        </ButtonBack>
        <ButtonNext className="bg-[#00000027] hover:bg-black duration-200 rounded-full p-2">
          <FaChevronRight className="text-3xl text-white" />
        </ButtonNext>
      </div>
    </CarouselProvider>
  );
};

export default TestCarousel;
