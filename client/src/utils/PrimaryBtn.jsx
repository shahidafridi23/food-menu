import React from "react";
import { Link } from "react-router-dom";

const PrimaryBtn = ({ text, path }) => {
  return (
    <Link
      to={path}
      className="relative inline-flex items-center md:px-12 md:py-3 px-6 py-1 overflow-hidden text-lg font-medium text-light-blue border-2 border-light-blue rounded-full hover:text-white group hover:bg-gray-50"
    >
      <span className="absolute left-0 block w-full h-0 transition-all bg-light-blue opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
      <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </span>
      <span className="relative">{text}</span>
    </Link>
  );
};

export default PrimaryBtn;
