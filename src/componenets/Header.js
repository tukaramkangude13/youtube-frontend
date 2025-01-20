import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faMicrophone, faMoon, faSearch, faSun, faUser, faHome, faVideo, faPlayCircle, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode, toggledark } from './utils/darkmodeSlice';
import { setsearchResult } from './utils/searchResultSlice';
import { CHANNEL_ID, YOUR_API_KEY, YOUTUBE_SEARCH_API } from './utils/constant';
import { togglesearch } from './utils/darkmodeSlice';
import { tooglemenu } from './utils/appSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [suggestion, setsuggestion] = useState(null);
  const dispatch = useDispatch();
  const darkk = useSelector((state) => state.dark.isdark); // Accessing dark mode state
  const searchRef = useRef(null); // Search input reference
  const sidebarRef = useRef(null);
  const navigate=useNavigate(null);
  const watching = useSelector((state) => state.app.watch);
  const bore = useSelector((state) => state.app.ismenuopen);
  const search = async () => {
    const query = searchRef.current?.value;
    if (query) {
      const call = await fetch(`${YOUTUBE_SEARCH_API}${query}`);
      const data = await call.json();
      setsuggestion(data[1]);
    }
  };

  const handleToggle = () => {
    dispatch(toggledark(!darkk));
    localStorage.setItem('darkMode', !darkk);
  };

  const makeApiCall = async (value1) => {
    const value2 = value1.current.value;
    if (value2) {
      const get = await fetch(`${CHANNEL_ID}{${value2}&type=video&maxResults=50&key=${YOUR_API_KEY}`);
      const make = await get.json();
      dispatch(setsearchResult(make));
    }
  };

  const hardwork = () => {
    dispatch(tooglemenu(!bore));
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    dispatch(setDarkMode(storedDarkMode));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      search();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

const handlekey=(event)=>{
  if(event.key==="Enter"){
    makeApiCall(searchRef);
    setsuggestion(null);
  }

}
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        dispatch(togglesearch(false));
      } 
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch]);

  return (
    <div
      ref={sidebarRef}
      className={`flex fixed justify-between mb-96 z-20 items-center p-4 shadow-md w-full ${darkk ? 'bg-[#292929] text-white' : 'bg-white text-black'}`}
    >
      <div className="flex items-center gap-5">
        <div className="relative">
          {watching && <FontAwesomeIcon onClick={hardwork} icon={faBars} className={darkk ? 'text-white' : 'text-black'} />}
          <button
            onClick={handleToggle}
            className={`w-12 h-6 rounded-full flex items-center  transition-all duration-300 ${darkk ? 'bg-white' : 'bg-black'}`}
          ><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" className='  absolute   left-96  text-white  ' aria-hidden="true" ><path clip-rule="evenod" d="M22.146 11.146a.5.5 0 01-.353.854H20v7.5a1.5 1.5 0 01-1.5 1.5H14v-8h-4v8H5.5A1.5 1.5 0 014 19.5V12H2.207a.5.5 0 01-.353-.854L12 1l10.146 10.146Z" fill-rule="evenodd"></path></svg>
            <div className={`w-6 h-6 rounded-full bg-white transition-all duration-300 ${darkk ? 'transform translate-x-6' : 'transform translate-x-0'}`}>
              <FontAwesomeIcon icon={darkk ? faMoon : faSun} className="text-black m-auto" />
            </div>
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="90" height="24" className="mt-1" viewBox="0 0 93 20" role="img" aria-label="YouTube logo">
            <g>
              <path d="M14.48 20c0 0 9.08 0 11.34-.6 1.27-.34 2.23-1.3 2.56-2.52.62-2.22.62-7.08.62-7.08s0-4.76-.62-7c-.34-1.24-1.28-2.18-2.56-2.52-2.26-.6-11.34-.6-11.34-.6s-9.08 0-11.34.6c-1.25.33-2.22 1.28-2.56 2.52C.6 4.76.6 9.56.6 9.56s0 4.86.62 7.08c.33 1.23 1.3 2.18 2.56 2.52 2.26.6 11.34.6 11.34.6z" fill="#FF0000"></path>
              <path d="M19 10L11.5 5.75v8.5L19 10z" fill="#FFF"></path>
            </g>
          </svg>
          <button className="text-2xl font-semibold ml-2">YouTube</button>
        </div>
      </div>

      <div className="relative flex items-center">
        <input
        onKeyDown={handlekey}
          type="text"
          onChange={search}
          ref={searchRef}
        
          placeholder="Search"
          className={`w-96 h-10 border border-[#212121] rounded-l-full px-4 outline-none focus:ring-2 ${darkk ? 'bg-black text-white' : 'bg-white text-black'} focus:ring-[#ff4081]`}
        />
        {suggestion && (
          <div className="absolute   top-16     w-96 bg-white shadow-lg rounded-lg z-50 text-black">
            {suggestion.map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  searchRef.current.value = item;
                  setsuggestion(null);
                }}
              >
                <FontAwesomeIcon     icon={faSearch} /> {item}
              </div>
            ))}
          </div>
        )}
        <button
          className="h-10 w-14 border border-[#212121] rounded-r-full flex items-center justify-center hover:bg-[#212121] transition-all duration-300"
          onClick={() =>{ makeApiCall(searchRef)
            navigate("/")

          }}
        >
          <FontAwesomeIcon icon={faSearch} className={darkk ? 'text-white' : 'text-black'} />
        </button>
      </div>

      {/* Right Section: User Icons */}
      <div className="flex items-center gap-6">




