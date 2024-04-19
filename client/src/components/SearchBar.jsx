import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!params.productTitle) {
      setSearchTitle("");
    }
  }, [params]);

  const changeTitle = (products) => {
    console.log(searchTitle);
    setSearchTitle(products.title);
  };

  const handleOnChange = async (e) => {
    let inputValue = e.target.value;
    setSearchTitle(inputValue);

    try {
      const response = await fetch(
        `http://localhost:5001/product/search?term=${inputValue}`, // Use inputValue instead of searchTitle
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("Error fetching data");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching the data", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTitle !== "") {
      navigate(`/search/${searchTitle.replace(/\s+/g, "_")}`);
    }
    setSearchTitle(products.title);
  };

  return (
    <div>
      <form className="">
        <div className="flex relative items-center">
          <input
            placeholder="Search..."
            onClickCapture={() => setSearchResults([])}
            onChange={handleOnChange}
            value={searchTitle}
            className=" text-black p-2 block outline-none bg-gray-100 w-80"
            type="text"
          />
          <button onClick={handleSubmit} className="absolute right-2">
            <FaSearch className="h-11 text-black" />
          </button>
        </div>
      </form>

      {searchResults.length > 0 && searchTitle.trim() !== "" && (
        <div
          onMouseLeave={() => setSearchResults([])}
          className="bg-gray-100 text-black px-2  absolute w-80 z-40"
        >
          <ul className="">
            {searchResults.slice(0, 15).map((products, i) => (
              <li className="" key={i}>
                <Link
                  className="flex justify-between items-center cursor-pointer hover:text-gray-600 space-y-3"
                  to={`/search/${products.title.replace(/\s+/g, "_")}`}
                  onClick={() => changeTitle(products)}
                >
                  <span className=" duration-200">{products.title}</span>
                  <span className="text-xs text-gray-400 ">
                    {products.category}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
