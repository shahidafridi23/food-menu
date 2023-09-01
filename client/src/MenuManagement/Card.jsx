import React, { useContext, useState } from "react";
import cardImage from "../assets/icons/card-image.jpg";
import "../styles/card.css";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useModal } from "react-hooks-use-modal";
import UpdateFrom from "./UpdateFrom";
const Card = ({ _id, name, price, description, isavailable, image }) => {
  const [loading, setLoading] = useState(false);
  const { token, referesh, setReferesh } = useContext(Context);
  const [ModalUpdate, openUpdate, closeUpdate, isOpenUpdate] = useModal(
    "root",
    {
      preventScroll: true,
      focusTrapOptions: {
        clickOutsideDeactivates: true,
      },
    }
  );

  const handleDeleteItem = async () => {
    setLoading(true);
    if (token) {
      try {
        const response = await axios.delete(`${server}/menuItems/${_id}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        toast.success(response.data);
        setLoading(false);
        setReferesh(!referesh);
      } catch (error) {
        toast.error(error.response.data.msg);
        setLoading(false);
      }
    } else {
      console.log("token is not available");
    }
  };

  return (
    <article className={`card ${!isavailable ? "is-available" : ""}`}>
      <img src={image || cardImage} alt="card-image" />
      <div className="title">
        <p>{name || "delicious item"}</p>
        <p>&#x20B9;{price || "unk"}</p>
      </div>
      <div className="description">
        {description && <p>{description}</p>}

        {!isavailable && (
          <p className="available-title">Not available at the moment</p>
        )}
      </div>

      <ModalUpdate>
        <UpdateFrom
          id={_id}
          prevName={name}
          prevPrice={price}
          prevDescription={description}
          prevIsavailable={isavailable}
          closeUpdate={closeUpdate}
        />
      </ModalUpdate>

      <div className="buttons-cntrl">
        <button type="button" onClick={openUpdate}>
          Edit
        </button>
        <button type="button" disabled={loading} onClick={handleDeleteItem}>
          Delete
        </button>
      </div>
    </article>
  );
};

export default Card;
