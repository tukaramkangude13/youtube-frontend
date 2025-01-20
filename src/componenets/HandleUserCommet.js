import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { emojis } from "./utils/Emojis";

const HandleUserCommet = ({ docomment, topcomment, totalcomment }) => {
  const [showCommentButton, setShowCommentButton] = useState(false);
  const [filter, setFilter] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [comment, setComment] = useState("");
  const emojiRef = useRef(null);

  const toggleFilter = () => setFilter((prev) => !prev);
  const toggleEmoji = () => setShowEmoji((prev) => !prev);

  const handleOutsideClick = (event) => {
    if (emojiRef.current && !emojiRef.current.contains(event.target)) {
      setShowEmoji(false);
    }
  };

  useEffect(() => {
    if (showEmoji) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showEmoji]);

  const addEmoji = (index) => {
    setComment((prev) => (prev ? prev + emojis[index] : emojis[index]));
  };

  const handleCommentSubmit = () => {
    if (comment.trim() && docomment) {
      docomment(comment);
      setComment("");
      setShowCommentButton(false);
    }
  };

  const handleCancel = () => {
    setComment("");
    setShowCommentButton(false);
  };

  return (
    <div className="bg-black h-auto w-full rounded-md flex flex-col px-8 py-6 relative border border-gray-700 shadow-lg">
      {/* Comments Header */}
      <div className="flex justify-between items-center w-full mb-4">
        <p className="text-white text-lg font-semibold">
          {totalcomment} Comments
        </p>
        <button
          onClick={toggleFilter}
          aria-label="Filter comments"
          className="text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fill="currentColor"
          >
            <path d="M21 6H3V5h18v1zm-6 5H3v1h12v-1zm-6 6H3v1h6v-1z"></path>
          </svg>
        </button>
      </div>

      {/* Comment Input */}
      <div className="flex items-center gap-4 w-full">
        <p className="text-white -ml-8 bg-red-600 rounded-full w-8 h-8 flex items-center justify-center text-center text-xs">
          TK
        </p>
        <input
          type="text"
          onClick={() => setShowCommentButton(true)}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full border-b-2 bg-black text-white text-sm py-2 px-3 focus:outline-none focus:border-blue-500 rounded-md"
        />
      </div>

      {/* Emoji Picker and Action Buttons */}
      {showCommentButton && (
        <div className="mt-3 w-full flex justify-between gap-4">
          <div className="relative">
            <button onClick={toggleEmoji} aria-label="Add emoji">
              <FontAwesomeIcon
                icon={faSmile}
                className="text-white text-lg hover:text-yellow-400 transition duration-300"
              />
            </button>
            {showEmoji && (
              <div
                ref={emojiRef}
                className="absolute top-10 left-0 z-10 w-80 max-h-60 overflow-y-auto border rounded-md border-gray-600 bg-black p-2"
              >
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => addEmoji(index)}
                    className="font-bold text-2xl px-2 py-1 hover:bg-gray-700 rounded transition duration-200"
                    aria-label={`Add emoji ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="rounded-lg bg-red-600 text-white px-3 text-sm py-1 hover:bg-red-700 transition duration-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              disabled={!comment.trim()}
              className={`rounded-lg text-white px-3 text-sm py-1 ${
                comment.trim()
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-500 cursor-not-allowed"
              } transition duration-300`}
              onClick={handleCommentSubmit}
            >
              Comment
            </button>
          </div>
        </div>
      )}

      {/* Filter Options */}
      {filter && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black rounded-md p-4 w-80 border border-gray-600">
          <div className="flex flex-col gap-3">
            <button
              onClick={topcomment}
              className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md transition duration-300"
            >
              Top Comment
            </button>
            <button
              onClick={() => console.log("Newest clicked")}
              className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md transition duration-300"
            >
              Newest
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandleUserCommet;
