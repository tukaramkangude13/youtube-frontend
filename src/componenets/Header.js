import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faMicrophone, faMoon, faSearch, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode, toggledark, togglesearch } from './utils/darkmodeSlice';
import { setsearchResult } from './utils/searchResultSlice';
import { YOUR_API_KEY } from './utils/constant';
import { tooglemenu } from './utils/appSlice';
const Header = () => {
  const[ suggestion, setsuggestion]=useState(null);
  const dispatch = useDispatch();
  const set=useSelector((state)=>state.dark.issearch)
  const darkk = useSelector((state) => state.dark.isdark); // Accessing dark mode state
  const searchRef = useRef(null); // Search input reference
const convrtdata=useDispatch(null);
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    dispatch(setDarkMode(storedDarkMode)); 
  }, []);
 const search=async()=>{
  const query = searchRef.current?.value; // Get input value
if(query){
  const  call =await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`)
  const data=await call.json();
  const final=data[1];
  setsuggestion(final);
}
 }




  const handleToggle = () => {
    dispatch(toggledark(!darkk));
    localStorage.setItem('darkMode', !darkk); 
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      search();
    }, 200); // Delay of 200ms
  
    // Cleanup the timeout when the component unmounts or dependencies change
    return () => clearTimeout(timer);
  }, []); 







const[data,setdata]=useState(null);

  const getsearch=useSelector((state)=>state.searchResult.datase);
const makeapicall=async(value1)=>{
const value2=value1.current.value;
  if(value2){
    const get=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${value2}&type=video&maxResults=10&key=${YOUR_API_KEY}`    )
    const make=await get.json();
    convrtdata(setsearchResult(make))
    setdata(make);
  } 
}


const sidebarref=useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (sidebarref.current && !sidebarref.current.contains(event.target)) {
            dispatch(togglesearch(false)); // Close sidebar when clicking outside
        }  if (sidebarref.current && sidebarref.current.contains(event.target)) {
          dispatch(togglesearch(true)); // Close sidebar when clicking outside
      }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch]);



const watching=useSelector((state)=>state.app.watch)
const toggle=useDispatch(null);
const bore=useSelector((state)=>state.app.ismenuopen)

const hardwork=()=>{
(bore ? toggle(tooglemenu(false)): toggle(tooglemenu(true)))
}
  return (
    <div
        ref={sidebarref}


      className={`flex   fixed justify-between    mb-96  z-10  items-center p-4 shadow-md w-full ${darkk ? 'bg-[#0f0f0f] text-white' : 'bg-white text-black'}`}


    >

      <div


      className="flex items-center gap-5">
      

        <div className="relative">
{   watching &&         <FontAwesomeIcon onClick={()=>hardwork}   icon={faBars} className={darkk ? 'text-white' : 'text-black'} />

}          <button 
            onClick={handleToggle} 
            className={`w-16 h-8 rounded-full flex items-center p-1 transition-all duration-300 ${darkk ? 'bg-white' : 'bg-black'}`}
          >
            {/* The "circle" inside the button */}
            <div 
              className={`w-6 h-6 rounded-full bg-white transition-all duration-300 ${darkk ? 'transform translate-x-8' : 'transform translate-x-0'}`}
            >
              <FontAwesomeIcon 
                icon={darkk ? faMoon : faSun} 
                className="text-black m-auto" 
              />
            </div>
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="24"
            className="mt-1"
            viewBox="0 0 93 20"
            role="img"
            aria-label="YouTube logo"
          >
            <g>
              <path
                d="M14.48 20c0 0 9.08 0 11.34-.6 1.27-.34 2.23-1.3 2.56-2.52.62-2.22.62-7.08.62-7.08s0-4.76-.62-7c-.34-1.24-1.28-2.18-2.56-2.52-2.26-.6-11.34-.6-11.34-.6s-9.08 0-11.34.6c-1.25.33-2.22 1.28-2.56 2.52C.6 4.76.6 9.56.6 9.56s0 4.86.62 7.08c.33 1.23 1.3 2.18 2.56 2.52 2.26.6 11.34.6 11.34.6z"
                fill="#FF0000"
              ></path>
              <path d="M19 10L11.5 5.75v8.5L19 10z" fill="#FFF"></path>
            </g>
          </svg>
          <button className="text-2xl font-semibold ml-2">YouTube</button>
        </div>
      </div>

      <div className="relative flex items-center">
  <input
    type="text"
    onChange={search}
    ref={searchRef}

    placeholder="Search"
    className={`w-96 h-10 border border-[#212121] rounded-l-full px-4 outline-none focus:ring-2 ${
      darkk ? 'bg-black text-white' : 'bg-white text-black'
    } focus:ring-[#ff4081]`}
  />
  {suggestion &&             (
    <div className="absolute mt-[550px] w-96  bg-white shadow-lg rounded-lg z-50 text-black">
      {  set &&  suggestion.map((item, index) => (
        <div
          key={index}
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            searchRef.current.value = item; 
            setsuggestion(null);
          }}
        >


           <div > 
           <FontAwesomeIcon icon={faSearch} />   {item}  </div>
        </div>
      ))}
    </div>
  )}
  <button className="h-10 w-14 border border-[#212121] rounded-r-full flex items-center justify-center hover:bg-[#212121] transition-all duration-300">
    <FontAwesomeIcon  onClick={()=>makeapicall(searchRef)}   icon={faSearch} className={darkk ? 'text-white' : 'text-black'} />
  </button>
  <button className="ml-4 p-2 rounded-full hover:bg-[#212121] transition-all duration-300">
    <FontAwesomeIcon icon={faMicrophone} className={darkk ? 'text-white' : 'text-black'} />
  </button>
</div>


      {/* Third Section: User Icon */}
      <div className="flex items-center gap-6">
        <button className="p-2 rounded-full hover:bg-[#212121] transition-all duration-300">
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
