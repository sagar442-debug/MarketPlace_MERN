import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CategorySelectPage = () => {
  const params = useParams();
  const [categoryTitle, setCategoryTitle] = useState();
  const [totalProducts, setTotalProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [originalProducts, setOriginalProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setCategoryTitle(params.category);
    fetchProducts();
  }, [params]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/category/${params.category}`);

      if (!response.ok) {
        console.error("Error fetching the data");
      }

      const data = await response.json();
      setTotalProducts(data.data);
      setOriginalProducts(data.data);
    } catch (error) {
      console.log("Internal server error", error.message);
    }
  };

  const handleSelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedOption(e.target.value);

    if (totalProducts) {
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
    }
  };

  return (
    <div className="font-monsterrat">
      <div className="title-stuff mt-5 flex justify-between items-center ">
        <h1 className="text-white text-lg">Results for: {categoryTitle}</h1>
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
      <div className="min-h-[95vh]">
        {totalProducts && totalProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-4 lg:gap-11 mt-4 max-w-full">
            {totalProducts.map((product, i) => (
              <div className="card bg-white w-[15rem]" key={i}>
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
      </div>
    </div>
  );
};

export default CategorySelectPage;
