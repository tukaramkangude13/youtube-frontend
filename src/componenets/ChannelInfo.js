import React from "react";

const ChannelInfo = ({ full, profile, darkMode, setShowMore }) => {
  const convertToString = (views) => {
    if (views >= 1_000_000) return Math.floor(views / 1_000_000) + "M";
    if (views >= 1_000) return Math.floor(views / 1_000) + "K";
    return views + "";
  };

  return (
    <div
      className={`flex items-start space-x-6 p-6 ${
        darkMode ? "bg-black text-white" : "bg-white text-gray-800"
      } rounded-lg shadow ml-16`}
    >
      {/* Channel Thumbnail */}
      <img
        src={full?.items[0]?.snippet?.thumbnails?.default?.url}
        className="w-28 h-28 rounded-full object-cover shadow-md"
        alt="Channel Thumbnail"
      />

      {/* Channel Details */}
      <div className="flex flex-col space-y-2 w-full">
        {/* Channel Title */}
        <p className="text-2xl font-bold truncate">
          {profile?.items[0]?.brandingSettings?.channel?.title}
        </p>

        {/* Channel Stats */}
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <p>{full?.items[0]?.snippet?.customUrl}</p>
          <p>
            {convertToString(full?.items[0]?.statistics?.subscriberCount)}{" "}
            subscribers
          </p>
          <p>{convertToString(full?.items[0]?.statistics?.videoCount)} videos</p>
        </div>

        {/* Channel Description */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <p className="truncate w-64">{full?.items[0]?.snippet?.description}</p>
          <button
            className="hover:underline"
            onClick={() => setShowMore(true)}
          >
            Show More
          </button>
        </div>

        {/* Subscribe Button */}
        <div className="flex space-x-3 mt-4">
          <button
            className="px-6 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-700"
            onClick={() => alert("Subscribed!")}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;
