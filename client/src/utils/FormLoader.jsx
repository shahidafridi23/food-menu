import React from "react";

const FormLoader = () => {
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-screen bg-black bg-opacity-60 flex items-center justify-center">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-white"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-white"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-white"></div>
      </div>
    </div>
  );
};

export default FormLoader;
