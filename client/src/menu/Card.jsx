import React from "react";
import CardImg from "../assets/icons/card-image.jpg";
import "../styles/usercard.css";
const Card = ({ name, price, description, isavailable, image }) => {
  return (
    <article className={`card ${!isavailable ? "available" : ""}`}>
      <img src={image || CardImg} alt="" />
      <div className="card-text-container">
        <div className="card-title">
          <p>
            {name.length < 20
              ? name
              : `${name.slice(0, 20)}..` || "Delicious Item"}
          </p>
          <p>&#x20B9;{price || "unk"}</p>
        </div>

        <p>{description || "Doesn't provided"}</p>
      </div>
    </article>
  );
};

export default Card;
