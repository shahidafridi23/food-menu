import React from "react";
import { AccountSvg } from "../../assets/images";
import PrimaryBtn from "../../utils/PrimaryBtn";

const Hero = () => {
  return (
    <div className="md:flex md:flex-row-reverse items-center bg-slate-50 justify-center">
      <div className="hero-img  px-6  md:w-1/2">
        <AccountSvg className="w-full h-96" />
      </div>
      <div className="description p-6 text-center md:w-1/2 md:px-20 md:text-left">
        <h1 className="text-3xl font-bold mb-4">
          List down all the <span className="text-light-blue">Food</span> items
          of your restaurant, and{" "}
          <span className="text-light-blue">Manage</span> here with
          customization.
        </h1>
        <p className="mb-4 text-lg">
          Effortlessly manage your food items with full capabilities: Create,
          Read, Update, and Delete dishes at your fingertips, ensuring a dynamic
          and up-to-date online menu.
        </p>
        <PrimaryBtn text="Create" path="/account/create" />
      </div>
    </div>
  );
};

export default Hero;
