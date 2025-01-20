import React from "react";

const ChannelBanner = ({ profile, darkMode }) => {
  const imageUrl =
    profile?.items[0]?.brandingSettings?.image?.bannerExternalUrl || "";
  const modifiedUrl = `${imageUrl}=w780-fcrop64=1,00005a57ffffa5a8`;

  return (
    <div
      className={`flex justify-center items-center ${
        darkMode ? "bg-black" : "bg-gray-100"
      } py-4`}
    >
      <div className="w-full max-w-4xl">
        <img
          className="w-full h-[160px] object-cover rounded-xl shadow-sm"
          src={modifiedUrl}
          alt="Channel Banner"
        />
      </div>
    </div>
  );
};

export default ChannelBanner;
