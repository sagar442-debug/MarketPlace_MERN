import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import List from "../components/List";

const Listings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState();
  const [productList, setProductList] = useState([]);
  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchUserProducts = async () => {
      const response = await fetch("http://localhost:5001/user/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log("Failed to fetch the data");
      }
      const data = await response.json();
      setProductList(data.allProducts);
    };
    fetchUserProducts();
  }, [productList]);

  return (
    <div className="font-monsterrat min-h-[100vh] py-5 ">
      <h1 className="text-gray-300 text-2xl font-medium ">Your Listings</h1>
      {productList.length === 0 ? (
        <div className="text-white text-3xl mt-5 font-semibold text-center">
          Upload a product to see the list
        </div>
      ) : (
        productList.map((product) => (
          <List key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export default Listings;
