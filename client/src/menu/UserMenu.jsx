import React, { useEffect, useState } from "react";
import "../styles/usermenu.css";
import axios from "axios";
import { server } from "../main";
import RenderCards from "./RenderCards";
import { useParams } from "react-router-dom";
import Loader from "../utils/Loader";

const UserMenu = () => {
  const [Loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");

  const params = useParams();
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${server}/user/${params.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        setRestaurantName(response.data.user.name);
        setAllPosts(response.data.user.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.description.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  return (
    <div className="user-menu-section">
      <h3>Food Menu</h3>
      <div className="menu-hero">
        <h1>
          Welcome to <span>{restaurantName}</span> Where Flavor Takes the{" "}
          <span>Spotlight!</span>
        </h1>

        <p>
          We provide the extraordinary flavors meet exceptional service. Embark
          on a culinary journey with our creative dishes, sourced locally, and
          experience gastronomic excellence in an enchanting setting.
        </p>
      </div>

      <div className="user-card-container">
        <div className="search-box">
          <input
            type="text"
            name="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div>
          {Loading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h4 className="search-result-text">
                  Showing results for <span>{searchText}</span>
                </h4>
              )}

              <div className="cards-container">
                {searchText ? (
                  <RenderCards
                    data={searchedResults}
                    title="No search results found"
                  />
                ) : (
                  <RenderCards data={allPosts} title="No posts found" />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
