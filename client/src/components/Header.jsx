import React, { useEffect, useLayoutEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Outlet, useParams } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import { GiConverseShoe } from "react-icons/gi";
import { PiPantsFill } from "react-icons/pi";
import { FaTshirt } from "react-icons/fa";
import { FaRedhat } from "react-icons/fa6";
import { FaBaby } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticate = useSelector((state) => state.auth.isAuthenticate);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState("");
  const [showCross, setShowCross] = useState("hidden");
  const [showHam, setShowHam] = useState("");
  const params = useParams();

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
    navigate("/");
  };

  useEffect(() => {
    setShowHam("");
    setVisibility("hidden");
    setShowCross("hidden");
  }, [params]);

  const toggleHamburger = () => {
    setVisibility("");
    setShowHam("hidden");
    setShowCross("");
  };

  const toggleCross = () => {
    setVisibility("hidden");
    setShowHam("");
    setShowCross("hidden");
  };

  return (
    <div className="">
      <nav className="flex flex-col gap-1 items-center lg:flex md:flex-row lg:py-4 font-monsterrat lg:items-center lg:w-[full] text-white md:flex md:justify-between md:items-center">
        <div className="flex items-center md:flex md:items-center">
          <GiHamburgerMenu
            onClick={toggleHamburger}
            className={`md:hidden text-3xl absolute right-3 text-white top-5 ${showHam}`}
          />
          <RxCross2
            onClick={toggleCross}
            className={`md:hidden text-3xl  absolute right-3 text-white top-5 ${showCross}`}
          />
          <Link to={"/"}>
            <h1 className="text-3xl my-5 md:my-0 md:mb-0 lg:font-semibold lg:text-3xl uppercase md:text-3xl sm:text-3xl md:font-semibold font-semibold  ">
              marketplace
            </h1>
          </Link>
        </div>

        <div className={`md:flex md:items-center ${visibility} duration-150`}>
          <SearchBar />
          <div
            onClick={toggleMenu}
            className="lg:border-white text-center py-2 lg:text-white lg:border-[1px] lg:duration-100 lg:p-2  lg:cursor-pointer lg:hover:bg-white lg:hover:text-black lg:hover:border-white md:border-[1px] md:border-white md:p-2 md:hover:bg-white md:hover:text-black md:text-sm text-2xl sm:font-semibold md:font-medium md:text-nowrap lg:text-lg lg:font-medium pb-2 border-b-2 border-[#5e5d5d] md:border-none "
          >
            All Categories
          </div>
        </div>
        <div
          className={`md:flex md:flex-row md:justify-between md:items-center ${visibility}`}
        >
          <div className="">
            {isOpen && (
              <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onMouseOut={() => setIsOpen(true)}
                className="border-b-2 pb-2 md:pb-0 border-[#5e5d5d] block lg:absolute lg:z-30 lg:left-[55%] lg:top-[50px] lg:border-[1px] md:absolute md:left-[68%] md:top-10 md:z-30 md:px-3 md:bg-white md:text-black md:rounded-md lg:mt-2 lg:bg-white lg:text-black lg:overflow-hidden lg:shadow-xl "
              >
                <div className=" md:border-none md:block lg:w-48 md:w-28 ">
                  <ul className="flex flex-col items-center md:block md:space-y-0 space-y-4">
                    <li className="lg:px-4  lg:py-2 lg:hover:text-gray-600 lg:cursor-pointer">
                      <Link
                        className="flex  items-center space-x-2 text-2xl md:text-lg  lg:flex lg:space-x-5 lg:items-center md:flex md:space-x-3 md:items-center"
                        to={"/category/pants"}
                      >
                        <PiPantsFill />
                        <span>Pants</span>
                      </Link>
                    </li>
                    <li className=" lg:px-4 lg:py-2 lg:hover:text-gray-600 lg:cursor-pointer ">
                      <Link
                        className="flex  items-center space-x-2 text-2xl lg:flex md:text-lg  lg:space-x-5 lg:items-center md:flex md:space-x-3 md:items-center"
                        to={"/category/shirt"}
                      >
                        <FaTshirt />
                        <span>Shirts</span>
                      </Link>
                    </li>
                    <li className="lg:px-4 lg:py-2 lg:hover:text-gray-600 lg:cursor-pointer ">
                      <Link
                        className="flex items-center space-x-2 text-2xl md:text-lg lg:flex lg:space-x-5 lg:items-center md:flex md:space-x-3 md:items-center"
                        to={"/category/shoes"}
                      >
                        <GiConverseShoe />
                        <span>Shoes</span>
                      </Link>
                    </li>
                    <li className="lg:px-4 lg:py-2 lg:hover:text-gray-600 lg:cursor-pointer ">
                      <Link
                        className="flex items-center space-x-2 text-2xl md:text-lg lg:flex lg:space-x-5 lg:items-center md:flex md:space-x-3 md:items-center"
                        to={"/category/hats"}
                      >
                        <FaRedhat />
                        <span>Hats</span>
                      </Link>
                    </li>
                    <li className="lg:px-4 lg:py-2 lg:hover:text-gray-600 lg:cursor-pointer ">
                      <Link
                        className="flex items-center space-x-2 text-2xl md:text-lg lg:flex lg:space-x-5 lg:items-center md:flex md:space-x-3 md:items-center"
                        to={"/category/baby_wears"}
                      >
                        <FaBaby />
                        <span className="whitespace-nowrap">Baby wears</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {isAuthenticate ? (
            <div
              className={`flex flex-col md:flex-row md:flex md:space-x-5 lg:items-center  `}
            >
              <div className="flex flex-col items-center md:flex md:flex-row lg:gap-5 md:gap-2 md:items-center space-y-2 md:space-y-0">
                <Link className="flex items-center space-x-2" to={"/upload"}>
                  <RiUpload2Fill className=" lg:text-2xl md:hover:text-gray-400 md:duration-200" />
                  <span className="md:hidden">Upload</span>
                </Link>
                <Link
                  className="flex items-center space-x-2 md:block"
                  to={"/addtobag"}
                >
                  <FaShoppingBag className=" lg:text-2xl md:hover:text-gray-400 md:duration-200" />
                  <span className="md:hidden">Bag</span>
                </Link>
                <Link
                  className="flex items-center space-x-2 md:block"
                  to={"/profile"}
                >
                  <FaUserCircle className=" lg:text-2xl md:hover:text-gray-400 md:duration-200" />
                  <span className="md:hidden">Profile</span>
                </Link>
              </div>

              <button
                onClick={onLogout}
                className="text-xl my-2 md:my-0 md:border-[1px] md:text-sm lg:text-base  md:border-white md:duration-100 md:p-2 md:rounded-lg md:hover:bg-red-700 md:hover:text-white md:hover:border-red-700 "
                type="submit"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <div
                className={`mt-1 md:mt-0 lg:flex lg:space-x-2 gap-2 md md:flex md:flex-row md:ml-2 items-center text-2xl lg:text-xl md:text-sm md:whitespace-nowrap flex flex-col lg:flex-row ${visibility}`}
              >
                <Link className=" lg:hover:text-gray-300 " to={"/signup"}>
                  Sign up
                </Link>
                <span className="hidden md:block lg:block">Or</span>
                <Link className="lg:hover:text-gray-300" to={"/login"}>
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Header;
