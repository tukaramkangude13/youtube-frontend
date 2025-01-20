import React, { useEffect, useState } from "react";
import { MAIN_VIDEO, POPULAR_VIDEO, YOTUBE_VIDEO_THUMBNAIL, YOUR_API_KEY } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { changechannelid, playlistplay, togglewatch, tooglemenu } from "./utils/appSlice";
import Shimmer from "./shimmer";
import { faL } from "@fortawesome/free-solid-svg-icons";

const VideosContainer = () => {
  const darkk = useSelector((state) => state.dark.isdark);
  const showBar = useSelector((state) => state.app.ismenuopen);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const[show,setshow]=useState(true);
  const dispatch = useDispatch();
  const set = useDispatch();
  const getsearch = useSelector((state) => state.searchResult.datase);
  useEffect(() => {
    if (getsearch) {

      setVideos(getsearch); 
      console.log(getsearch);
    }
  }, [getsearch]);

  const [channelData, setChannelData] = useState({});
  useEffect(() => {
    fetchVideos();
    window.addEventListener("scroll", handleScroll);
return()=>window.removeEventListener("scroll",handleScroll);
  }, []);

  const fetchChannelData = async (channelId, chan) => {
    try {
      console.log(channelId);
      console.log(chan)
      const response = await fetch(
        `${MAIN_VIDEO}${chan}&key=${YOUR_API_KEY} `
      );
      const data = await response.json();
      console.log("dtaa",data);
      if (data.items && data.items.length > 0) {
        const channel = data.items[0];
        setChannelData((prevState) => ({
          ...prevState,
          [channelId]: channel,
        }));
        console.log(channelData);
      }
    } catch (error) {
      console.log("Error fetching channel data:", error);
    }
  };

  const formatViews = (views) => {
    if (views >= 1_000_000) {
      return Math.floor(views / 1_000_000) + "M views";
    } else if (views >= 1_000) {
      return Math.floor(views / 1_000) + "K views";
    } else {
      return views + " views";
    }
  };
  const handleScroll = () => {
    const scrollTop = window.scrollY; // Current scroll position from the top
    const scrollHeight = document.documentElement.scrollHeight; // Total height of the document
    const clientHeight = document.documentElement.clientHeight; // Visible height of the viewport
  
    if (scrollTop + window.innerHeight >= document.body.scrollHeight) {

      fetchVideos();
      console.log("You've reached the bottom!");
    }
  };
  
  // Attach the event listener
  
  const watch = useDispatch();
  const goto = (id) => {
    navigate(`/watch/${id}`);
    set(tooglemenu(false));
    watch(togglewatch(true));
  };

  const fetchVideos = async () => {
    try {
      const result = await fetch(
       `${POPULAR_VIDEO}${YOUR_API_KEY}&relevanceLanguage=hi
      `);
      const data = await result.json();
      console.log(data," data from video contanier")
      setVideos((prevData) => ({
        ...prevData,
        items: [...(prevData?.items || []), ...data.items],
      }));
      
      setVideos(data);
      console.log(data);

      data.items.forEach((video) => {
        fetchChannelData(video.snippet.channelId,video.id);
      });
      setshow(false);
    } catch (error) {
      console.log("Failed to fetch videos:", error);
    }
  };

  useEffect(() => {
    if (getsearch) {
      getsearch?.items?.forEach((video) => {
        fetchChannelData(video.id.videoId, video.snippet.channelId); // Fetch channel data for each new video
      });
    }
  }, [getsearch]);


    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 68);
  
    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 768); 
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  if(show) return(  <div   className=" bg-black h-full  w-full     text-center -mt-14  text-white text-3xl       ">    <Shimmer/>         helooo        { console.log(" shimmer compinent is called") }   </div>
)
  
  



return (
  <div
  onClick={()=>dispatch(playlistplay(false))}
    className={`grid gap-4    ml-11 mt-10 p-4 w-full ${
      darkk ? "bg-[#212121] text-white" : "bg-white text-black"
    }`}
    style={{
      gridTemplateColumns: `repeat(auto-fit, minmax(${showBar ? "200px" : "240px"}, 1fr))`,
    }}
  >
    {videos?.items?.map((video, index) => (
      <div
        key={index}
        className="h-[325px] shadow-md rounded-lg overflow-hidden flex flex-col cursor-pointer transition-transform group sm:h-[275px] md:h-[300px] lg:h-[325px]"
      >
        <div
          onClick={() => goto(video.id.videoId || video.id)}
          className="relative w-full h-[140px] sm:h-[120px] md:h-[140px]"
        >
          <img
            alt="Video Thumbnail"
            src={video?.snippet?.thumbnails?.high?.url || "default.jpg"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity"></div>
        </div>
        <div className="p-2">
          {channelData[video?.snippet?.channelId] && (
            <div className="flex items-center mt-2">
              <img
                onClick={() => {
                  dispatch(playlistplay(false));
                  dispatch(changechannelid(video.snippet.channelId));
                  if (video.snippet.channelId) {
                    navigate(`/userprofile/${video.snippet.channelId}`);
                  }
                }}
                src={
                  channelData[video?.snippet?.channelId]?.snippet?.thumbnails?.high?.url
                }
                alt="Channel Icon"
                className="w-8 h-8 mr-3 rounded-full"
              />
              <div className="overflow-hidden">
                <p className={`line-clamp-2   text-sm font-semibold font-serif  ${darkk ? 'text-[#F1F1F1]' : 'text-black' } `}>
                  {video?.snippet?.title || "Untitled Video"}
                </p>
                <p>
                  {channelData[video.snippet.channelId]?.statistics?.viewCount}
                </p>
              </div>
            </div>
          )}
          <div className="ml-11 mt-1 text-sm font-semibold text-[#aaa]">
            {video?.snippet?.channelTitle || "Unknown Channel"}
          </div>
          <div>
            <p className="text-xs text-gray-500">
              {video?.snippet?.publishedAt && (
                <span>
                  {formatDistanceToNow(parseISO(video.snippet.publishedAt), {
                    addSuffix: true,
                  })
                    .replace(/^about /, "")
                    .replace(/^in /, "")}
                </span>
              )}{" "}
              -{" "}
              {formatViews(
                channelData[video.snippet.channelId]?.statistics?.viewCount
              )}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

  
  
};

export default VideosContainer;
