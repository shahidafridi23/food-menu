import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                onClick={handleCurrentItem}
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
              </svg>
            </Link>

            <div
              className="delete-box cursor-pointer"
              onClick={handleCurrentItem}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  clipRule="evenodd"
                />
              </svg>
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
