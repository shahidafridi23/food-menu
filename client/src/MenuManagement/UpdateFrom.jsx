import React from "react";
import { useContext } from "react";
import { Context, server } from "../main";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateFrom = ({
  id,
  prevName,
  prevPrice,
  prevDescription,
  prevIsavailable,
  closeUpdate,
}) => {
  const [name, setName] = useState(prevName);
  const [price, setPrice] = useState(prevPrice);
  const [description, setDescription] = useState(prevDescription);
  const [isavailable, setIsavailable] = useState(prevIsavailable);
  const [image, setImage] = useState(null);
  console.log(isavailable);
  const { token, referesh, setReferesh, isLoading, setIsLoading } =
    useContext(Context);

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
    if (token) {
      setIsLoading(true);
      try {
        const { data } = await axios.patch(
          `${server}/menuItems/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log(data);
        toast.success("Item Updated");
        setIsLoading(false);
        setReferesh(!referesh);
      } catch (error) {
        console.log(error);
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
          <h3>Update Item</h3>
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
            type="checkbox"
            checked={isavailable}
            className="check-box-input"
            onChange={(e) => setIsavailable(e.target.checked)}
          />
          <input
            type="file"
            placeholder="image"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button disabled={isLoading} type="submit" className="btn">
            {isLoading ? "processing..." : "Update"}
          </button>
          <h4>Or</h4>
          <button
            onClick={closeUpdate}
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

export default UpdateFrom;
