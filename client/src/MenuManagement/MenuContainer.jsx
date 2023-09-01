import React, { useContext } from "react";
import "../styles/menucontainer.css";
import Card from "./Card";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Context, server } from "../main";
import Loader from "../utils/Loader";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return <h4 className="render-title">{title}</h4>;
};

const MenuContainer = () => {
  const { token, referesh } = useContext(Context);
  const [Loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/menuItems`, {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setAllPosts(data.items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    if (token) {
      fetchCards();
    }
  }, [token, referesh]);

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
    <section>
      <div className="card-container">
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
    </section>
  );
};

export default MenuContainer;
