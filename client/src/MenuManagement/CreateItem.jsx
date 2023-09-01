import React from "react";
import { useModal } from "react-hooks-use-modal";
import addIcon from "../assets/icons/plus.png";
import "../styles/createItem.css";
import CreateForm from "./CreateForm";
const CreateItem = () => {
  const [ModalCreateItem, openCreateItem, closeCreateItem, isOpenCreateItem] =
    useModal("root", {
      preventScroll: true,
      focusTrapOptions: {
        clickOutsideDeactivates: true,
      },
    });
  return (
    <div className="create-btn">
      <img src={addIcon} alt="Create Item" onClick={openCreateItem} />
      <p>Add Items to your menu</p>
      <ModalCreateItem>
        <CreateForm closeCreateItem={closeCreateItem} />
      </ModalCreateItem>
    </div>
  );
};

export default CreateItem;
