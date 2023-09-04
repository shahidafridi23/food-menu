import React, { useContext, useState } from "react";
import { Sidebar } from "../../components";
import { UserContext } from "../../UserContext";
import { Bar } from "../../assets/icons";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <header>
      <nav className="px-8 py-6 md:px-20 flex items-center justify-between">
        <div className="logo text-xl md:text-2xl font-bold">
          Food <span className="text-light-blue">Menu</span>{" "}
        </div>
        <div className="profile flex items-center justify-center">
          <h2 className="hidden md:block  mr-2 text-md md:text-xl font-medium">
            Welcome back, {user?.name}
          </h2>
          <div
            className="cursor-pointer"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <Bar />
          </div>
        </div>
      </nav>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </header>
  );
};

export default Navbar;
