import React from "react";
import { useSelector } from "react-redux";

const WatchLaterPlaylist = () => {
  const data = useSelector((state) => state.userprofile.watchlaterlist);
  console.log(data);

  return (
    <div className="flex flex-wrap   gap-6 mt-20  w-[90%]  mx-auto   ">
      {data.map((card, index) => (
        <div
          key={index}
          className="bg-white shadow-lg   cursor-pointer  rounded-lg overflow-hidden w-72 hover:scale-105 transition-transform duration-300"
        >
          {/* Thumbnail Image */}
          <img
            alt="Playlist thumbnail"
            src={card?.items[0]?.snippet?.thumbnails?.high?.url}
            className="w-full h-40 object-cover"
          />

          {/* Playlist Details */}
          <div className="p-4 bg-gray-100">
            {/* Total Videos */}
            <p className="text-sm text-gray-700 font-semibold bg-black bg-opacity-60 text-white rounded p-1 inline-block mb-2">
              {card?.pageInfo?.totalResults} videos
            </p>

            {/* Channel Title */}
            <p className="text-md font-medium text-gray-800 truncate">
              {card?.items[0]?.snippet?.channelTitle}
            </p>

            {/* Playlist Title */}
            <p className="text-sm text-gray-600 mt-1 truncate">
              {card?.items[0]?.snippet?.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WatchLaterPlaylist;
