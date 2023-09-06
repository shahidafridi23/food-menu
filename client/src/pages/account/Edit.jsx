import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const EditItem = () => {
  const { user, currentItem, setCurrentItem } = useContext(UserContext);
  if (!user) {
    return <Navigate to={"/register"} />;
  }

  const [name, setName] = useState(currentItem?.name);
  const [price, setPrice] = useState(currentItem?.price);
  const [description, setDescription] = useState(currentItem?.description);
  const [isavailable, setIsavailable] = useState(currentItem?.isavailable);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const id = currentItem?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("isavailable", isavailable);
    if (image) {
      formData.append("image", image);
    }
    if (user) {
      try {
        setLoading(true);
        await axios.patch(`/menuItems/${id}`, formData);

        setCurrentItem(null);
        toast.success("Item Updated");
        setLoading(false);
        setRedirect(true);
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error(error?.response?.data?.msg);
      }
    } else {
      console.log("user is not available");
    }
  };

  if (redirect) {
    return <Navigate to={"/account"} />;
  }

  return (
    <div
      className={`${
        loading && "opacity-80"
      } flex items-center justify-center p-2 md:p-6`}
    >
      <div className="md:w-1/2">
        <form className="p-4 md:px-20" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold">Edit Food Item</h2>
          <p className="mb-6">
            If you do not wish to update your item's image, dont upload it.
          </p>
          <div className="group relative">
            <label className="absolute top-[-17px] left-2 bg-white text-black px-2 py-1 group-focus-within:text-light-blue">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              minLength={3}
              required
              placeholder="Chicken Burger"
              className="py-3 px-4 mb-5 border border-gray-300 rounded-md text-base w-full focus:border-light-blue focus:outline-none focus:shadow-none focus:placeholder:text-light-blue focus:label:text-light-blue"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="group relative">
            <label className="absolute top-[-17px] left-2 bg-white text-black px-2 py-1 group-focus-within:text-light-blue">
              Pirce
            </label>
            <input
              type="number"
              name="price"
              value={price}
              placeholder="199Rs"
              min={1}
              max={19999}
              required
              className="py-3 px-4 mb-5 border border-gray-300 rounded-md text-base w-full focus:border-light-blue focus:outline-none focus:shadow-none focus:placeholder:text-light-blue focus:label:text-light-blue"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="group relative">
            <label className="absolute top-[-17px] left-2 bg-white text-black px-2 py-1 group-focus-within:text-light-blue">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              placeholder="How would you like to describe you food?"
              minLength={5}
              required
              className="py-3 px-4 mb-4 resize-none no- border border-gray-300 rounded-md text-base w-full focus:border-light-blue focus:outline-none focus:shadow-none focus:placeholder:text-light-blue focus:label:text-light-blue"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="group relative">
            <label className="absolute top-[-17px] left-2 bg-white text-black px-2 py-1 group-focus-within:text-light-blue">
              Upload Image file
            </label>
            <input
              type="file"
              name="image"
              className="py-3 px-4 mb-5 border border-gray-300 rounded-md text-base w-full focus:border-light-blue focus:outline-none focus:shadow-none focus:placeholder:text-light-blue focus:label:text-light-blue file:bg-transparent file:border-none file:text-lg file:font-medium"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="group relative">
            <label className="group-focus-within:text-light-blue text-md font-medium mr-2 text-center">
              Availability
            </label>
            <input
              type="checkbox"
              name="isavailable"
              checked={isavailable}
              className="w-4 h-4 mb-6"
              onChange={(e) => setIsavailable(e.target.checked)}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="login-btn w-full bg-light-blue border-none text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"
              disabled={loading}
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
