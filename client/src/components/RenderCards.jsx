import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { DeleteIcon, EditIcon } from "../assets/icons";

const Card = ({ _id, name, price, description, isavailable, image }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { setCurrentItem, user } = useContext(UserContext);
  const handleCurrentItem = () => {
    setCurrentItem({ _id, name, price, description, isavailable, image });
  };

  return (
    <div
      className="relative card p-2 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-6"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="card-img relative bg-black rounded-2xl">
        <img
          src={image}
          alt="card-img"
          className="w-full h-80 object-cover opacity-70 rounded-xl cursor-pointer"
        />
        <div className="price absolute top-3 right-3 px-2 bg-white rounded-xl font-medium">
          &#8377; {price}/-
        </div>
        <div className="title absolute bottom-3 left-3 px-2 text-white text-2xl ">
          {name}
        </div>
      </div>
      {!isavailable && (
        <div className="not-available absolute w-full h-full top-0 left-0 flex justify-center items-center  flex-col p-10 bg-black bg-opacity-50 rounded-xl text-white text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-white mb-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <p>Sorry, Not Available at the moment!</p>
        </div>
      )}
      <div
        className={`absolute overflow-scroll top-32 left-0 w-full bg-white text-black slide-up-content transform rounded-t-3xl rounded-b-xl transition-transform ${
          isExpanded ? "translate-y-0 h-52 p-6 " : "translate-y-full h-0 p-0"
        }`}
      >
        {/* Additional information to slide up */}
        <h1 className="text-2xl mb-2">{name}</h1>
        <h2 className="text-lg font-semibold mb-4">&#8377; {price}/-</h2>
        <p className="mb-4">{description}</p>
        {user && (
          <div className="buttons flex items-center justify-between">
            <Link to={`/account/edit`}>
              <div onClick={handleCurrentItem}>
                <EditIcon />
              </div>
            </Link>

            <div
              className="delete-box cursor-pointer"
              onClick={handleCurrentItem}
            >
              <DeleteIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return <h4 className="text-2xl text-center font-semibold mb-4">{title}</h4>;
};

export default RenderCards;
