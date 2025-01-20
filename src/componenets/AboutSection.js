import React from "react";

const AboutSection = ({ full, profile, setShowMore }) => {
  const description =
    profile?.items[0]?.brandingSettings?.channel?.description || "";
  const paragraphs = description
    .split("\n")
    .filter((text) => text.trim() !== "");

  const monthInString = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[500px] bg-gray-800 text-white p-6 rounded-lg shadow-lg z-20">
      {/* Close Button */}
      <button
        onClick={() => setShowMore(false)}
        className="absolute top-4 right-4 text-white text-xl hover:bg-gray-700 rounded-full p-2"
      >
        X
      </button>

      {/* Description Text */}
      <div className="space-y-4">
        {paragraphs.map((para, index) => (
          <p key={index} className="text-sm leading-relaxed">
            {para}
          </p>
        ))}
        
        {/* Joined Date */}
        <p className="text-sm text-gray-400 mt-4">
          <span className="font-semibold">Joined:</span> {monthInString(full?.items[0]?.snippet?.publishedAt)}
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
