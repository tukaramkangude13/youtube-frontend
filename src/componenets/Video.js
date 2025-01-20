import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uservideo } from './utils/userProfileSlice';
import { MAIN_VIDEO, SHORT_VIDEO, YOUR_API_KEY } from './utils/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { timeAgo } from './utils/useDateConvert';
import { useNavigate } from 'react-router-dom';

const Video = () => {
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const channelId = useSelector((state) => state.app.chanelid);
const navigate=useNavigate();
    const fetchVideos = async () => {
        if (!channelId) return;
        try {
            const response = await fetch(
                `${SHORT_VIDEO}${channelId}&maxResults=20&order=date&time=120s&type=video&key=${YOUR_API_KEY}`
            );
            const result = await response.json();
            setData(result);
            dispatch(uservideo(result));
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [channelId]);

    if (!data) return null;
console.log(data)
return (
    <div className="bg-black p-6 flex flex-wrap gap-6 justify-center">
      {data.items.map((video, index) => (
        <div
          key={index}
          className="bg-gray-800 text-white w-60 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <img
            onClick={() => navigate(`/watch/${video.id.videoId}`)}
            src={video?.snippet?.thumbnails?.high?.url}
            alt={video?.snippet?.title}
            className="w-full h-36 object-cover cursor-pointer"
          />
          <div className="p-4 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{video?.snippet?.title}</h3>
            </div>
            <p className="text-sm text-gray-400 mt-2">{video?.snippet?.channelTitle}</p>
            <p className="text-sm text-gray-400">{new Date(video?.snippet?.publishedAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Video;
