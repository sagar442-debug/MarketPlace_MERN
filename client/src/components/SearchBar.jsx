import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div>
      <form className="">
        <div className="flex relative items-center">
          <input
            placeholder="Search..."
            className="rounded-lg text-black p-2 block outline-none bg-gray-100 w-80"
            type="text"
          />
          <button className="absolute right-2">
            <FaSearch className="h-11 text-black" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
