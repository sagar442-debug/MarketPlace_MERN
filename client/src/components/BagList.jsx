import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const BagList = () => {
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div>
      <div className="lists-component bg-gray-200 py-3 px-5 rounded-xl flex justify-between items-center mt-3">
        <div className="flex space-x-5">
          <img className="h-20 w-20 object-cover" src="" alt="" />
          <div className="details">
            <h1 className="font-medium">Not much</h1>
            <p className="">nothing</p>
            <h1 className="text-xl font-medium">$100</h1>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="quantity text-black border-black text-lg flex space-x-3 items-center border-[1px] justify-center mt-2 px-2 mr-3">
            <button className="" onClick={() => decreaseQuantity()}>
              -
            </button>
            <h1 className="">{quantity}</h1>
            <button className="" onClick={() => increaseQuantity()}>
              +
            </button>
          </div>
          <button className=" p-2">
            <FaTrash className="text-red-600 cursor-pointer text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BagList;
