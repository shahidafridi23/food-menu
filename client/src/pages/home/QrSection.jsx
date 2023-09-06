import React from "react";
import QrCode from "../../assets/placeholders/qrcode.png";
import PrimaryBtn from "../../utils/PrimaryBtn";
const QrSection = () => {
  return (
    <section
      id="qrSection"
      className="px-6 py-16 md:px-24 bg-slate-50 md:flex items-center justify-center"
    >
      <div className="p-6 text-center md:w-1/2 md:px-20 md:text-left">
        <h1 className="text-3xl font-bold mb-4">
          Scan this qr code to see the example food menu
        </h1>
        <p className="mb-6 text-lg">
          To see the menu example click the button or scan this qr code to go
          there, this example menu is for you get the idea of our service.
          Please create account to get your own.
        </p>
        <a
          href="https://food-menu-afridi.netlify.app/menu/64f8bb46ba01c8007c830782"
          target="_blank"
          className="relative inline-flex items-center md:px-12 md:py-3 px-6 py-1 overflow-hidden text-lg font-medium text-light-blue border-2 border-light-blue rounded-full hover:text-white group hover:bg-gray-50"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-light-blue opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="relative">Click here</span>
        </a>
      </div>
      <div className="qr-container md:w-1/2 md:p-20 flex items-center justify-center">
        <div className="qr-code p-6  w-72 h-72 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <img src={QrCode} alt="qrcode" className="w-full h-full" />
        </div>
      </div>
    </section>
  );
};

export default QrSection;
