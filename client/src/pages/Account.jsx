import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import accountSvg from "../assets/accountsvg.svg";
import menuIcon from "../assets/icons/menu-bar.png";
import PrimaryBtn from "../utils/PrimaryBtn";
import RenderCards from "../components/RenderCards";
import Loader from "../utils/Loader";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Account = () => {
  const { user, currentItem, setCurrentItem } = useContext(UserContext);
  if (!user) {
    return <Navigate to={"/register"} />;
  }

  const [Loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
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

  const handleDeleteItem = async () => {
    if (currentItem) {
      try {
        const response = await axios.delete(`/menuItems/${currentItem._id}`);
        setCurrentItem(null);
        setIsDeleted(true);
        toast.success(response.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <section className="">
      {/* navbar */}
      <header>
        <nav className="px-8 py-6 md:px-20 flex items-center justify-between">
          <div className="logo text-xl md:text-2xl font-bold">
            Food <span className="text-light-blue">Menu</span>{" "}
          </div>
          <div className="profile flex items-center justify-center">
            <h2 className="mr-2 text-md md:text-xl font-medium">
              Muglai Darbar
            </h2>
            <img src={menuIcon} alt="menu-icon" className="w-8" />
          </div>
        </nav>
      </header>

      {/* heroSection */}
      <div className="md:flex md:flex-row-reverse items-center bg-slate-50 justify-center">
        <div className="hero-img  p-6 my-3 md:w-1/2">
          <img src={accountSvg} alt="account-svg" />
        </div>
        <div className="description p-6 text-center md:w-1/2 md:px-20 md:text-left">
          <h1 className="text-3xl font-bold mb-4">
            List down all the <span className="text-light-blue">Food</span>{" "}
            items of your restaurant, and{" "}
            <span className="text-light-blue">Manage</span> here with
            customization.
          </h1>
          <p className="mb-4 text-lg">
            Effortlessly manage your food items with full capabilities: Create,
            Read, Update, and Delete dishes at your fingertips, ensuring a
            dynamic and up-to-date online menu.
          </p>
          <PrimaryBtn text="Create" path="/account/create" />
        </div>
      </div>

      {/* cardSection */}
      <div className="card-section  px-6 md:px-20">
        {/* Search-bar */}
        <div className="w-full md:max-w-md mx-auto my-10">
          <div className="relative flex items-center w-full h-12 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
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
          {Loading ? (
            <div className="loader">
              <Loader />
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
      </div>
      {currentItem && (
        <div className="delete-dialogue-box fixed top-0 left-0 w-full h-screen bg-black  p-6  md:p-20 bg-opacity-70 flex justify-center items-center">
          <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
            <div className="md:flex items-center">
              <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <p className="font-bold">Delete your account</p>
                <p className="text-sm text-gray-700 mt-1">
                  You will lose all of your data by deleting your account. This
                  action cannot be undone.
                </p>
              </div>
            </div>
            <div className="text-center md:text-right mt-4 md:flex md:justify-end">
              <button
                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                onClick={handleDeleteItem}
              >
                Delete
              </button>
              <button
                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
                onClick={() => {
                  setCurrentItem(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Account;
