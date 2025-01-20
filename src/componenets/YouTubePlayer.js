import React from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoId }) => {
  // Player options
  const opts = {
    height: '690', // Player height
    width: '800',  // Player width
    playerVars: {
      autoplay: 1, // Autoplay the video
      controls: 1, // Show controls
      modestbranding: 1, // Remove YouTube logo
      rel: 0, // Disable related videos
      disablekb: 1, // Disable keyboard shortcuts
      showinfo: 0, // Hide video info
      iv_load_policy: 3, // Disable annotations
    },
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YouTubePlayer;
