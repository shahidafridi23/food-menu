import React from "react";
import CreateAccountImg from "../assets/createAccount.svg";
import DownloadQr from "../assets/downloadqr.svg";
import HardCopyImg from "../assets/hardcopysvg.svg";
import "../styles/qrdes.css";

const Qrcode = () => {
  return (
    <section className="qr-section" id="qrSection">
      <h1>#GetYourQrCode</h1>
      <p>
        This QR code can be displayed on tables or shared online, allowing
        customers to easily access the restaurant's menu from their smartphones.
      </p>

      <div className="steps-container">
        <div className="steps-text">
          <h3>1. Create account</h3>
          <p>
            To get started, you need to create an account on our website. You
            can sign up by providing their business information.
          </p>
        </div>
        <div className="steps-img">
          <img src={CreateAccountImg} alt="steps-img" />
        </div>
      </div>
      <div className="steps-container active">
        <div className="steps-text">
          <h3>2. Download qr code</h3>
          <p>
            The QR code is generated automatically and can be downloaded with
            png format, directly from our website.
          </p>
        </div>
        <div className="steps-img">
          <img src={DownloadQr} alt="steps-img" />
        </div>
      </div>
      <div className="steps-container">
        <div className="steps-text">
          <h3>3. Make hard copy</h3>
          <p>
            Restaurant owners can print hard copies of their menu for in-person
            customers who can scan the qr code by their smartphone.
          </p>
        </div>
        <div className="steps-img">
          <img src={HardCopyImg} alt="steps-img" />
        </div>
      </div>
    </section>
  );
};

export default Qrcode;
