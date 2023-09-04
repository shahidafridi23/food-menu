import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar";
import Hero from "./Hero";
import CardsContainer from "./CardsContainer";

const Account = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to={"/register"} />;
  }

  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/menuItems`);
        console.log(data);
        setAllPosts(data.items);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (user) {
      fetchCards();
    }
  }, [user, isDeleted]);

  return (
    <section>
      <Navbar />
      <Hero />
      <CardsContainer
        loading={loading}
        allPosts={allPosts}
        setIsDeleted={setIsDeleted}
      />
    </section>
  );
};

export default Account;
