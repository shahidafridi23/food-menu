import React from "react";
import "../styles/feature.css";
import featuresCards from "../utils/featuresCards.js";

const Card = ({ title, image, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-card-img">
        <img src={image} alt="card-img" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section className="feature-section" id="featureSection">
      <h1>#Features</h1>
      <p>
        Our website offers several features that facilitate menu management for
        users.
      </p>
      <div className="feature-cards-container">
        {console.log(featuresCards)}
        {featuresCards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
};

export default Features;
