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
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { tooglemenu } from "./utils/appSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

const SideBar = () => {
  const darkMode = useSelector((state) => state.dark.isdark);
  const sidebarref = useRef(null);
  const goto=useNavigate();
  const  likes=useNavigate();
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
      className={`transition-all mt-16 fixed z-20 bg-black duration-300 ease-in-out ${
        showBar ? "w-52" : "w-16"
      } flex flex-col h-screen ${darkMode ? "bg-[#0f0f0f]" : "bg-gray-100"}`}
    >
      
      {/* <button
        onClick={() => dispatch(tooglemenu(!showBar))}
        className={`p-4 text-left flex items-center ${darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"}`}
      >
        <FontAwesomeIcon icon={faBars} className="text-lg" />
        {showBar && (
          <span
            className={`ml-4 text-lg font-semibold ${darkMode ? "text-white" : ""}`}
          >
            Menunnn
          </span
      </bun>
        )}tton> */}

      {/* Main Menu */}
      <div ref={sidebarref} className={`${darkMode ? "bg-[#282828]" : "bg-white"}`}>
        <button
          className={`p-4 flex items-center ${darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"}`}
        >
         <Link to="/home" > <FontAwesomeIcon   icon={faHome} /></Link>
          {showBar && <span className={`${darkMode ? "text-white" : ""} ml-4`}>Home</span>}
        </button>
        <button
          className={`p-4 flex items-center ${darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"}`}
        >
          <FontAwesomeIcon icon={faPlayCircle} />
          {showBar && <span className={`${darkMode ? "text-white" : ""} ml-4`}>Shorts</span>}
        </button>
        <button
          className={`p-4 flex items-center ${darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"}`}
        >
          <FontAwesomeIcon icon={faBell} />
          {showBar && <span className={`${darkMode ? "text-white" : ""} ml-4`}>Subscriptions</span>}
        </button>
      </div>

      {/* Subscriptions Section */}
      <div className="mt-4 flex flex-col">
        <p className={`px-4 text-sm font-bold ${!showBar && "hidden"} ${darkMode ? "text-white" : ""}`}>
          Your Subscriptions
        </p>
        <button
        // onClick={navigate("/userplaylist")}
          className={`p-4 flex items-center ${darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"}`}
        >
<svg

 onClick={()=>goto("/playlistvideo")}
 xmlns="http://www.w3.org/2000/svg"  fill={darkMode ? "#FFFFFF" : "#000000"}height="23" viewBox="0 0 24 24" width="35" focusable="false" aria-hidden="true"     className=" text-white    "      ><path clip-rule="evenodd" d="M3.75 5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75S20.664 5 20.25 5H3.75Zm0 4c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75S20.664 9 20.25 9H3.75Zm0 4c-.414 0-.75.336-.75.75s.336.75.75.75h8.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-8.5Zm8.5 4c.414 0 .75.336.75.75s-.336.75-.75.75h-8.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h8.5Zm3.498-3.572c-.333-.191-.748.05-.748.434v6.276c0 .384.415.625.748.434L22 17l-6.252-3.572Z" fill-rule="evenodd"></path></svg>          {showBar && <span className={`${darkMode ? "text-white" : ""} ml-4`}>PlayList</span>}
        </button>
        <button
          className={`p-4 flex items-center ${darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"}`}
        >
<svg 
onClick={()=>likes("/LL")}
xmlns="http://www.w3.org/2000/svg"   fill={darkMode ? "#FFFFFF" : "#000000"} height="23" viewBox="0 0 24 24" width="34" focusable="false" aria-hidden="true"    className="  text-white "  ><path clip-rule="evenodd" d="M14.813 5.018 14.41 6.5 14 8h5.192c.826 0 1.609.376 2.125 1.022.711.888.794 2.125.209 3.101L21 13l.165.413c.519 1.296.324 2.769-.514 3.885l-.151.202v.5c0 1.657-1.343 3-3 3H5c-1.105 0-2-.895-2-2v-8c0-1.105.895-2 2-2h2v.282c0-.834.26-1.647.745-2.325L12 1l1.1.472c1.376.59 2.107 2.103 1.713 3.546ZM7 10.5H5c-.276 0-.5.224-.5.5v8c0 .276.224.5.5.5h2v-9Zm10.5 9h-9V9.282c0-.521.163-1.03.466-1.453l3.553-4.975c.682.298 1.043 1.051.847 1.77l-.813 2.981c-.123.451-.029.934.255 1.305.284.372.725.59 1.192.59h5.192c.37 0 .722.169.954.459.32.399.357.954.094 1.393l-.526.876c-.241.402-.28.894-.107 1.33l.165.412c.324.81.203 1.73-.32 2.428l-.152.202c-.195.26-.3.575-.3.9v.5c0 .828-.672 1.5-1.5 1.5Z" fill-rule="evenodd"></path></svg>          {showBar && <span className={`${darkMode ? "text-white" : ""} ml-4`}>Liked Videos</span>}
        </button>
        <button
          className={`p-4 flex items-center ${darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"}`}
        >
          <FontAwesomeIcon icon={faGamepad} />
          {showBar && <span className={`${darkMode ? "text-white" : ""} ml-4`}>Gaming</span>}
        </button>
        <button
          className={`p-4 flex items-center ${darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"}`}
        >
          <FontAwesomeIcon icon={faBroadcastTower} />
          {showBar && <span className={`${darkMode ? "text-white" : ""} ml-4`}>Live</span>}
        </button>
      </div>

      <div className="mt-4 flex flex-col">
        <p className={`px-4 text-sm font-bold ${!showBar && "hidden"} ${darkMode ? "text-white" : ""}`}>
          Library
        </p>
        <button
          className={`p-4 flex items-center ${darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"}`}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
          {showBar && <span className={`${darkMode ? "text-white" : ""} ml-4`}>Liked Videos</span>}
        </button>
        <button
          className={`p-4 flex items-center ${darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"}`}
        >
          <FontAwesomeIcon icon={faShoppingBag} />
          {showBar && <span className={`${darkMode ? "text-white" : ""} ml-4`}>Shopping</span>}
        </button>
        <button
          className={`p-4 flex items-center ${darkMode ? "text-white hover:bg-[#212121]" : "hover:bg-gray-200"}`}
        >
          <FontAwesomeIcon icon={faNewspaper} />
          {showBar && <span className={`${darkMode ? "text-white" : ""} ml-4`}>News</span>}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
