import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import FileSaver from "file-saver";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const handleDownload = (name, qrcode) => {
    FileSaver.saveAs(qrcode, `${name}-qrcode`);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("/auth/logout");
      console.log(res);
      setUser(null);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div
        className={`top-0 right-0 w-full md:w-1/3 bg-light-blue p-10 text-white fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
        <div className="message">
          <h1 className="text-2xl mb-2">Food Menu</h1>
          <h2 className="text-lg mb-2">Welcome back, {user?.name}</h2>
        </div>

        <div className="qr-code w-60  bg-white rounded-md p-4 text-black">
          <h2 className="text-center text-sm font-semibold mb-2">
            Download your Qr Code, and use your creativity to show the qr code.
          </h2>
          <div className="qrcode w-full rounded-md p-2 border-2">
            <img src={user?.qrcode} alt="qrcode" className="w-full" />
          </div>
          <button
            onClick={() => handleDownload(user?.name, user?.qrcode)}
            type="button"
            className="bg-light-blue text-white text-sm font-semibold border rounded-md hover:text-light-blue hover:border-light-blue hover:bg-white w-full mt-2 py-2"
          >
            Download Qr Code
          </button>
        </div>

        <button
          onClick={handleLogout}
          type="button"
          className="bg-none border-none text-lg text-while font-semibold mt-3"
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
