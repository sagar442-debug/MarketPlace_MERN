import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import UpdateProduct from "./UpdateProduct";

const List = ({ product }) => {
  const onDelete = async () => {
    let productId = product._id;
    try {
      const response = await fetch("http://localhost:5001/user/deleteproduct", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        console.log("There was an error fetching the request");
      }
    } catch (error) {}
  };

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
          <h1 className="text-xl font-medium">${product.price}</h1>
        </div>
      </div>
      <div className="flex justify-between">
        <button className=" p-2">
          <FaEdit className="text-gray-700 cursor-pointer text-xl" />
        </button>
        <button onClick={onDelete} className=" p-2">
          <FaTrash className="text-red-600 cursor-pointer text-xl" />
        </button>
      </div>

      <div className=" absolute top-36 left-[38%]">
        <UpdateProduct />
      </div>
    </div>
  );
};

export default List;
