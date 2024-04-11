import React, { useEffect, useLayoutEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Outlet } from "react-router-dom";
import { IoMdPricetag } from "react-icons/io";
import { FaHouseChimney } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaCar, FaShoppingBag } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { loginUser } from "../features/auth/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { RiUpload2Fill } from "react-icons/ri";
import { IoMdCart } from "react-icons/io";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticate = useSelector((state) => state.auth.isAuthenticate);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchData();
      dispatch(loginUser());
    }
  }, []);

  const fetchData = async () => {
    {
      const response = await fetch("http://localhost:5001/auth/check-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      const message = data.message;
      if (message == true) {
        localStorage.removeItem("token");
        dispatch(logoutUser());
      }
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(logoutUser());
  };

  return (
    <div>
      <nav className="flex justify-between py-4 font-monsterrat items-center text-white">
        <Link to={"/"}>
          <h1 className="font-semibold text-3xl uppercase">marketplace</h1>
        </Link>
        <SearchBar />
        <div
          onClick={toggleMenu}
          className="border-white text-white border-[1px] duration-100 p-2 rounded-lg cursor-pointer hover:bg-white hover:text-black hover:border-white"
        >
          All Categories
        </div>
        {isOpen && (
          <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="absolute z-30 left-[59%] top-[50px] border-[1px]  mt-2 bg-white text-black rounded-md overflow-hidden shadow-xl "
          >
            <div className="w-48">
              <ul>
                <li className="px-4 py-2 hover:text-gray-600 cursor-pointer flex space-x-2 items-center">
                  <IoMdPricetag />
                  <Link to={"/buyandsell"}>Buy & Sell</Link>
                </li>
                <li className="px-4 py-2 hover:text-gray-600 cursor-pointer flex space-x-2 items-center">
                  <FaCar />
                  <Link to={"/carsandvehicles"}>Cars & Vehicles</Link>
                </li>
                <li className="px-4 py-2 hover:text-gray-600 cursor-pointer flex space-x-2 items-center">
                  <FaHouseChimney />
                  <Link to={"/realestate"}>RealEstate</Link>
                </li>
              </ul>
            </div>
          </div>
        )}

        {isAuthenticate ? (
          <div className="flex space-x-10 items-center">
            <div className="flex items-center">
              <Link className="mr-8" to={"/upload"}>
                <RiUpload2Fill className="text-2xl  hover:text-gray-400 duration-200" />
              </Link>
              <Link to={"/addtobag"}>
                <FaShoppingBag className="text-xl duration-200 mr-8 hover:text-gray-400" />
              </Link>
              <Link to={"/profile"}>
                <FaUserCircle className="text-2xl duration-200 hover:text-gray-400" />
              </Link>
            </div>

            <button
              onClick={onLogout}
              className="border-[1px] border-white duration-100 p-2 rounded-lg hover:bg-red-700 hover:text-white hover:border-red-700 "
              type="submit"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className="flex space-x-2">
              <Link className="hover:text-gray-300" to={"/signup"}>
                Sign up
              </Link>
              <Link className="hover:text-gray-300" to={"/login"}>
                Login
              </Link>
            </div>
          </>
        )}
      </nav>
      <Outlet />
    </div>
  );
};

export default Header;