{/* 
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"  className='   pointer-events-none fill-inherit w-full h-full  '><path clip-rule="evenodd" d="m7.61 15.719.392-.22v-2.24l-.534-.228-.942-.404c-.869-.372-1.4-1.15-1.446-1.974-.047-.823.39-1.642 1.203-2.097h.001L15.13 3.59c1.231-.689 2.785-.27 3.466.833.652 1.058.313 2.452-.879 3.118l-1.327.743-.388.217v2.243l.53.227.942.404c.869.372 1.4 1.15 1.446 1.974.047.823-.39 1.642-1.203 2.097l-.002.001-8.845 4.964-.001.001c-1.231.688-2.784.269-3.465-.834-.652-1.058-.313-2.451.879-3.118l1.327-.742Zm1.993 6.002c-1.905 1.066-4.356.46-5.475-1.355-1.057-1.713-.548-3.89 1.117-5.025a4.14 4.14 0 01.305-.189l1.327-.742-.942-.404a4.055 4.055 0 01-.709-.391c-.963-.666-1.578-1.718-1.644-2.877-.08-1.422.679-2.77 1.968-3.49l8.847-4.966c1.905-1.066 4.356-.46 5.475 1.355 1.057 1.713.548 3.89-1.117 5.025a4.074 4.074 0 01-.305.19l-1.327.742.942.403c.253.109.49.24.709.392.963.666 1.578 1.717 1.644 2.876.08 1.423-.679 2.77-1.968 3.491l-8.847 4.965ZM10 14.567a.25.25 0 00.374.217l4.45-2.567a.25.25 0 000-.433l-4.45-2.567a.25.25 0 00-.374.216v5.134Z" fill-rule="evenodd"></path></svg>


      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"  className=' text-white ' ><path clip-rule="evenodd" d="M12 20.5c1.894 0 3.643-.62 5.055-1.666a5.5 5.5 0 00-10.064-.105.755.755 0 01-.054.099A8.462 8.462 0 0012 20.5Zm4.079-5.189a7 7 0 012.142 2.48 8.5 8.5 0 10-12.443 0 7 7 0 0110.3-2.48ZM12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm2-12.5a2 2 0 11-4 0 2 2 0 014 0Zm1.5 0a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0Z" fill-rule="evenodd"></path></svg>


<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="85" viewBox="0 0 24 24" width="85" focusable="false" aria-hidden="true" className="  text-lg     hover:scale-150 text-red-900     "><path clip-rule="evenodd" d="M4 4.5A1.5 1.5 0 015.5 3h13A1.5 1.5 0 0120 4.5H4Zm16.5 3h-17v11h17v-11ZM3.5 6A1.5 1.5 0 002 7.5v11A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0020.5 6h-17Zm7.257 4.454a.5.5 0 00-.757.43v4.233a.5.5 0 00.757.429L15 13l-4.243-2.546Z" fill-rule="evenodd"></path></svg>

<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="50" viewBox="0 0 24 24" width="50" focusable="false" aria-hidden="true"   ><path clip-rule="evenodd" d="M14.203 4.83c-1.74-.534-3.614-.418-5.274.327-1.354.608-2.49 1.6-3.273 2.843H8.25c.414 0 .75.336.75.75s-.336.75-.75.75H3V4.25c0-.414.336-.75.75-.75s.75.336.75.75v2.775c.935-1.41 2.254-2.536 3.815-3.236 1.992-.894 4.241-1.033 6.328-.392 2.088.641 3.87 2.02 5.017 3.878 1.146 1.858 1.578 4.07 1.215 6.223-.364 2.153-1.498 4.1-3.19 5.48-1.693 1.379-3.83 2.095-6.012 2.016-2.182-.08-4.26-.949-5.849-2.447-1.588-1.499-2.578-3.523-2.784-5.697-.039-.412.264-.778.676-.817.412-.04.778.263.818.675.171 1.812.996 3.499 2.32 4.748 1.323 1.248 3.055 1.973 4.874 2.04 1.818.065 3.598-.532 5.01-1.681 1.41-1.15 2.355-2.773 2.657-4.567.303-1.794-.056-3.637-1.012-5.186-.955-1.548-2.44-2.697-4.18-3.231ZM12.75 7.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75v4.886l.314.224 3.5 2.5c.337.241.806.163 1.046-.174.241-.337.163-.806-.174-1.046l-3.186-2.276V7.5Z" fill-rule="evenodd"></path></svg>

<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" ><path clip-rule="evenodd" d="M20.5 12c0 4.694-3.806 8.5-8.5 8.5S3.5 16.694 3.5 12 7.306 3.5 12 3.5s8.5 3.806 8.5 8.5Zm1.5 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-9.25-5c0-.414-.336-.75-.75-.75s-.75.336-.75.75v5.375l.3.225 4 3c.331.248.802.181 1.05-.15.248-.331.181-.801-.15-1.05l-3.7-2.775V7Z" fill-rule="evenodd"></path></svg>

<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"  className='  ' ><path clip-rule="evenodd" d="M3.75 5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75S20.664 5 20.25 5H3.75Zm0 4c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75S20.664 9 20.25 9H3.75Zm0 4c-.414 0-.75.336-.75.75s.336.75.75.75h8.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-8.5Zm8.5 4c.414 0 .75.336.75.75s-.336.75-.75.75h-8.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h8.5Zm3.498-3.572c-.333-.191-.748.05-.748.434v6.276c0 .384.415.625.748.434L22 17l-6.252-3.572Z" fill-rule="evenodd"></path></svg>

<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="50" viewBox="0 0 24 24" width="50" focusable="false" aria-hidden="true"  className='   text-white '  ><path clip-rule="evenodd" d="M14.813 5.018 14.41 6.5 14 8h5.192c.826 0 1.609.376 2.125 1.022.711.888.794 2.125.209 3.101L21 13l.165.413c.519 1.296.324 2.769-.514 3.885l-.151.202v.5c0 1.657-1.343 3-3 3H5c-1.105 0-2-.895-2-2v-8c0-1.105.895-2 2-2h2v.282c0-.834.26-1.647.745-2.325L12 1l1.1.472c1.376.59 2.107 2.103 1.713 3.546ZM7 10.5H5c-.276 0-.5.224-.5.5v8c0 .276.224.5.5.5h2v-9Zm10.5 9h-9V9.282c0-.521.163-1.03.466-1.453l3.553-4.975c.682.298 1.043 1.051.847 1.77l-.813 2.981c-.123.451-.029.934.255 1.305.284.372.725.59 1.192.59h5.192c.37 0 .722.169.954.459.32.399.357.954.094 1.393l-.526.876c-.241.402-.28.894-.107 1.33l.165.412c.324.81.203 1.73-.32 2.428l-.152.202c-.195.26-.3.575-.3.9v.5c0 .828-.672 1.5-1.5 1.5Z" fill-rule="  "  fill='' ></path></svg>
<div className="thumb-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="   "
        height="145"
        viewBox="0 0 24 24"
        width="150"
        focusable="false"
        aria-hidden="true"
        className="icon"
      >
        <path
          clipRule="evenodd"
          d="M14.813 5.018 14.41 6.5 14 8h5.192c.826 0 1.609.376 2.125 1.022.711.888.794 2.125.209 3.101L21 13l.165.413c.519 1.296.324 2.769-.514 3.885l-.151.202v.5c0 1.657-1.343 3-3 3H5c-1.105 0-2-.895-2-2v-8c0-1.105.895-2 2-2h2v.282c0-.834.26-1.647.745-2.325L12 1l1.1.472c1.376.59 2.107 2.103 1.713 3.546ZM7 10.5H5c-.276 0-.5.224-.5.5v8c0 .276.224.5.5.5h2v-9Zm10.5 9h-9V9.282c0-.521.163-1.03.466-1.453l3.553-4.975c.682.298 1.043 1.051.847 1.77l-.813 2.981c-.123.451-.029.934.255 1.305.284.372.725.59 1.192.59h5.192c.37 0 .722.169.954.459.32.399.357.954.094 1.393l-.526.876c-.241.402-.28.894-.107 1.33l.165.412c-.324.81-.203 1.73-.32 2.428l-.152.202c-.195.26-.3.575-.3.9v.5c0 .828-.672 1.5-1.5 1.5Z"
          fillRule="evenodd"
        ></path>
      </svg>
    </div> */}
    <button className="p-2 rounded-full hover:bg-[#212121] transition-all duration-300">
          <FontAwesomeIcon icon={faHome} className={darkk ? 'text-white' : 'text-black'} />
        </button>
        <button className="p-2 rounded-full hover:bg-[#212121] transition-all duration-300">
          <FontAwesomeIcon icon={faVideo} className={darkk ? 'text-white' : 'text-black'} />
        </button>
        <button className="p-2 rounded-full hover:bg-[#212121] transition-all duration-300">
          <FontAwesomeIcon icon={faThumbsUp} className={darkk ? 'text-white' : 'text-black'} />
        </button>
        <button className="ml-4 p-2 rounded-full hover:bg-[#212121] transition-all duration-300">
          <FontAwesomeIcon icon={faBell} className={darkk ? 'text-white' : 'text-black'} />
        </button>
        <button className="ml-9 p-2 rounded-full hover:bg-[#212121] transition-all duration-300">
          <FontAwesomeIcon icon={faUser} className={darkk ? 'text-white' : 'text-black'} />
        </button>
      </div>
    </div>
  );
};

export default Header;
