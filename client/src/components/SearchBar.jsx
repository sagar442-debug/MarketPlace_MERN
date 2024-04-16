import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTitle, setSearchTitle] = useState();

  const handleOnChange = async (e) => {
    setSearchTitle(e.target.value);

    try {
      const response = await fetch(
        `http://localhost:5001/product/search?term=${searchTitle}`,
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

  return (
    <div>
      <form className="">
        <div className="flex relative items-center">
          <input
            placeholder="Search..."
            onChange={handleOnChange}
            className=" text-black p-2 block outline-none bg-gray-100 w-80"
            type="text"
          />
          <button className="absolute right-2">
            <FaSearch className="h-11 text-black" />
          </button>
        </div>
      </form>

      {searchResults.length > 0 && searchTitle.trim() !== "" && (
        <div className="bg-gray-100 text-black p-1  absolute w-80 z-40">
          <ul className="">
            {searchResults.map((products, i) => (
              <li key={i}>{products.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
