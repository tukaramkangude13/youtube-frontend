import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const GoToDownload = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center text-white bg-black h-screen w-screen">
      <div className="text-center">
        <FontAwesomeIcon icon={faDownload} className="text-gray-500 text-6xl mb-4" />
        <p className="text-lg font-bold mb-2">No videos downloaded</p>
        <p className="text-sm text-gray-400 mb-6">
          Your downloaded videos will appear here.
        </p>
        <button
          // onClick={() => navigate("/home")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Explore Videos
        </button>
      </div>
    </div>
  );
};

export default GoToDownload;
