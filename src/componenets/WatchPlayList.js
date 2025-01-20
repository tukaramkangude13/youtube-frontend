import React from "react";
import { useParams } from "react-router-dom";
import MainVideo from "./MainVideo";
import PlayListVideos from "./PlayListVideos";
import VideosContainer from "./VideosContainer";

const WatchPlayList = () => {
  const { playlistId } = useParams(); // Assuming the playlist ID is part of the route params.

  return (
    <div className="mx-auto bg-black w-full lg:w-[95%] min-h-screen">
      <div className="flex   border-white border flex-col lg:flex-row mt-10">
        {/* Main Video Section */}
        <div className="w-full     lg:w-2/3 pr-0 lg:pr-5">
          <MainVideo playlistId={playlistId} />
        </div>

        {/* Playlist Videos Section */}
        <div className="w-full lg:w-1/3    absolute z-10 right-10 mb-10   -ml-10  flex flex-col bg-black pl-0 lg:pl-5">
          <PlayListVideos playlistId={playlistId} />
          <div className="  " >
          {/* <VideosContainer/> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPlayList;
