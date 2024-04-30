import React, { useState } from "react";
import ProductSlider from "./ProductSlider";
import LoadingComp from "../components/LoadingComp";

const ProductSlideCarousel = () => {
  return (
    <div className="">
      <div className="font-monsterrat font-medium text-white">
        <h1 className="text-3xl sm:my-5 my-12  font-medium  ">All Products</h1>
        <ProductSlider categoryTitle={"allproduct"} />
      </div>
      <div className="font-monsterrat font-medium text-white">
        <h1 className="text-3xl my-5 font-medium">Shoes</h1>
        <ProductSlider categoryTitle={"shoes"} />
      </div>
      <div className="font-monsterrat font-medium text-white">
        <h1 className="text-3xl my-5 font-medium  ">Shirts</h1>
        <ProductSlider categoryTitle={"shirt"} />
      </div>
      <div className="font-monsterrat font-medium text-white">
        <h1 className="text-3xl my-5 font-medium  ">Hats</h1>
        <ProductSlider categoryTitle={"hats"} />
      </div>
      <div className="font-monsterrat font-medium text-white mb-10">
        <h1 className="text-3xl my-5 font-medium  ">Hats</h1>
        <ProductSlider categoryTitle={"baby_wears"} />
      </div>
    </div>
  );
};

export default ProductSlideCarousel;
