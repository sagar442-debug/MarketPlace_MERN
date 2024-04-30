import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaShoppingBag } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { Link } from "react-router-dom";
import LoadingComp from "../components/LoadingComp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ProductSlideCarousel = ({ categoryTitle }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bag, setBag] = useState(false);
  const [message, setMessage] = useState("");
  const notifySuccess = (message) => toast.success(message);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3.5,
    },
    smallDesktop: {
      breakpoint: { max: 1024, min: 960 },
      items: 2.5,
    },
    tablet: {
      breakpoint: { max: 720, min: 580 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 340 },
      items: 1.2,
    },
    smallMobile: {
      breakpoint: { max: 340, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const getApi = async () => {
      try {
        if (!categoryTitle) return;
        const response = await fetch(`${apiUrl}/category/${categoryTitle}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getApi();
  }, [loading]);

  const handleBag = async (e, item) => {
    const productId = item._id;
    e.preventDefault();

    if (!token) {
      navigate("/login");
    } else {
      try {
        const response = await fetch(`${apiUrl}/user/addtocart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        });

        if (!response.ok) {
          console.log("Cannot fetch the data");
        } else {
          toast.success("Item added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        console.error("Error", error.message);
      }
    }
  };

  const handleBuy = async (e, item) => {
    e.preventDefault();

    const productId = item._id;
    e.preventDefault();

    if (!token) {
      navigate("/login");
    } else {
      try {
        const response = await fetch(`${apiUrl}/user/addtocart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        });

        if (!response.ok) {
          console.log("Cannot fetch the data");
        } else {
          navigate("/addtobag");
        }
      } catch (error) {
        console.error("Error", error.message);
      }
    }
  };

  return (
    <div className="text-white font-monsterrat">
      <ToastContainer />
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          {product && product.length > 0 ? (
            <div>
              <Carousel className="" responsive={responsive}>
                {product.map((item, index) => (
                  <div
                    key={index}
                    className=" mr-5 bg-[#f6f6f6] shadow-[0_10px_10px_0px_rgba(0,0,0,0.8)] w-72"
                  >
                    <Link key={index} to={`/product/${item._id}`}>
                      <img
                        className="w-72 h-48 object-cover"
                        src={item.imgUrl}
                        alt={item.title}
                      />
                    </Link>
                    <div className="justify-center flex mt-2">
                      <button
                        onClick={(e) => handleBuy(e, item)}
                        className="p-2 w-32 rounded-full  bg-black  mr-2 hover:bg-white hover:drop-shadow-lg  duration-200 hover:text-black"
                      >
                        Buy
                      </button>

                      {!bag ? (
                        <button
                          className="duration200 ease-in"
                          onClick={(e) => handleBag(e, item)}
                        >
                          <FaShoppingBag className="text-black text-xl" />
                        </button>
                      ) : (
                        <button
                          className="duration200 ease-in"
                          onClick={(e) => handleBag(e, item)}
                        >
                          <IoBagCheck className="text-black text-xl" />
                        </button>
                      )}
                    </div>
                    <h3 className=" text-center py-2 text-black whitespace-nowrap overflow-hidden font-medium ">
                      {item.title.length > 30 ? (
                        <div>{item.title.slice(0, 30)}...</div>
                      ) : (
                        <div>{item.title}</div>
                      )}
                    </h3>
                    <div className="flex justify-evenly px-10">
                      <h1 className="text-gray-700 text-center text-2xl py-1 font-semibold ">
                        ${item.price}
                      </h1>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          ) : (
            <div>No products available</div>
          )}
        </>
      )}
      <br />
    </div>
  );
};

export default ProductSlideCarousel;
