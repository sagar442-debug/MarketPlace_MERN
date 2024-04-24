import SlidingImages from "../components/SlidingImages.jsx";
import PromotionalImage from "../assets/pictures/promotionalPicture.jpg";
import { useContext, useEffect, useState } from "react";
import Carousel from "./Carousel.jsx";
import ProductSlideCarousel from "./ProductSlideCarousel.jsx";
import { useSelector } from "react-redux";
import LoadingComp from "../components/LoadingComp.jsx";
import DataContext from "../context/DataContext.js";
import TestCarousel from "../components/TestCarousel.jsx";

const Home = () => {
  useContext(DataContext);

  const imageSlider = [
    {
      title: "Jeep Wrangler on 20% off deal",
      description:
        "Get the limited deal offer for jeep wrangler which is available for just this week. Make this jeep wrangler yours and get additional offers",
      imgUrl:
        "https://images.pexels.com/photos/1682666/pexels-photo-1682666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Cheapest vacation tickets",
      description:
        "Lookout for the amazing vacation tickets this summer. You never know which deal you might be able to bag. ",
      imgUrl:
        "https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Check out the new filter option ",
      description:
        "New filter feature has been added. Now enjoy searching more deals and products with multiple benchmarks.",
      imgUrl:
        "https://images.pexels.com/photos/3774903/pexels-photo-3774903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <>
      <TestCarousel />
      <div className="">
        <ProductSlideCarousel />
      </div>
    </>
  );
};

export default Home;
