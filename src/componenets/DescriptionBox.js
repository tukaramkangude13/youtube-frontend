import React, { useState } from "react";
import { useSelector } from "react-redux";

const DescriptionBox = ({ channelDetail, data }) => {
  const [showAll, setShowAll] = useState(false); 
  const isDarkMode = useSelector((state) => state.dark.isdark);

  const paragraphs = data?.snippet?.localized?.description
    ?.split("\n")
    ?.filter((text) => text.trim() !== "") || [];

  return (
    <div
      className={`w-full px-4 py-4 rounded-xl my-3 flex flex-col ${
        isDarkMode ? "bg-[#3c3c3c] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <p className="text-lg font-semibold">Description</p>
        <div className="text-sm text-gray-500">
          <p>{data?.statistics?.viewCount} Views</p>
          <p>{new Date(data?.snippet?.publishedAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div>
        {paragraphs
          .slice(0, showAll ? paragraphs.length : 3) 
          .map((text, index) => (
            <p key={index} className="mb-2 text-sm leading-relaxed">
              {text}
            </p>
          ))}
      </div>

      {paragraphs.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-blue-500 hover:underline self-start"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default DescriptionBox;
