import React, { useContext } from "react";
import { useState } from "react";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import axios from "axios";

const CreateForm = ({ closeCreateItem }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { token, referesh, setReferesh, isLoading, setIsLoading } =
    useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    if (token) {
      setIsLoading(true);
      try {
        const { data } = await axios.post(`${server}/menuItems`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        toast.success("Item Created");
        setIsLoading(false);
        setReferesh(!referesh);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.msg);
      }
    } else {
      console.log("token is not available");
    }
  };

  return (
    <div>
      <div className="login">
        <div className="logo-section">
          <h3>Create Item</h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`form-container ${isLoading && "loading"}`}
        >
          <input
            type="text"
            placeholder="Name Of Item"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="file"
            placeholder="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <button disabled={isLoading} type="submit" className="btn">
            {isLoading ? "processing..." : "Create"}
          </button>
          <h4>Or</h4>
          <button
            onClick={closeCreateItem}
            className="closeBtn"
            id="createCloseBtn"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
