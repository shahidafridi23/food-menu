import React from "react";
import aboutIcon from "../assets/aboutIcon.svg";
import contactIcon from "../assets/contactIcon.svg";
import "../styles/about.css";
const About = () => {
  return (
    <section className="qr-section" id="aboutSection">
      <h1>#AboutUs</h1>

      <div className="steps-container">
        <div className="steps-text">
          <h3>Who we are?</h3>
          <p className="text-para">
            An online platform that helps restaurants manage their food menus!
          </p>

          <p className="text-para">
            Our goal is to provide an easy-to-use and efficient way for
            restaurants to showcase their menu online and make it accessible to
            their customers.
          </p>
        </div>
        <div className="steps-img">
          <img src={aboutIcon} alt="steps-img" className="icon" />
        </div>
      </div>
      <div className="steps-container active">
        <div className="steps-text">
          <h3>How to reach us?</h3>
          <p className="text-para">
            You can reach us via email at <span>foodmenu@gmail.com,</span>
          </p>
          <p className="text-para">
            Or you can follow us on social media to stay up-to-date with our
            latest news and updates. We're active on <span>facebook</span> and
            <span> instagram.</span>
          </p>
        </div>
        <div className="steps-img">
          <img src={contactIcon} alt="steps-img" className="icon" />
        </div>
      </div>
    </section>
  );
};

export default About;
