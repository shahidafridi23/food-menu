import React from "react";
import { HeroSvg } from "../../assets/images";
import PrimaryBtn from "../../utils/PrimaryBtn";
const Hero = () => {
  return (
    <section className="md:flex items-center justify-center my-8 md:pt-10 md:pb-10">
      <div className="">
        <HeroSvg className="w-full  h-64 md:h-96" />
      </div>
      <div className="p-6 text-center md:w-1/2 md:px-20 md:text-left">
        <h1 className="text-3xl font-bold mb-4">
          Transform Your <span className="text-light-blue">Menu</span> into a
          Digital Delight, Take Your{" "}
          <span className="text-light-blue">Food</span> Selection Online!
        </h1>
        <p className="mb-4 text-lg">
          Food Menu is an online platform that allows restaurants to manage
          their menus efficiently with customization.
        </p>
        <PrimaryBtn text="Get Started" path="/register" />
      </div>
    </section>
  );
};

export default Hero;
