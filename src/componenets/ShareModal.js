import React from "react";

const ShareModal = ({ full, setShare }) => {
  const shareLinks = [
    { name: 'WhatsApp', url: `https://wa.me/?text=${encodeURIComponent(full?.items[0]?.snippet?.customUrl)}`, icon: '📱' },
    { name: 'Twitter', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(full?.items[0]?.snippet?.customUrl)}`, icon: '🐦' },
    { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(full?.items[0]?.snippet?.customUrl)}`, icon: '📘' },
    { name: 'LinkedIn', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(full?.items[0]?.snippet?.customUrl)}`, icon: '🔗' },
    { name: 'Email', url: `mailto:?subject=Check this out&body=${encodeURIComponent(full?.items[0]?.snippet?.customUrl)}`, icon: '📧' },
    { name: 'Reddit', url: `https://www.reddit.com/submit?url=${encodeURIComponent(full?.items[0]?.snippet?.customUrl)}`, icon: '👾' }
  ];

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-20">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-11/12 sm:w-96 space-y-4">
        {/* Close Button */}
        <button
          onClick={() => setShare(false)}
          className="absolute top-4 right-4 text-white text-2xl hover:bg-gray-700 p-2 rounded-full"
        >
          X
        </button>

        <h2 className="text-2xl font-semibold text-center">Share this Channel</h2>

        {/* Share Links */}
        <div className="space-y-3">
          {shareLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg space-x-3"
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
