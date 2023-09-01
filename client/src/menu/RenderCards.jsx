import React from "react";
import Card from "./Card";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return <h4 className="render-title">{title}</h4>;
};

export default RenderCards;
