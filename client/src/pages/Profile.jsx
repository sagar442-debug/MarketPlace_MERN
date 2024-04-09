import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutUser } from "../features/auth/authSlice";

const Profile = () => {
  const { isAuthenticate } = useSelector((state) => state.auth.isAuthenticate);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [fullName, setFullName] = useState("  ");
  const [email, setEmail] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  useEffect(() => {
    const userData = async (req, res) => {
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
        }
        const parsedData = await response.json();

        const finalUserData = parsedData.user;

        setFullName(finalUserData.fullName);
        setEmail(finalUserData.email);
      } catch (error) {
        setMessage(error);
      }
    };

    if (!token) {
      navigate("/");
    }

    userData();
  }, []);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5001/user/changeUserData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            previousPassword,
            newPassword,
          }),
        }
      );
      const output = await response.json();
      const outputMessage = output.message;

      if (!response.ok) {
        notifyError(outputMessage);
      } else {
        notifySuccess(outputMessage);
      }

      setMessage("Data changed successfully");

      setPreviousPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage(error);
      notifyError(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/user/deleteuser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, previousPassword }),
      });
      const output = await response.json();
      const outputMessage = output.message;

      if (!response.ok) {
        notifyError(outputMessage);
      } else {
        notifySuccess(outputMessage);
        dispatch(logoutUser());
        navigate("/");
        localStorage.removeItem("token");
      }
    } catch (error) {}
  };

  return (
    <div className="container mx-auto mt-8 h-[100vh] font-monsterrat ">
      <ToastContainer />

      <h1 className="text-3xl font-medium mb-4 text-center text-white">
        Profile
      </h1>
      <div className="profile-pic flex justify-center ">
        <FaUserCircle className="text-8xl text-white " />
      </div>
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-lg font-medium text-white"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="mt-1 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg  font-medium text-white"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-lg font-medium text-white"
          >
            Current Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={previousPassword}
            onChange={(e) => setPreviousPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-lg  font-medium text-white"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="mt-1 p-2 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center ">
          <Link
            to="/listings"
            type="submit"
            className="bg-gray-300 text-black px-10 py-2 rounded-md hover:bg-gray-400 duration-200 focus:outline-none focus:bg-gray-400 flex items-center space-x-2"
          >
            <h1>My Listings</h1>
            <CiCircleList />
          </Link>
          <button
            onClick={handleSaveChanges}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 duration-200 focus:outline-none focus:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            onClick={handleDelete}
            type="submit"
            className="bg-red-700 text-white px-4 py-2 rounded-md duration-200 hover:bg-red-800 focus:outline-none focus:bg-blue-600"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
