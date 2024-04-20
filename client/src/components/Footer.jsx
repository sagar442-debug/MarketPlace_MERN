import React from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2b2b2b] py-4 px-6 flex items-center justify-center space-x-80 font-monsterrat">
      <div className="text-gray-500">
        <div>
          <h1 className="">Our MarketPlace</h1>
        </div>
        <ul>
          <li>Home</li>
          <li>Contact</li>
          <li>Profile</li>
        </ul>
      </div>
      <div className="text-gray-500">
        <div>
          <h1 className="">Thank you!</h1>
        </div>
        <ul>
          <li>Random Products</li>
          <li>Shirts</li>
          <li>Pants</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <a
          href="https://www.instagram.com/sagarsapkota091/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400"
        >
          <FaInstagram className="text-3xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/sagar-sapkota091/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400"
        >
          <FaLinkedin className="text-3xl" />
        </a>
        <a
          href="https://twitter.com/sagarsapkota091"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400"
        >
          <FaTwitter className="text-3xl" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
