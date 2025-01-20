import { icon } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const NavigationMenu = ({
  darkMode,
  handleNavigate,
  activeIndex,
  profileImage,
}) => {
  const menuItems = [
    "Home",
    "Community",
    "Shorts",
    "Playlist",
    "Videos",
   "Search" ,
  ];

  const playlist=useSelector((state)=>state.userprofile.playlists);
  const video=useSelector((state)=>state.userprofile.videos);
  const short=useSelector((state)=>state.userprofile.shorts);
  if(playlist==null&&video==null&&short==null)
     { console.log(" ther is not  anything to shown up")
  }
   if(playlist){
   if(playlist.length===0) return <p className=" text-white  text-center ">This channel doesn't have any content</p>;
   }

   
   return (
    <div
      className={`flex   ml-11  border border-b border-black border-b-[#aca3a3]  items-center ${
        darkMode ? "bg-black" : "bg-gray-200"
      } p-4`}
    >
      {/* <img
        src={profileImage}
        alt="User Profile"
        className="w-8 h-8 rounded-full mr-4"
      /> */}
      <div className="flex space-x-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-sm font-medium text-white border-b-2 ${
              activeIndex === index
                ? "border-white"
                : "border-transparent hover:border-white"
            } focus:outline-none transition-all duration-200 hover:text-white`}
            onClick={() => handleNavigate(index)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationMenu;
