import React, { useState } from "react";
import { Link } from "react-scroll";
import { Link as RedirctLink } from "react-router-dom";
import { Bar } from "../../assets/icons";

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div className="bg-gray-100 font-sans w-full m-0">
      <div className="bg-white shadow">
        <div className="container mx-auto lg:px-10 px-6">
          <div className="flex items-center justify-between py-4">
            <p className="logo text-xl font-medium">
              <span className="text-light-blue">Food </span>
              Menu
            </p>

            <div className="hidden md:flex md:items-center">
              <Link
                to="/"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                className="text-gray-800 text-lg font-semibold hover:text-light-blue mr-6 cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="qrSection"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                className="text-gray-800 text-lg font-semibold hover:text-light-blue mr-6 cursor-pointer"
              >
                Qr Code
              </Link>
              <Link
                to="featureSection"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                className="text-gray-800 text-lg font-semibold hover:text-light-blue mr-6 cursor-pointer"
              >
                Features
              </Link>
              <Link
                to="aboutSection"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                className="text-gray-800 text-lg font-semibold hover:text-light-blue mr-6 cursor-pointer"
              >
                About Us
              </Link>
            </div>

            <div className="hidden md:flex md:items-center">
              <RedirctLink
                to="/login"
                href="#"
                className="text-gray-800 text-sm font-semibold hover:text-light-blue mr-4"
              >
                Sign in
              </RedirctLink>
              <RedirctLink
                to="/register"
                className="bg-light-blue text-white text-sm font-semibold border px-4 py-2 rounded-lg hover:text-light-blue hover:border-light-blue hover:bg-white"
              >
                Sign up
              </RedirctLink>
            </div>

            <div
              className="md:hidden cursor-pointer"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <Bar />
            </div>
          </div>
        </div>
        <div
          className={`absolute top-16 w-full px-6 overflow-hidden sm:hidden bg-white transform transition-transform ${
            isOpenMenu
              ? "translate-y-0 h-screen p-6 "
              : "translate-y-full h-0 p-0"
          }`}
        >
          <div className="flex flex-col h-9xl">
            <Link
              to="/"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              onClick={() => setIsOpenMenu(!isOpenMenu)}
              className="text-gray-800  font-semibold hover:text-light-blue mr-6 cursor-pointer mt-2 text-md"
            >
              Home
            </Link>
            <Link
              to="qrSection"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              onClick={() => setIsOpenMenu(!isOpenMenu)}
              className="text-gray-800  font-semibold hover:text-light-blue mr-6 cursor-pointer mt-2 text-md"
            >
              Qr Code
            </Link>
            <Link
              to="featureSection"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              onClick={() => setIsOpenMenu(!isOpenMenu)}
              className="text-gray-800  font-semibold hover:text-light-blue mr-6 cursor-pointer mt-2 text-md"
            >
              Features
            </Link>
            <Link
              to="aboutSection"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              onClick={() => setIsOpenMenu(!isOpenMenu)}
              className="text-gray-800 font-semibold hover:text-light-blue mr-6 cursor-pointer mb-4 mt-2 text-md"
            >
              About Us
            </Link>
            <div className="flex justify-between items-center border-t-2 pt-2">
              <RedirctLink
                to={"/login"}
                className="text-gray-800 text-sm font-semibold hover:text-light-blue mr-4"
              >
                Sign in
              </RedirctLink>
              <RedirctLink
                to={"/register"}
                className="bg-light-blue text-white text-sm font-semibold border px-4 py-2 rounded-lg hover:text-light-blue hover:border-light-blue hover:bg-white"
              >
                Sign up
              </RedirctLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
