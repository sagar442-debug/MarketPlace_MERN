import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const tokenCheck = localStorage.getItem("token");
    if (tokenCheck) {
      navigate("/");
    }
  }, []);

  const onSignUp = async (e) => {
    e.preventDefault();

    if (fullName.length < 6) {
      setMessage("Full name must be at least 6 characters");
    } else if (password.length < 8) {
      setMessage("Password must be at least 8 characters");
    }

    if (
      email == "" ||
      fullName == "" ||
      password == "" ||
      confirmPassword == ""
    ) {
      setMessage("Please enter valid information");
    }
    try {
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullName, password }),
      });

      const data = await response.json();
      const message = data.message;
      setMessage(message);
      if (response.ok) {
        console.log("valid output");
        navigate("/login");
      } else {
        console.log("Invalid output");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className=" min-h-screen flex justify-center items-center font-monsterrat ">
      <div className="bg-slate-100 p-8 rounded shadow-2xl w-96 bg-[#2c2c2c]">
        <h2 className="text-2xl font-semibold mb-6 text-white">Sign Up</h2>
        <form className="">
          <div className="mb-4">
            <label htmlFor="email" className="block  text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="mt-1 p-2 w-full border rounded text-black"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-white">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Full Name"
              className="mt-1 p-2 w-full border rounded "
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="mt-1 p-2 w-full border rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-white">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              className="mt-1 p-2 w-full border rounded"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex space-x-4 items-center">
            <button
              type="submit"
              className="bg-slate-500 py-2 px-4 rounded hover:bg-slate-600 focus:outline-none bg-white text-black duration-500 hover:bg-blue-gray-100"
              onClick={onSignUp}
            >
              Sign Up
            </button>
            <p className="text-xs text-white">
              Already have an account?{" "}
              <Link className="text-blue-700 ml-2 underline" to={"/login"}>
                Login
              </Link>
            </p>
          </div>
          <Link className="underline text-blue-500 text-lg" to={"/"}>
            <h1 className="mt-2">Explore as guest</h1>
          </Link>
          <h1 className="text-red-700">{message ? message : ""}</h1>
        </form>
      </div>
    </div>
  );
};

export default Signup;
