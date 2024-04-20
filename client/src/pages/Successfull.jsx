import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const Successfull = () => {
  const [visible, setVisible] = useState(true);
  const [checkVisible, setCheckVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCheckVisible(true); // Show the check mark after 3 seconds
      setTimeout(() => {
        setVisible(false); // Hide the component after 4 seconds
        setTimeout(() => {
          // Redirect to homepage after 5 seconds
          window.location.href = "/";
        }, 1000); // Delay redirect for fade out animation
      }, 1000); // Delay hiding for fade in animation
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`min-h-[92.5vh] flex flex-col items-center justify-center font-monsterrat ${
        visible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-200`} // Reduced duration to 200ms
    >
      <div
        className={`text-green-500 ${
          checkVisible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <FaCheck className="text-[15rem]" />
      </div>
      <p className="text-3xl text-white font-semibold mb-4">
        Transaction Successful!!
      </p>
      <p className="text-gray-400">Redirecting...</p>
      <Link to="/" className="text-blue-500 hover:underline mt-4">
        Explore more
      </Link>
    </div>
  );
};

export default Successfull;
