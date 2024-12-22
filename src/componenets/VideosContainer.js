import React, { useEffect, useState } from 'react';
import { YOTUBE_VIDEO_THUMBNAIL, YOUR_API_KEY } from './utils/constant'; 
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow, parseISO } from 'date-fns'; 
import { useNavigate } from 'react-router-dom';
import { changechannelid, togglewatch, tooglemenu } from './utils/appSlice';

const VideosContainer = () => {
  const darkk = useSelector((state) => state.dark.isdark);
  const showBar = useSelector((state) => state.app.ismenuopen);
  const [videos, setVideos] = useState(null); 
const navigate=useNavigate(null);
const dispatch=useDispatch(null);
const set=useDispatch(null);
  const getsearch=useSelector((state)=>state.searchResult.datase);
  useEffect(() => {
    if (getsearch) {
      setVideos(getsearch);  // Update state when getsearch changes
    }
  }, [getsearch]); 

  const [channelData, setChannelData] = useState({}); 
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchChannelData = async (channelId,chan) => {
   

try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${channelId}&key=${YOUR_API_KEY} `
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const channel = data.items[0];
        setChannelData((prevState) => ({
          ...prevState,
          [chan]: channel,
        }));

      }
    } catch (error) {
      console.log('Error fetching channel data:', error);
    }
  };

  const formatViews = (views) => {
    if (views >= 1_000_000) {
      return Math.floor(views / 1_000_000) + 'M views'; 
    } else if (views >= 1_000) {
      return Math.floor(views / 1_000) + 'K views';   
    } else {
      return views + ' views';  
    }
  };
  const watch=useDispatch(null);
  const goto=(id)=>{
    navigate(`/watch/${id}`)
set(tooglemenu(false));
watch(togglewatch(true));
  }
  const fetchVideos = async () => {
    try {
      const result = await fetch(        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=UCiifkYAs_bq1pt_zbNAzYGg&key=${YOUR_API_KEY} `
);
      const data = await result.json();
      setVideos(data.items);
      console.log(videos);

      data.items.forEach((video) => {
        fetchChannelData(video.id.videoId);
      });
    } catch (error) {
      console.log('Failed to fetch videos:', error);
    }
  };useEffect(() => {
    if (getsearch) {
      getsearch?.items?.forEach((video) => {
        fetchChannelData(video.id.videoId,video.snippet.channelId); // Fetch channel data for each new video
      });
    }
  }, [getsearch]);

  return (
    <div
      className={`flex flex-wrap gap-4    p-4 w-full ${
        darkk ? 'bg-[#212121] text-white' : 'bg-white text-black'
      }`}
    >
      {videos?.items?.map((video, index) => (
        <div
          key={index}
          className={`${
            showBar ? 'w-[395px]' : 'w-[335px]'
          } h-[325px] shadow-md rounded-lg overflow-hidden flex flex-col cursor-pointer transition-transform group`}
        >
          <div 
          onClick={ ()=>goto(video.id.videoId)  }
          className="relative w-full h-[140px]">
               
            <img
              alt= 'Video Thumbnail'
              src={video?.snippet?.thumbnails?.high?.url}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity"></div>
          </div>

          <div className="p-2">
            {channelData[video?.snippet?.channelId] && (
              <div className="flex items-center mt-2">
                <img
onClick={() => {
  dispatch(changechannelid(video.snippet.channelId));
  
  // Check if changechannelid is true, then navigate
  if (video.snippet.channelId) {
    navigate(`/userprofile/${video.snippet.channelId}`);
  }
}}

                  src={channelData[video?.snippet?.channelId]?.snippet?.thumbnails?.high?.url}
                  alt="Channel Icon"
                  className="w-8 h-8  mr-3 rounded-full"
                />
                 <div className="overflow-hidden">
            <p className="line-clamp-2 text-sm font-semibold  font-serif text-[#F1F1F1]">
              {video?.snippet?.title || 'Untitled Video'}
            </p>
            <p>{channelData[video?.snippet?.channelId]?.statistics?.viewCount}</p>
          </div>
              </div>
            )}
            <div className="  ml-11  mt-1     text-sm font-semibold text-[#aaa]">
              {video?.snippet?.channelTitle || 'Unknown Channel'}
            </div>
          <div> 
          <p className="text-xs text-gray-500">
              {video?.snippet?.publishedAt && (
                <span>
                  {formatDistanceToNow(parseISO(video.snippet.publishedAt), {
                    addSuffix: true,
                  })
                  .replace(/^about /, '') 
                  .replace(/^in /, '')}
                </span>
              )} -    {formatViews(  channelData[video.snippet.channelId]?.statistics?.viewCount  )}
            </p>
                  

          </div>
          </div>

         
        </div>
      ))}
    </div>
  );
};

export default VideosContainer;
