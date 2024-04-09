import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const List = ({ product }) => {
  return (
    <div className="lists-component bg-gray-200 py-3 px-5 rounded-xl flex justify-between items-center mt-3">
      <div className="flex space-x-5">
        <img
          className="h-20 w-20 object-cover"
          src={product.imgUrl}
          alt={product.title}
        />
        <div className="details">
          <h1 className="font-medium">{product.title}</h1>
          <p className="">{product.description.slice(0, 50)}...</p>
          <h1 className="text-xl font-medium">$100</h1>
        </div>
      </div>
      <div className="flex justify-between">
        <button className=" p-2">
          <FaEdit className="text-gray-700 cursor-pointer text-xl" />
        </button>
        <button className=" p-2">
          <FaTrash className="text-red-600 cursor-pointer text-xl" />
        </button>
      </div>
    </div>
  );
};

export default List;
