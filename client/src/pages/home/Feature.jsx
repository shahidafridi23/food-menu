import React from "react";
import featureCards from "../../utils/featuresCards";

const Feature = () => {
  return (
    <section id="featureSection" className="px-6 py-16 md:px-60">
      <h1 className="text-3xl font-bold mb-16 text-center">
        Explore What Sets Our Website Apart -
        <br /> Discover Our Key Features
      </h1>
      <div className="feature-cards grid  gap-6 md:gap-16 grid-cols-1 md:grid-cols-2">
        {featureCards.map((card, index) => {
          return (
            <div
              key={index}
              className="p-6  bg-light-blue rounded-lg   text-white "
            >
              <div className="bg-white p-2 w-10 mb-4 rounded-md">
                <img src={card.image} alt={card.title} />
              </div>
              <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
              <p className="text-md">{card.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Feature;
