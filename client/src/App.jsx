import { Route, Routes } from "react-router-dom";
import React from "react";
import axios from "axios";
import {
  Account,
  CreateItem,
  EditItem,
  Home,
  Login,
  Menu,
  Register,
} from "./pages";
import NoMatch from "./utils/NoMatch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./UserContext";

axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <Routes path="/">
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/create" element={<CreateItem />} />
        <Route path="/account/edit" element={<EditItem />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <ToastContainer />
    </UserContextProvider>
  );
};

export default App;
