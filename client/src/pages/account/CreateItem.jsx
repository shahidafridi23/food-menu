import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";
import FormLoader from "../../utils/FormLoader";

const CreateItem = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to={"/register"} />;
  }

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    if (user) {
      setLoading(true);
      try {
        const { data } = await axios.post(`/menuItems`, formData);
        toast.success("Food Item Created!");
        setRedirect(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong!");
        console.log(error);
      }
    }
  };

  if (redirect) {
    return <Navigate to={"/account"} />;
  }

  return (
    <div className="flex items-center justify-center p-2 md:p-6">
      {loading && <FormLoader />}
      <div className="md:w-1/2">
        <form className="p-4 md:px-20" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold">Create Food Item</h2>
          <p className="mb-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
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
              required
              className="py-3 px-4 mb-5 border border-gray-300 rounded-md text-base w-full focus:border-light-blue focus:outline-none focus:shadow-none focus:placeholder:text-light-blue focus:label:text-light-blue file:bg-transparent file:border-none file:text-lg file:font-medium"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="login-btn w-full bg-light-blue border-none text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"
              disabled={loading}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateItem;
