import React, { useEffect, useState } from "react";
import CardsContainer from "../account/CardsContainer";
import { useParams } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [name, setName] = useState("Restaurant");
  const params = useParams();
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/user/${params.id}`);
        setName(data?.user?.name);
        setAllPosts(data?.user?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="user-menu-sectionn  md:px-20">
        <h3 className="text-2xl font-extralight m-6">
          <span className="text-light-blue">Food</span> Menu
        </h3>
        <div className="menu-hero text-center p-6 md:px-60">
          <h1 className="text-3xl mb-6">
            Welcome to <span className="text-light-blue">{name}</span> Where
            Flavor Takes the <span className="text-light-blue">Spotlight!</span>
          </h1>

          <p className="text-md mb-4">
            We provide the extraordinary flavors meet exceptional service.
            Embark on a culinary journey with our creative dishes, sourced
            locally, and experience gastronomic excellence in an enchanting
            setting.
          </p>
        </div>
      </div>
      <div className="user-card-container">
        <CardsContainer loading={loading} allPosts={allPosts} />
      </div>
    </>
  );
};

export default Menu;
