import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelDetails } from "./getChannelDetails";
import YouTubePlayer from "./YouTubePlayer";
import { changechannelid } from "./utils/appSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnchor,
  faArrowTrendUp,
  faBell,
  faDownLong,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import DescriptionBox from "./DescriptionBox";
import UserComment from "./UserComment";
import { useNavigate, useParams } from "react-router-dom";
import { fetchVideoDetails } from "./fetchVideoDetails";
import WatchLaterPlaylist from "./WatchLaterPlaylist";
import { likevideoadd } from "./utils/userProfileSlice";
import SideVideo from "./SideVideo";
import VideosContainer from "./VideosContainer";

const MainVideo = () => {
  const [bell, setBell] = useState(false);
  const dark = useSelector((state) => state.dark.isdark);
  const isPlaylistPlay = useSelector((state) => state.app.playlist);
  const dis = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videoDetails, setVideoDetails] = useState(null);
  const [bellicon, setbellicon] = useState(false);
  const sidebar = useSelector((state) => state.app.ismenuopen);

  const tk = videoDetails?.snippet?.channelId; // Extract channel ID from video details
  const dispatch = useDispatch();
  // Fetch video details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchVideoDetails(id);
        setVideoDetails(details);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };
    fetchDetails();
  }, [id]);

  // Fetch channel details when `tk` (channel ID) is available
  useEffect(() => {
    const fetchChannelInfo = async () => {
      try {
        if (tk) {
          const details = await getChannelDetails(tk);
          setChannelDetail(details);
        }
      } catch (error) {
        console.error("Error fetching channel details:", error);
      }
    };
    fetchChannelInfo();
  }, [tk]);
  const parse = (views) => {
    if (views > 1000000) return Math.floor(views / 100000) + " M";
    if (views > 100000) return Math.floor(views / 100000) + " lakh";
  };
  if (!id) return;
  if (!videoDetails || !channelDetail) {
    return (
      <div className="  text-black items-center   mt-52  bg-white text-lg ">
        Loading...
      </div>
    );
  }
  console.log(videoDetails);
  console.log(channelDetail);
  return (


    <div className="flex relative bg-black w-full h-full     ml-9   " >
      <div className={`w-[80%] ${dark ? "bg-[#070101]" : "bg-white"}  justify-start     border border-red-900 ml-20 flex flex-col p-4`}>
        <div className="mb-4 flex flex-col">   
          <div className="video-container">
            <YouTubePlayer videoId={id} />
          </div>
          <p className={`text-xl font-bold ${dark ? "text-white" : "text-black"}`}>
            {videoDetails?.snippet?.localized?.title}
          </p>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-full flex flex-col space-y-4 mb-4">
            {/* Channel Details */}
            <div className="flex items-center space-x-4">
              <img
                src={
                  channelDetail?.items[0]?.snippet?.thumbnails?.standard?.url ||
                  channelDetail?.items[0]?.snippet?.thumbnails?.high?.url ||
                  channelDetail?.items[0]?.snippet?.thumbnails?.medium?.url
                }
                onClick={() => {
                  navigate(`/userprofile/${tk}`);
                  dis(changechannelid(tk));
                }}
                className="rounded-full h-16 w-16 cursor-pointer"
                alt="channel thumbnail"
              />
              <div className="flex flex-col">
                <span className={`text-lg font-semibold ${dark ? "text-white" : "text-black"}`}>
                  {channelDetail?.items[0]?.snippet?.title || "Channel Name"}
                </span>
                <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
                  {parse(channelDetail?.items[0]?.statistics?.subscriberCount || 0)} subscribers
                </span>
              </div>
              {/* Subscribe Button */}
              <button
                className={`ml-auto px-4 py-2 rounded-lg transition-all ${bell ? "bg-black text-white" : "bg-white text-black hover:bg-gray-200"
                  }`}
                onClick={() => setBell(!bell)}
              >
                <div className="flex items-center space-x-2">
                  {bell && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="21"
                      viewBox="0 0 24 24"
                      width="30"
                      className="text-white"
                    >
                      <path d="M21.5 9h-2v-.19c0-1.91-1.11-3.62-2.9-4.48l.87-1.8c2.49 1.19 4.03 3.6 4.03 6.28V9zm-17-.19c0-1.91 1.11-3.62 2.9-4.48l-.87-1.8C4.04 3.72 2.5 6.13 2.5 8.81V9h2v-.19zM12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm8-4.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87z"></path>
                    </svg>
                  )}
                  <span>{bell ? "Subscribed" : "Subscribe"}</span>
                </div>
              </button>
            </div>

            {/* Bell Icon Dropdown */}
            {bell && (
              <div className={`absolute mt-2 w-48 bg-white shadow-lg rounded-lg p-4 transition-transform ${bellicon ? "scale-100" : "scale-0"}`}>
                <ul className="space-y-2">
                  <li className="cursor-pointer hover:text-blue-500">Personalized</li>
                  <li className="cursor-pointer hover:text-blue-500">All Notifications</li>
                  <li className="cursor-pointer hover:text-blue-500">None</li>
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-6">
              <button
                className="flex items-center space-x-2 text-gray-600 hover:text-black"
                onClick={() => dispatch(likevideoadd(videoDetails))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  className="fill-current"
                >
                  <path d="M8 21V9.282c0-.834.26-1.647.745-2.325L13 1l.551.331c1.153.691 1.705 2.065 1.351 3.362L14 8h5.192c.827 0 1.609.376 2.125 1.022.711.888.795 2.125.209 3.101L21 13l.165.413c.519 1.296.324 2.769-.514 3.885l-.151.202v.5c0 1.657-1.343 3-3 3H8ZM4.5 9C3.672 9 3 9.672 3 10.5v9c0 .828.672 1.5 1.5 1.5H7V9H4.5Z"></path>
                </svg>
                <span>Like</span>
              </button>

              <button className="flex items-center space-x-2 text-gray-600 hover:text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  className="fill-current"
                >
                  <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>
                </svg>
                <span>Share</span>
              </button>

              <button className="flex items-center space-x-2 text-gray-600 hover:text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  className="fill-current"
                >
                  <path d="M13.72 11.93C15.58 11.59 17 9.96 17 8c0-2.21-1.79-4-4-4S9 5.79 9 8c0 1.96 1.42 3.59 3.28 3.93C6.77 12.21 4 15.76 4 20h18c0-4.24-2.77-7.79-8.28-8.07zM10 8c0-1.65 1.35-3 3-3s3 1.35 3 3-1.35 3-3 3-3-1.35-3-3zm3 4.9c5.33 0 7.56 2.99 7.94 6.1H5.06c.38-3.11 2.61-6.1 7.94-6.1zM7 12H2v-1h5v1z"></path>
                </svg>
                <span>More</span>
              </button>
            </div>
          </div>
        </div>

        <div className="  flex flex-col  ">
          <DescriptionBox channelDetail={channelDetail} data={videoDetails} />
          <UserComment videoid={videoDetails?.id} />
        </div>




      </div>

      <div className={`   ${isPlaylistPlay ? 'mt-[550px]' : ''}  bg-black   `}>    <VideosContainer />   </div>

    </div>

  );
};

export default MainVideo;
