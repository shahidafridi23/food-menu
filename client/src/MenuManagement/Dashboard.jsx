import React, { useContext, useState } from "react";
import { Context, server } from "../main";
import barIcon from "../assets/icons/menu-bar.png";
import closeIcon from "../assets/icons/close.png";
import qrcodeIcon from "../assets/icons/qrcode.png";
import "../styles/dashboard.css";
import MenuContainer from "./MenuContainer";
import CreateItem from "./CreateItem";
import FileSaver from "file-saver";

import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated, user, setUser, setToken } = useContext(Context);
  const handleToggleBar = () => {
    setIsOpen(true);
  };
  const handleCloseBtn = () => {
    setIsOpen(false);
  };

  function downloadImage(_id, image) {
    FileSaver.saveAs(image, `qrcode-${_id}.jpg`);
  }

  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <section>
      <div className="header">
        <h1>Food Menu</h1>
        <div className="toggle">
          <img src={barIcon} alt="toggle-btn" onClick={handleToggleBar} />
        </div>
      </div>

      <article className={`side-bar ${isOpen && "open"}`}>
        <img
          src={closeIcon}
          alt="close-icon"
          className="close-icon"
          onClick={handleCloseBtn}
        />

        <h2>Food Menu</h2>

        <h3>
          Welcome, <span>{user && user.name}</span>
        </h3>

        <div className="qr-code">
          <h4>Your Qr Code</h4>

          <img src={(user && user.qrcode) || qrcodeIcon} alt="qrcode" />

          <p>
            Download the QR code and unleash your creativity to make it visually
            appealing!
          </p>

          <button
            type="button"
            onClick={() => downloadImage(user._id, user.qrcode)}
          >
            Download
          </button>
        </div>

        {user && user._id && (
          <a
            href={`https://food-menu-afridi.netlify.app/api/v1/user/${user._id}`}
            target="_blank"
            className="menu-link"
          >
            see your menu
          </a>
        )}

        <button type="button" className="logout-btn" onClick={handleLogOut}>
          Log Out
        </button>
      </article>

      <div className="main-section">
        <h1>
          Create, Update and Delete your <span>Food Menu</span> items here...
        </h1>
        <p>
          Empower your culinary vision with our powerful menu management tool.
          From crafting delectable dishes to refining your offerings,
          effortlessly shape your menu to perfection.
        </p>
      </div>

      <CreateItem />

      <MenuContainer />
    </section>
  );
};

export default Dashboard;
