import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [missingValue, setMissingValue] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const isAuthenticate = useSelector((state) => state.auth.isAuthenticate);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    if (email == "" || password == "") {
      setMissingValue(true);
    } else {
      setMissingValue(false);
    }

    try {
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        const token = data.token;

        localStorage.setItem("token", token);
        dispatch(loginUser(data.user));

        navigate("/");
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const tokenCheck = localStorage.getItem("token");
    if (tokenCheck) {
      navigate("/");
    }
  }, []);

  return (
    <div className=" min-h-screen flex justify-center items-center font-monsterrat">
      <div className="bg-slate-100 p-8 rounded shadow-2xl w-96 bg-[#2c2c2c]">
        <h2 className="text-2xl font-semibold mb-6 text-white ">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded outline-none"
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
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded outline-none"
            />
          </div>

          <div className="flex space-x-4 items-center">
            <button
              type="submit"
              onClick={handleLogin}
              className="bg-slate-500 duration-200 hover:bg-blue-gray-100 py-2 px-4 rounded hover:bg-slate-600 focus:outline-none text-black bg-white"
            >
              Login
            </button>
            <p className="text-xs text-white">
              Don't have an account?
              <Link className="text-blue-700 underline ml-2" to={"/signup"}>
                Sign up
              </Link>
            </p>
          </div>
          <Link className="underline text-blue-500 text-lg" to={"/"}>
            <h1 className="mt-2">Explore as guest</h1>
          </Link>
          <h1 className="text-red-700">
            {!missingValue ? "" : "Please input your credentials"}
          </h1>
          <h1 className="text-red-700">{message ? message : ""}</h1>
        </form>
      </div>
    </div>
  );
};

export default Login;
