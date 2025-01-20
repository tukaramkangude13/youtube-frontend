import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_PLAYLIST, PLAYLIST_DATA, YOUR_API_KEY } from "./utils/constant";
import { plalistname, userplaylist } from "./utils/userProfileSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";
import { da } from "date-fns/locale";
import Shimmer from "./shimmer";
import { playlistplay } from "./utils/appSlice";

const PlayList = () => {
  const [playlists, setPlaylists] = useState([]);
  const[viewall,setviewall]=useState(false);

  const [videoCounts, setVideoCounts] = useState({});
  const navigate=useNavigate();
  const channelId = useSelector((state) => state.app.chanelid);
  const dispatch = useDispatch();

  const fetchChannelData = async (id) => {
    try {
      const response = await fetch(
        `${PLAYLIST_DATA}${id}&maxResults=20&key=${YOUR_API_KEY}`);
      const data = await response.json();
      return data; // Total video count for the playlist
    } catch (error) {
      console.error(`Error fetching video count for playlist ${id}:`, error);
      return 0;
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(
        `${FETCH_PLAYLIST}${channelId}&maxResults=20&key=${YOUR_API_KEY}`
      );
      const data = await response.json();
      setPlaylists(data.items);
      console.log(playlists)
      dispatch(userplaylist(data.items));

      const counts = {};
      for (const playlist of data.items) {
        const count = await fetchChannelData(playlist.id);
        
        counts[playlist.id] = count;
      }
      setVideoCounts(counts);
    } catch (error) {
    }
  };
const handle=(id,list)=>{
  navigate(`/watch/${id}/${list}`)
  }
  useEffect(() => {
    if (channelId) {
      fetchPlaylists();
    }
  }, [channelId]);

  if (!playlists.length) {
    return <div className="text-white"><Shimmer/></div>;
  }
const vieall=()=>{
  setviewall(!viewall);
}  
console.log(playlists)

return (
    <div className="bg-black min-h-screen   w-[1575px] max-w[1500px] py-6 px-8">
      <div
      
       className="grid grid-cols-1 sm:grid-cols-2  pl-10 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
onClick={()=>{handle(videoCounts[playlist.id]?.items[0]?.snippet?.resourceId?.videoId,playlist.id)
dispatch(plalistname(playlist?.snippet?.localized?.title))

dispatch(playlistplay(true));
}}          
            className="bg-gray-900  border-t-8 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105"
          >
            <img
              src={
                playlist?.snippet?.thumbnails?.maxres?.url ||
                playlist?.snippet?.thumbnails?.high?.url
              } 
              onMouseEnter={()=>vieall}
              onMouseLeave={()=>vieall}
              
              className={`w-full h-32 object-cover  hover:${viewall ? '   shadow-inner shadow-black    bg-white     ' :' '}      opacity-85 rounded-t-lg`}
              alt="Playlist Thumbnail"
            />
            <div className="p-4">
              
              <h3 className=" font-medium text-white line-clamp-2">
                {playlist?.snippet?.title}
              </h3>
              <p className="    text-sm absolute  bg-black bg-opacity-80  w-28     text-white right-0 bottom-20 ">
                 <FontAwesomeIcon icon={faList} />  {videoCounts[playlist.id]?.pageInfo?.  
                  totalResults || "..." }videos
              </p>
              <p> </p>
              <button
               
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-sm    text-white hover:opacity-100 opacity-60        hover:underline"
              >
                View Full Playlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayList;
