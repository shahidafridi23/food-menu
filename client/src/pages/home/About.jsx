import React from "react";

const About = () => {
  return (
    <section
      id="aboutSection"
      className="p-6 md:px-44 md:py-16 bg-slate-50 text-center"
    >
      <div className="mb-16">
        <h1 className="text-3xl font-bold mb-4">Who we are?</h1>
        <p className="mb-4 text-lg">
          Our journey began with a simple idea: to bridge the gap between
          traditional dining and the digital world. We understand the challenges
          that restaurants face in today's competitive landscape, and we are
          here to help them adapt and succeed.
        </p>
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">How to reach us?</h1>
        <p className="mb-4 text-lg">
          For inquiries, support, or assistance, you can reach us via email at
          foodmenu@gmail.com, or by phone at +91 4738755756. Follow us on social
          media facebook, twitter or instagram for updates.
        </p>
      </div>
      <div className="social-links"></div>
    </section>
  );
};

export default About;
