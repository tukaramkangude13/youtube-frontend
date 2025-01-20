import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CommentReply = ({ setData, loading, item, replies }) => {
console.log(loading);
  const navigate=useNavigate();  
const increaseLike = (commentId) => {
    setData((prevData) => {
      const updatedItems = prevData.items.map((item) => {
        if (item.id === commentId) {
          return {
            ...item,
            snippet: {
              ...item.snippet,
              topLevelComment: {
                ...item.snippet.topLevelComment,
                snippet: {
                  ...item.snippet.topLevelComment.snippet,
                  likeCount: item.snippet.topLevelComment.snippet.likeCount + 1,
                },
              },
            },
          };
        }
        return item;
      });

      return { ...prevData, items: updatedItems };
    });
  };

  return (
    <div className="mt-4">
    {console.log(replies)}
      {replies[item] && (
        <div className="mt-4 pl-6 border-l-2 border-gray-700">
          {loading ===true  ?       (
            <div className="w-7   h-7  border-4 border-t-4 border-gray-200   border-t-slate-600  rounded-full     animate-spin"></div>

          ) : (
            replies[item].map((reply, replyIndex) => (
              <div key={replyIndex} className="mb-6">
                <div className="flex gap-4">
                  <img
                    alt="Author"
                 onClick={()=>navigate(`/userprofile/${reply.snippet?.authorChannelId?.value}`)}
                    className="rounded-full  cursor-pointer  w-10 h-10"
                    src={reply.snippet.authorProfileImageUrl||reply.snippet.authorChannelUrl}
                  />
                  {console.log(reply.snippet)}
                  <div>
                    <p className="text-white font-semibold">
                      {reply.snippet.authorDisplayName}
                    </p>
                    <p className="text-gray-300">{reply.snippet.textDisplay}</p>
                    <div className="flex items-center gap-6 mt-2">
                      <button
                        // onClick={() => increaseLike(item.id)} 
                        className="flex items-center text-sm text-gray-400 hover:text-blue-500"
                      >
                        <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
                        <span>{reply.snippet.likeCount || 0}</span> 
                      </button>
                      <button className="flex items-center text-sm text-gray-400 hover:text-blue-500">
                        <FontAwesomeIcon icon={faThumbsDown} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CommentReply;
