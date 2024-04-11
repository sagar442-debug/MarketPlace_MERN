import React, { useEffect, useState } from "react";
import BagList from "../components/BagList";
import { useNavigate } from "react-router-dom";

const AddToBag = () => {
  const token = localStorage.getItem("token");
  const [bagData, setBagData] = useState([]);
  const [bagProducts, setBagProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      userData();
    }
  }, [token]);

  const userData = async () => {
    try {
      const response = await fetch("http://localhost:5001/user/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setMessage("Error fetching the data");
        return;
      }
      const parsedData = await response.json();
      const bagDetails = parsedData.user.cart;
      setBagData(bagDetails);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const products = [];
      for (const bag of bagData) {
        try {
          const response = await fetch(
            `http://localhost:5001/category/product/${bag.productId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            console.log("Error fetching the data");
            continue;
          }
          const data = await response.json();
          products.push(data);
        } catch (error) {
          console.error(error.message);
        }
      }
      setBagProducts(products);
    };

    if (bagData.length > 0) {
      fetchProducts();
    }
  }, [bagData]);

  return (
    <div className="min-h-[100vh]">
      {bagProducts.length > 0 ? (
        bagProducts.map((bag, i) => <BagList key={i} productDetail={bag} />)
      ) : (
        <div>Not available</div>
      )}
    </div>
  );
};

export default AddToBag;
