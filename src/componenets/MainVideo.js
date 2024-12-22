import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getChannelDetails } from "./getChannelDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faBell, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import DescriptionBox from "./DescriptionBox";
import UserComment from "./UserComment";

const MainVideo = ({ data }) => {
  console.log(data);

  const [bell, setBell] = useState(false);
  const dark = useSelector((state) => state.dark.isdark);
  const id = data?.snippet?.channelId;
  const [channelDetail, setChannelDetail] = useState(null);

  useEffect(() => {
    const getVideoDetails = async () => {
      const details = await getChannelDetails(id);
      setChannelDetail(details);
    };
    if (id) getVideoDetails();
  }, [id]);

  if (!channelDetail) return null;
  console.log(channelDetail, "from ");

  return (
    <div className={`h-full    ${dark ? "bg-gray-900" : "bg-white"} ml-20 flex flex-col p-4`}>
      {/* Video Player Section */}
      <div className="mb-4 flex flex-col">
        <img
          src={data?.snippet?.thumbnails?.high?.url}
          className="w-[850px] h-[550px] rounded-lg shadow-lg"
          alt="video thumbnail"
        />
        <p className={` text-2xl  ${dark ?  ' text-white  ':'' }  `}>{data?.snippet?.localized?.
            title}</p>
      </div>

      {/* Channel and Interaction Section */}
      <div className="flex items-start space-x-4">
        {/* Channel Thumbnail */}
        <img
          src={channelDetail?.items[0]?.snippet?.thumbnails?.medium?.url}
          className="rounded-full h-16 w-16"
          alt="channel thumbnail"
        />

        {/* Channel Info */}
        <div className="flex flex-col space-y-1">
          <p className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-800"}`}>
            {data?.snippet?.channelTitle}
          </p>
          <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
            {parseInt(channelDetail?.items[0]?.statistics?.subscriberCount).toLocaleString()} Subscribers
          </p>
        </div>

        {/* Subscribe Button */}
        <button
          onClick={() => setBell(!bell)}
          className={`ml-auto px-4 py-2 rounded-lg text-white ${
            bell ? "bg-blue-600" : "bg-red-500"
          } hover:bg-opacity-80 transition-all`}
        >
          {bell ? "Subscribed" : "Subscribe"}
          {bell && <FontAwesomeIcon className="ml-2" icon={faBell} />}
        </button>
      </div>

      {/* Interaction Section */}
      <div className="flex items-center mt-4 space-x-4">
        <button className="flex items-center px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700">
          <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
          Like
        </button>
        <button className="flex items-center px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700">
          <FontAwesomeIcon icon={faThumbsDown} className="mr-2" />
          Dislike
        </button>
        <button className="flex items-center px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700">
          <FontAwesomeIcon icon={faArrowTrendUp} className="mr-2" />
          Share
        </button>
        <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold">
          ...
        </button>
      </div>
      <DescriptionBox channelDetail={channelDetail} data={data}  />
      <UserComment videoid={data?.id}   />
    </div>
  );
};

export default MainVideo;
