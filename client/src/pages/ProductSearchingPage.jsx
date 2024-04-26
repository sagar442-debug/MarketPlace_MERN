import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductSearchingPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [productTitle, setProductTitle] = useState(
    params.productTitle ? params.productTitle.replace(/_/g, " ") : ""
  );

  const [selectedOption, setSelectedOption] = useState("");
  const [totalProducts, setTotalProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    if (params.productTitle) {
      setProductTitle(params.productTitle.replace(/_/g, " "));
    } else {
      setProductTitle(""); // Reset productTitle state if the parameter is not present
      navigate("/"); // Redirect to home page if the parameter is not present
    }
    fetchData();
  }, [params, productTitle]);

  useEffect(() => {});

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/product/search?term=${productTitle}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("There was an error fetching the data");
      }

      const data = await response.json();
      setTotalProducts(data);
      setOriginalProducts(data);
    } catch (error) {
      console.error("Error trying to fetch", error.message);
    }
  };

  const handleSelectChange = (e) => {
    const newValue = e.target.value;
    console.log(totalProducts);
    setSelectedOption(e.target.value);
    if (newValue === "lowtohigh") {
      const sortedProducts = [...totalProducts].sort(
        (a, b) => a.price - b.price
      );
      setTotalProducts(sortedProducts);
    } else if (newValue == "hightolow") {
      const sortedProducts = [...totalProducts].sort(
        (a, b) => b.price - a.price
      );
      setTotalProducts(sortedProducts);
    } else if (newValue == "recommended") {
      const sortedProducts = [...totalProducts].sort((a, b) => {
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      });
      setTotalProducts(sortedProducts);
    } else {
      setTotalProducts(originalProducts);
    }
  };

  return (
    <div className="min-h-[95vh] font-monsterrat">
      <div className="title-stuff mt-5 flex justify-between items-center ">
        <h1 className="text-white text-lg">Results for: {productTitle}</h1>
        <select
          className="p-1"
          id="dropdown"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option className="outline-none" value="filters">
            Filters
          </option>
          <option className="outline-none" value="lowtohigh">
            low to high
          </option>
          <option className="outline-none" value="hightolow">
            high to low
          </option>
          <option className="outline-none" value="recommended">
            Recommended
          </option>
        </select>
      </div>

      {totalProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-4 lg:gap-11 mt-4 max-w-full">
          {totalProducts.map((product, i) => (
            <div
              className="card bg-white md:w-[13rem] md:h-[20rem] lg:w-[15rem] lg:h-auto"
              key={i}
            >
              <Link to={`/product/${product._id}`}>
                <img
                  className="w-72 h-48 object-cover"
                  src={product.imgUrl}
                  alt=""
                />
              </Link>

              <div className="texts p-2">
                <div className="flex justify-center">
                  <button className="p-2 w-32 rounded-full text-white bg-black  mr-2 hover:bg-white hover:drop-shadow-lg  duration-200 hover:text-black">
                    Buy
                  </button>
                </div>
                <h3 className=" text-center py-2 text-black whitespace-nowrap overflow-hidden font-medium text-xl">
                  {product.title}
                </h3>
                <h1 className="text-gray-700 text-center text-2xl font-semibold ">
                  ${product.price}
                </h1>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>No products</h1>
      )}

      {/* <div className="card bg-white w-72 ">
        <img
          className="w-72 h-48 object-cover"
          src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4dcd9f93-1594-48b7-9c5d-d4bebee011ed/air-jordan-1-low-g-golf-shoes-knwwrG.png"
          alt=""
        />
        <div className="texts p-2">
          <div className="flex justify-center">
            <button className="p-2 w-32 rounded-full text-white bg-black  mr-2 hover:bg-white hover:drop-shadow-lg  duration-200 hover:text-black">
              Buy
            </button>
          </div>
          <h3 className=" text-center py-2 text-black whitespace-nowrap overflow-hidden font-medium text-xl">
            Title of the products
          </h3>
          <h1 className="text-gray-700 text-center text-2xl font-semibold ">
            $170
          </h1>
        </div>
      </div> */}
    </div>
  );
};

export default ProductSearchingPage;
