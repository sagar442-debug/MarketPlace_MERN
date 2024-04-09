import React, { useState } from "react";
import ProductSlider from "./ProductSlider";
import LoadingComp from "../components/LoadingComp";

const ProductSlideCarousel = () => {
  // Function to increment the request count

  return (
    <div>
      <div className="font-monsterrat font-medium text-white">
        <h1 className="text-3xl my-5 font-medium  ">All Products</h1>
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
    </div>
  );
};

export default ProductSlideCarousel;
