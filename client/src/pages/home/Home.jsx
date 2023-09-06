import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import QrSection from "./QrSection";
import Feature from "./Feature";
import About from "./About";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <QrSection />
      <Feature />
      <About />
    </>
  );
};

export default Home;
