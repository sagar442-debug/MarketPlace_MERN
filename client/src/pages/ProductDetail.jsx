import React, { useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import ProductSlideCarousel from "./ProductSlider";
import { useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  ImageWithZoom,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState();
  const [size, setSize] = useState([]);
  const [altImage, setAltImage] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
    getProduct();
  }, [productId]);

  useEffect(() => {
    if (productData) {
      setImage(productData.imgUrl.split("  "));
    }
  }, [productId]);

  const getProduct = async () => {
    setAltImage("");

    try {
      setThumbnailImage(" ");
      const response = await fetch(`${apiUrl}/category/product/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Error fetching the data");
      }
      const data = await response.json();
      setProductData(data);

      if (typeof data.size === "string") {
        let sizes = data.size.split(",");
        setSize(sizes);
      }
      if (typeof data.altImages == "string") {
        let images = data.altImages.split(" ");
        setAltImage(images);
      }
      setThumbnailImage(data.imgUrl);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const changeThumbnailImage = (image) => {
    if (image) {
      setThumbnailImage(image);
    } else {
      setThumbnailImage(productData.imgUrl);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onAddToBag = async (e) => {
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
          body: JSON.stringify({ productId, quantity }),
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

  const handleBuy = async (e) => {
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
          body: JSON.stringify({ productId, quantity }),
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
    <div className="min-h-[100vh] font-monsterrat">
      <ToastContainer />
      {productData ? (
        <div>
          <div className=" lg:flex lg:mt-10 ">
            <div className="flex justify-center gap-6 items-center lg:block  h-[6rem] mt-2 lg:mr-4 lg:space-y-2  lg:h-[34rem] overflow-hidden">
              <img
                className=" aspect-square object-cover h-16 w-20 cursor-pointer hover:opacity-45 duration-200"
                src={productData.imgUrl}
                onClick={() => changeThumbnailImage(productData.imgUrl)}
                alt=""
              />
              {altImage
                ? altImage.map((image, i) => (
                    <div key={i}>
                      <img
                        className="aspect-square object-cover h-16 w-20 cursor-pointer hover:opacity-45 duration-200"
                        src={image}
                        onClick={() => changeThumbnailImage(image)}
                        alt=""
                      />
                    </div>
                  ))
                : ""}
            </div>
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={125}
              totalSlides={1}
              dragEnabled={false}
              className="h-[100%] lg:mr-10 flex justify-center"
            >
              <Slider className="lg:h-[34rem] lg:w-[28rem] w-[35rem] ">
                <Slide>
                  <ImageWithZoom
                    className="object-center object-cover "
                    src={thumbnailImage}
                    alt=""
                  />
                </Slide>
              </Slider>
            </CarouselProvider>

            <div className=" lg:w-[30rem]">
              <h1 className="text-3xl text-white font-medium text-center lg:text-left mt-4 lg:mt-0">
                {productData.title}
              </h1>
              <h1 className=" text-white font-medium"></h1>
              <h1 className="text-white text-2xl  pt-2 font-semibold">
                Price: ${productData.price}
              </h1>

              <div className="size py-1 text-white">
                <h1>Sizes:</h1>

                {size ? (
                  <div className="grid grid-cols-4 gap-2">
                    {size.map((sizes, i) => (
                      <button
                        key={i}
                        className="border-[1px] px-10 duration-200 hover:border-white hover:bg-white hover:text-black"
                      >
                        {sizes}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-x-1">
                    <button className="border-[1px] px-10 duration-200 hover:border-white hover:bg-white hover:text-black">
                      7
                    </button>
                    <button className="border-[1px] px-10 duration-200 hover:border-white hover:bg-white hover:text-black">
                      8
                    </button>
                    <button className="border-[1px] px-10 duration-200 hover:border-white hover:bg-white hover:text-black">
                      9
                    </button>
                    <button className="border-[1px] px-10 duration-200 hover:border-white hover:bg-white hover:text-black">
                      10
                    </button>
                  </div>
                )}
              </div>
              <div className="desctiption w-[30rem]">
                <h1 className="font-medium text-2xl text-white ">Details:</h1>
              </div>
              <div className="text-white">
                {productData.description.length > 450 ? (
                  <p>
                    {productData.description.slice(0, 450)}
                    <button className="hover:underline">...see more</button>
                  </p>
                ) : (
                  productData.description
                )}
              </div>
              <div className="quantity mt-2 lg:block flex flex-col items-center ">
                <h1 className="text-white">Quantity:</h1>
                <div className="quantity text-white text-xl w-36 flex space-x-6 items-center border-[1px] justify-center mt-2">
                  <button
                    className="border-r-2 px-3 text-2xl"
                    onClick={() => decreaseQuantity()}
                  >
                    -
                  </button>
                  <h1 className="w-3">{quantity}</h1>
                  <button
                    className="border-l-2 pl-2 pr-2"
                    onClick={() => increaseQuantity()}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="buttons mt-6  flex space-x-4 justify-center lg:justify-normal">
                <button
                  onClick={handleBuy}
                  className="text-white border-[1px] border-black bg-black p-3 hover:bg-white hover:text-black hover:border-white duration-200 rounded-xl"
                >
                  Buy now
                </button>
                <button
                  onClick={onAddToBag}
                  className="text-white border-white border-[1px] p-3 hover:bg-white hover:text-black duration-200 rounded-xl flex items-center space-x-3  "
                >
                  <span>
                    <FaBagShopping />
                  </span>
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
          <div className="font-monsterrat font-medium text-white">
            <h1 className="text-3xl my-5 font-medium  ">For you</h1>
            <ProductSlideCarousel categoryTitle={productData.category} />
          </div>
        </div>
      ) : (
        <div className="flex mt-10 space-x-10 relative overflow-hidden ">
          <SkeletonTheme baseColor="#555555" highlightColor="#fcfcfc">
            <Skeleton className="h-[35rem] w-[30rem]" />
          </SkeletonTheme>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
