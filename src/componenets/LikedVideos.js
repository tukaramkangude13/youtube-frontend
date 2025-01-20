import React from 'react';
import { useSelector } from 'react-redux';
import { timeAgo } from './utils/useDateConvert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEllipsisVertical, faPlay, faShuffle } from '@fortawesome/free-solid-svg-icons';

const LikedVideos = () => {
  const parse = (views) => {
    if (views > 1_000_000) return (views / 1_000_000).toFixed(1) + ' M';
    if (views > 1_000_00) return (views / 1_000_00).toFixed(1) + ' lakh';
    if (views > 1_000) return (views / 1_000).toFixed(1) + ' k';
    return views;
  };

  const data = useSelector((state) => state.userprofile.likevideo);

  return (
    <div className="w-[95%]  h-screen    px-10 mx-auto  p-10 flex  mt-12 bg-opacity-85 bg-black">
      {/* First Section: Highlighted Video */}
      <div
        className="  fixed   w-[30%]    h-80 flex items-center"
        style={{
          backgroundImage: `url(${data[0]?.snippet?.thumbnails?.high?.url || 
            data[0]?.snippet?.thumbnails?.maxres?.url || 
            data[0]?.snippet?.thumbnails?.standard?.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0     bg-gradient-to-b from-black/30 to-black/60"></div>
        <div className="relative z-10 flex    flex-col text-white p-6">
          <p className="text-2xl font-bold">@tukaram</p>
          <div className="text-slate-400 text-sm flex space-x-4 mt-2">
            <p>{data.length} videos</p>
            <p>No views</p>
            <p>Updated today</p>
          </div>
          <div className="flex space-x-4    mt-4">
            <button className="flex items-center px-4 py-2 bg-white text-black rounded-lg">
              <FontAwesomeIcon icon={faPlay} className="mr-2" />
              Play all
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg">
              <FontAwesomeIcon icon={faShuffle} className="mr-2" />
              Shuffle
            </button>
          </div>
        </div>
      </div>

      {/* Second Section: List of Videos */}
      <div className="w-full  ml-[550px]  flex flex-col space-y-4 mt-6">
        {data.map((card, index) => (
          <div key={index} className="flex items-center space-x-4">
            <p className="text-white">{index + 1}</p>
            <img
              src={card?.snippet?.thumbnails?.high?.url || 
                card?.snippet?.thumbnails?.maxres?.url || 
                card?.snippet?.thumbnails?.standard?.url}
              alt=""
              className="w-24 h-16 rounded-lg"
            />
            <div className="flex flex-col text-white">
              <p className="font-medium text-lg">{card?.snippet?.title}</p>
              <div className="text-slate-400 text-sm flex space-x-2">
                <p>{card?.snippet?.channelTitle}</p>
                <p>{parse(card?.statistics?.viewCount)} views</p>
                <p>{timeAgo(card?.snippet?.publishedAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedVideos;
