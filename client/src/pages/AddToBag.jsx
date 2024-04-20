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
  const [totalItem, setTotalItem] = useState(0);
  const [loading, setLoading] = useState(false);
  const [stripeData, setStripeData] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      userData();
    }
  }, [params, token]);

  useEffect(() => {
    updateTotalCost();
  }, [totalCost]);

  const updateTotalCost = () => {
    if (bagProducts.length > 0) {
      let total = 0;
      let updatedStripeData = [];
      bagData.forEach((item, i) => {
        let quantity = item.quantity;
        let price = parseFloat(bagProducts[i].price);
        let cost = quantity * price;
        total += cost;

        updatedStripeData.push({
          quantity: quantity,
          price: price,
          cost: cost,
          title: bagProducts[i].title,
          category: bagProducts[i].category,
          description: bagProducts[i].description,
          imgUrl: bagProducts[i].imgUrl,
          uploadDate: bagProducts[i].uploadDate,
          uploadedBy: bagProducts[i].uploadedBy,
          _id: bagProducts[i]._id,
        });
      });

      // After the loop, update the state once with the updatedStripeData array
      setStripeData(updatedStripeData);
      setTotalCost(total);
    }
  };

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
      setUserId(parsedData.user._id);
      const bagDetails = parsedData.user.cart;
      setTotalItem(bagDetails.length);
      setBagData(bagDetails);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const products = [];
      setLoading(true);
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
      setLoading(false);
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

  const handleCheckOut = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: stripeData }),
      });

      const data = await response.json();

      window.location = data.url;
      if (response.ok) {
        try {
          const empty = await fetch("http://localhost:5001/user/emptycart/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userId }), // Move body property outside of headers
          });

          if (!empty.ok) {
            console.log("Error emptying the cart");
          }
        } catch (error) {
          console.error("There was an error clearing the data", error.message);
        }
      }
    } catch (error) {
      console.log("There was an error", error.message);
    }
  };

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
            let detailId = bagData[i]._id;
            let quantities = bagData[i].quantity;
            return (
              <BagList
                key={i}
                productDetail={bag}
                detailId={detailId}
                quantity={quantities}
                updateTotalCost={updateTotalCost}
              />
            );
          })}
          <div className="text-white mt-5 text-right border-t-[1px] pt-5 border-[#fff7] font-monsterrat">
            <h1 className="text-2xl font-medium">
              {" "}
              Subtotal ({totalItem} item) : ${totalCost}
            </h1>
            <button
              onClick={handleCheckOut}
              className="p-2 bg-[#778f4b] text-white rounded-lg text-xl mt-2 px-4 font-medium hover:bg-gray-500 duration-200"
            >
              Proceed to checkout
            </button>
          </div>
        </>
      ) : (
        <>
          {loading ? (
            <div className="text-white">
              <BeatLoader className="text-center mt-5" color="#fff" size={30} />
            </div>
          ) : (
            <div className="text-white font-monsterrat text-2xl text-center font-medium mt-28">
              Your bag is empty
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AddToBag;
