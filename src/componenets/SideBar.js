import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faPlayCircle,
  faBell,
  faShoppingBag,
  faGamepad,
  faMusic,
  faNewspaper,
  faFilm,
  faBroadcastTower,
  faLive,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { tooglemenu } from "./utils/appSlice";

const SideBar = () => {
  const darkMode = useSelector((state) => state.dark.isdark);
  const sidebarref = useRef(null);
  const dispatch = useDispatch();
  const showBar = useSelector((state) => state.app.ismenuopen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarref.current && !sidebarref.current.contains(event.target)) {
        dispatch(tooglemenu(false)); // Close sidebar when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div
      className={`transition-all  mt-16   fixed  z-20 duration-700 ${
        showBar ? "w-52" : "w-20"
      } flex flex-col h-screen ${darkMode ? "bg-[#0f0f0f]" : "bg-gray-100"}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => dispatch(tooglemenu(!showBar))}
        className={`p-4 text-left flex items-center ${
          darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"
        }`}
      >
        <FontAwesomeIcon icon={faBars} className="text-lg" />
        {showBar && (
          <span
            className={`ml-4 text-lg font-bold ${darkMode ? "text-white" : ""}`}
          >
            Menu
          </span>
        )}
      </button>

      {/* Main Menu */}
      <div
        ref={sidebarref}
        className={`${darkMode ? "bg-[#282828]" : "bg-white"}`}
      >
        <button
          className={`p-4 flex items-center ${
            darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon
            className={`${darkMode ? "text-white" : ""}`}
            icon={faHome}
          />
          {showBar && (
            <span className={`ml-4 ${darkMode ? "text-white" : ""}`}>Home</span>
          )}
        </button>
        <button
          className={`p-4 flex items-center ${
            darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon icon={faPlayCircle} />
          {showBar && (
            <span className={`${darkMode ? "text-white" : ""} ml-4`}>
              Shorts
            </span>
          )}
        </button>
        <button
          className={`p-4 flex items-center ${
            darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon icon={faBell} />
          {showBar && (
            <span className={`${darkMode ? "text-white" : ""} ml-4`}>
              Subscriptions
            </span>
          )}
        </button>
      </div>

      {/* Subscriptions Section */}
      <div className="mt-4 flex flex-col">
        <p
          className={`px-4 text-sm font-bold ${!showBar && "hidden"} ${
            darkMode ? "text-white" : ""
          }`}
        >
          Your Subscriptions
        </p>
        <button
          className={`p-4 flex items-center ${
            darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon icon={faMusic} />
          {showBar && (
            <span className={`${darkMode ? "text-white" : ""} ml-4`}>
              Music
            </span>
          )}
        </button>
        <button
          className={`p-4 flex items-center ${
            darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon icon={faFilm} />
          {showBar && (
            <span className={`${darkMode ? "text-white" : ""} ml-4`}>
              Movies
            </span>
          )}
        </button>
        <button
          className={`p-4 flex items-center ${
            darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon icon={faGamepad} />
          {showBar && (
            <span className={`${darkMode ? "text-white" : ""} ml-4`}>
              Gaming
            </span>
          )}
        </button>
        <button
          className={`p-4 flex items-center ${
            darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon icon={faBroadcastTower} />
          {showBar && (
            <span className={`${darkMode ? "text-white" : ""} ml-4`}>Live</span>
          )}
        </button>
      </div>

      {/* Library Section */}
      <div className="mt-4 flex flex-col">
        <p
          className={`px-4 text-sm font-bold ${!showBar && "hidden"} ${
            darkMode ? "text-white" : ""
          }`}
        >
          Library
        </p>
        <button
          className={`p-4 flex items-center ${
            darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
          {showBar && (
            <span className={`${darkMode ? "text-white" : ""} ml-4`}>
              Liked Videos
            </span>
          )}
        </button>
        <button
          className={`p-4 flex items-center ${
            darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon icon={faShoppingBag} />
          {showBar && (
            <span className={`${darkMode ? "text-white" : ""} ml-4`}>
              Shopping
            </span>
          )}
        </button>
        <button
          className={`p-4 flex items-center ${
            darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon icon={faNewspaper} />
          {showBar && (
            <span className={`${darkMode ? "text-white" : ""} ml-4`}>News</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
