import { Route, Routes } from "react-router-dom";
import React from "react";
import axios from "axios";
import { Account, CreateItem, EditItem, Home, Menu } from "./pages";
import { Login, Register } from "./components";
import NoMatch from "./utils/NoMatch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./UserContext";

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;
axios.defaults.withCredentials = true;

function withUserContext(Component) {
  return () => (
    <UserContextProvider>
      <Component />
    </UserContextProvider>
  );
}

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={withUserContext(Login)()} />
        <Route path="/register" element={withUserContext(Register)()} />
        <Route path="/account" element={withUserContext(Account)()} />
        <Route path="/account/create" element={withUserContext(CreateItem)()} />
        <Route path="/account/edit" element={withUserContext(EditItem)()} />
        <Route path="/menu/:id" element={<Menu />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
