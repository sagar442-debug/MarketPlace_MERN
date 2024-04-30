import React from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaGithubSquare,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2b2b2b] py-4 px-6 flex items-center justify-center space-x-80 font-monsterrat">
      <div className="max-w-[1080px] text-sm md:text-xl flex items-center justify-center ">
        <div className="text-[#8a8989] mr-10">
          Thank you for visiting my website.<br></br> Checkout my socials here:
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
            href="https://github.com/sagar442-debug"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaGithub className="text-3xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
