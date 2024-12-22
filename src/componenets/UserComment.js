import { faEllipsisVertical, faL, faSliders, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import { Link, useNavigate } from 'react-router-dom';
import { YOUR_API_KEY } from './utils/constant';
import HandleUserCommet from './HandleUserCommet';

const UserComment = ({videoid}) => {
  const [data, setData] = useState(null);
  const [replies, setReplies] = useState({}); // Store replies for each comment
const[render,setrender]=useState(false);
 const navigate=useNavigate(null);
const[totalcomment,settotalcomment]=useState(null);
  useEffect(() => {
   commentcount();
    comment();
  }, [videoid]); // Empty array means this runs only once when the component mounts

  const commentcount=async()=>{
const total=await fetch(      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoid}&key=${YOUR_API_KEY}`);
const  number =await total.json()
settotalcomment(number?.items[0]?.statistics?.commentCount)
  }
  const comment = async () => {
    const wait = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoid}&key=${YOUR_API_KEY}`
    );
   
      
    const result = await wait.json();
    setData(result); 
  };

  const fetchReplies = async (commentId) => {
    const get = await fetch(
      `https://www.googleapis.com/youtube/v3/comments?part=snippet&parentId=${commentId}&key=${YOUR_API_KEY}`
    );
    const convert = await get.json();
    setReplies((prevReplies) => ({
      ...prevReplies,
      [commentId]: convert.items, 
    }));
  };


    console.log(data);
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
                  likeCount: item.snippet.topLevelComment.snippet.likeCount + 1, // Increment like count
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
  const handleNavigate = (channelid) => {
    navigate(`/comments/${channelid}`);

  };
  return (
    <div className="comments-container  bg-[#212121E6]  text-white   ">
      {data ? (
        <div>
      <HandleUserCommet totalcomment={totalcomment}   />
         <div className=' flex '> 
         
    

                     </div>
          { data.items.map((item, index) => (
            <div className="comment-item " key={index}>
              {/* Author's name and comment text */}
              <div className="comment-author">
             <div   className=' flex  '>
           {  item.snippet.topLevelComment.snippet.authorProfileImageUrl &&  <img  
           onClick={
            
           ()=> handleNavigate(item.snippet.
channelId
)
           
           }
          
           
             className=' w-8 h-8 bg-black rounded-full '  alt= { item.snippet.topLevelComment.snippet.authorDisplayName.charAt(1)}   src={item.snippet.topLevelComment.snippet.authorProfileImageUrl       }></img>}
             <strong>{item.snippet.topLevelComment.snippet.authorDisplayName}:</strong>
     
             </div>
              </div>
              <div className="comment-text">
                {item.snippet.topLevelComment.snippet.textDisplay}
              </div>

              {/* Likes and Dislikes */}
              <div className="comment-actions flex gap-4 mt-2 mb-3">
                <div className="likes">
                  <FontAwesomeIcon
                    onClick={() => increaseLike(item.id)} // Handle like click
                    icon={faThumbsUp}
                    className="thumbs-up"
                  />
                  <span className="text-red-500">
                    {item.snippet.topLevelComment.snippet.likeCount} {/* Display like count */}
                  </span>
                </div>
                <div className="dislikes">
                  <FontAwesomeIcon icon={faThumbsDown} className="thumbs-down" />
                </div>
              </div>

              {/* Check if the comment has replies */}
              {item.snippet.totalReplyCount !== 0 ? (
                <button
                  onClick={() => fetchReplies(item.id)}
                  className="bg-black text-white py-2 px-4 rounded-md"
                >
                  {item.snippet.totalReplyCount} {item.snippet.totalReplyCount > 1 ? 'replies' : 'reply'}
                </button>
              ) : (
                <button disabled className="bg-gray-200 text-gray-400 py-2 px-4 rounded-md">
                  No replies
                </button>
              )}

              {/* Render the replies if available */}
              {replies[item.id] && (
                <div className="replies-section mt-4 pl-6">
                  {replies[item.id].map((reply, replyIndex) => (
                    <div key={replyIndex} className="reply-item mb-3">
                      <p><strong>{reply.snippet.authorDisplayName}:</strong></p>
                      <p>{reply.snippet.textDisplay}</p>
                      <div className="reply-actions flex gap-4 mt-2 mb-3">
                        <div className="likes">
                        <img alt=' mgimg '   className=' rounded-full  w-8 h-8     ' src={  reply.snippet.authorProfileImageUrl  }  ></img>

                          <FontAwesomeIcon     onClick={() => increaseLike(item.id)} icon={faThumbsUp} className="thumbs-up" />44


                          <span className="text-red-500">{reply.snippet.likeCount}</span>
                        </div>
                        <div className="dislikes">
                          <FontAwesomeIcon icon={faThumbsDown} className="thumbs-down" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading comments...</p>
      )}
    </div>
  );
};

export default UserComment;
