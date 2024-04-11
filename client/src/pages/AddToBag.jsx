import React, { useEffect, useState } from "react";
import BagList from "../components/BagList";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { useParams } from "react-router-dom";

const AddToBag = () => {
  const params = useParams();
  const token = localStorage.getItem("token");
  const [bagData, setBagData] = useState([]);
  const [bagProducts, setBagProducts] = useState([]);
  const navigate = useNavigate();
  const [totalCost, setTotalCost] = useState();

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      userData();
    }
  }, [params, token]);

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
  }, [bagData, token]);

  useEffect(() => {
    let finalCost = 0;
    if (bagProducts.length > 0) {
      bagProducts.forEach((item) => {
        let totalCost = parseInt(item.price);
        finalCost += totalCost;
      });
      setTotalCost(finalCost);
    }
  }, [bagProducts]);

  return (
    <div className="min-h-[100vh] ">
      <div className="flex space-x-4 items-center my-4 justify-center">
        <h1 className="text-3xl text-white font-monsterrat font-semibold ">
          Your bag
        </h1>
        <FaShoppingBag className="text-2xl text-white" />
      </div>
      {bagProducts.length > 0 ? (
        <>
          {bagProducts.map((bag, i) => {
            // setTotalCost(totalCost + bag.price);
            return <BagList key={i} productDetail={bag} />;
          })}
          <div className="text-white text-2xl font-medium mt-5 text-center">
            Total Cost: ${totalCost}
          </div>
        </>
      ) : (
        <div className="text-white">
          <BeatLoader className="text-center mt-5" color="#fff" size={30} />
        </div>
      )}
    </div>
  );
};

export default AddToBag;
