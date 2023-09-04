import React, { useContext, useState } from "react";
import { Search } from "../../assets/icons";
import { RenderCards } from "../../components";
import { UserContext } from "../../UserContext";
import DeleteModel from "../../components/DeleteModel";

const CardsContainer = ({ loading, allPosts, setIsDeleted }) => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  const { currentItem } = useContext(UserContext);

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
    <div className="card-section  px-6 md:px-20">
      {/* Search-bar */}
      <div className="w-full md:max-w-md mx-auto my-10">
        <div className="relative flex items-center w-full h-12 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <Search />
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search something.."
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* cards */}
      <div>
        {loading ? (
          <div className="loader">
            <p className="text-2xl font-medium text-center">Loading....</p>
          </div>
        ) : (
          <>
            {searchText && (
              <h4 className="text-2xl text-center mb-4">
                Showing results for{" "}
                <span className="font-semibold">{searchText}</span>
              </h4>
            )}

            <div className="cards-container grid gap-4  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      {currentItem && <DeleteModel setIsDeleted={setIsDeleted} />}
    </div>
  );
};

export default CardsContainer;
