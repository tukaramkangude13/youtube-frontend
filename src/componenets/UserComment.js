import {
  faDownLong,
  faEllipsisVertical,
  faL,
  faSliders,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useGetChannelDetails } from "./utils/useGetChannelDetails";
import { Link, useNavigate } from "react-router-dom";
import { COMMENT_COUNT, TOTAL_COMMENT, VIDEO_COMMNET, YOUR_API_KEY } from "./utils/constant";
import HandleUserCommet from "./HandleUserCommet";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getChannelDetails } from "./getChannelDetails";
import CommentReply from "./CommentReply";
import { id, tr } from "date-fns/locale";
import { changechannelid } from "./utils/appSlice";

const UserComment = ({ videoid }) => {
  const [data, setData] = useState(null);
  const [replies, setReplies] = useState({});
  
  const [render, setrender] = useState(false);
  const dispatch=useDispatch(null);
  const navigate = useNavigate(null);
  const[NEXT_PAGE_TOKEN,setNEXT_PAGE_TOKEN]=useState(null);
  const[loading,setloadin]=useState(false);

  const [totalcomment, settotalcomment] = useState(null);
  useEffect(() => {
    commentcount();
    comment();
  }, [videoid]);
  // useEffect(()=>{
  //   getChannelDetails(data);
  // })







  
const sortig=useGetChannelDetails(data);
if(sortig)console.log(sortig);
  const commentcount = async () => {
    const total = await fetch(
      `${COMMENT_COUNT}${videoid}&key=${YOUR_API_KEY}`
    );
    const number = await total.json();
    settotalcomment(number?.items[0]?.statistics?.commentCount);
  };
  const comment = async () => {
    const wait = await fetch(
      `${TOTAL_COMMENT}${videoid}&key=${YOUR_API_KEY}`
    );

    const result = await wait.json();
    setNEXT_PAGE_TOKEN(result.nextPageToken)
    setData(result);

  };
  const ddata=useSelector((state)=>state.comment.comment);


    
   
  const[showshimmer,setshowshimmer]=useState(null);
   
   
  const fetchReplies = async (commentId) => {
  setloadin(true);
    const get = await fetch(
      `${VIDEO_COMMNET}${commentId}&key=${YOUR_API_KEY}`
    );
    const convert = await get.json();
    setloadin(false);

    setReplies((prevReplies) => ({
      ...prevReplies,
      [commentId]: convert.items,
    }));
  };
  const docomment=(value)=>{
     setData((prevData)=>{
     
     const newComment = {
 
      id: `new_${Date.now()}`,
      
    snippet: {
      topLevelComment: {
        snippet: {
          authorDisplayName: "tukaram kangude",
          textDisplay: value,
          textOriginal: value,
        },
      },
    },
    }
    return {
      ...prevData,
      items: [...prevData.items, newComment],
     }
     }
    ) 

  }
  
  const handleNavigate = (iii) => {
    console.log(iii)
    dispatch(changechannelid(iii))
    navigate(`/userprofile/${iii}`);
  };
  const topcomment=()=>{
    setData(sortig);
    console.log("top comment is called")
  }

  const[liked,setliked]=useState(true);
  const increaseLike = (commentId) => {

if(liked===true)
    setData((prevData) => {
      const updatedItems = prevData.items.map((item) => {
        if (item.id === commentId) {
          setliked(false);
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



  
  const getmore = async () => {
    console.log("Fetching more data...");
  
    if (!NEXT_PAGE_TOKEN) return;
     
     setshowshimmer(true);
    console.log(" condition")// Exit if no token available
  
    try {   
      const response = await fetch(
        `${TOTAL_COMMENT}${videoid}&key=${YOUR_API_KEY}&maxResults=20&pageToken=${NEXT_PAGE_TOKEN}`
      );
                     
      const data = await response.json();
      console.log("Fetched Data:", data);
      setshowshimmer(false);
  setNEXT_PAGE_TOKEN(data.nextPageToken)
  
      // Merge new comments into the existing state
      setData((prevData) => ({
        ...prevData,
        items: [...prevData.items, ...data.items],
      }));
    } catch (error) {
      console.error("Error fetching more comments:", error);
    }
  };
  if(NEXT_PAGE_TOKEN)
console.log(NEXT_PAGE_TOKEN)
  // window.addEventListener('scroll', async() => {
  //   if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
  //     console.log("You've reached the bottom of the page!");
     

  //   }
   
  // });
  const tukarama=true;
  const parseCommentText = (text) => {
    const parts = text.split(/(<a[^>]*>.*?<\/a>|#[\w]+)/g); // Split by anchor tags or hashtags
    return parts.map((part, index) => {
      if (part.startsWith("<a")) {
        // Extract href and text inside <a>
        const match = part.match(/<a href="([^"]*)">([^<]*)<\/a>/);
        if (match) {
          return { type: "link", url: match[1], text: match[2] };
        }
      } else if (part.startsWith("#")) {
        return { type: "hashtag", text: part };
      } else {
        return { type: "text", text: part };
      }
      return null;
    });
  };
  
  if(!data|| data.items.length===0) return;
  return (
    <div className="comments-container  bg-black  text-white   ">
      {data ? (
        <div>
          <HandleUserCommet docomment={docomment} topcomment={topcomment}  setData={setData}    totalcomment={totalcomment} />
          <div className=" flex "></div>
          { tukarama&&data.items.map((item, index) => (
            
            <div className="comment-item " key={index}>
              {/* Author's name and comment text */}
              <div className="comment-author">
                <div className=" flex  ">
                  {item?.snippet?.topLevelComment.snippet
                    ?.authorProfileImageUrl && (
                    <img
                      onClick={() => handleNavigate(item.snippet.topLevelComment
.                 snippet.authorChannelId.value

)}
                      className=" w-8 h-8 bg-black rounded-full "
                      alt={item?.snippet?.topLevelComment?.snippet?.authorDisplayName?.charAt(
                        1
                      )}
                      src={
                        item?.snippet?.topLevelComment?.snippet
                          
                          ?.authorProfileImageUrl   ||
                          item?.snippet?.topLevelComment?.snippet
                          ?. authorChannelUrl
                      }
                    ></img>
                  )}
                  <strong>
                    {item.snippet?.topLevelComment?.snippet?.authorDisplayName}:
                  </strong>
                </div>
              </div>
              <div className="comment-text">
              
                {item?.snippet?.topLevelComment?.snippet?.textDisplay}
              </div>

              {/* Likes and Dislikes */}
              <div className="comment-actions flex gap-4 mt-2 mb-3">
                <div className="   likes">
                  <FontAwesomeIcon


                    onClick={() =>{  increaseLike(item.id)}} // Handle like click
                    icon={faThumbsUp}
                    className="thumbs-up  cursor-pointer "
                  />
                  <span className="text-red-500">
                    {item?.snippet?.topLevelComment?.snippet?.likeCount}{" "}
                  </span>
                </div>
                <div className="dislikes">
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    className="thumbs-down"
                  />             
                  {       <CommentReply   loading={loading}  increaseLike={increaseLike} item={item.id}  replies={replies}  />   
                }

                </div>
              </div>

              {item.snippet.totalReplyCount !== 0 ? (

                <button
                  onClick={() => fetchReplies(item.id)}
                  className="bg-black   text-[#3f51b5]  "
                  >
                  {item.snippet.totalReplyCount}{" "}
                  {item.snippet.totalReplyCount > 1 ? "replies" : "reply"}
                </button>
              ) : (
                <button
                  disabled
                  className=" bg-black text-[#3f51b5]  py-2 px-4 rounded-md"
                >

                </button>
                
              )
              }
                       
            </div>
          ))}
          <button onClick={getmore}> Load More Comment</button>
            { showshimmer && <p className=" text-white">  loading .......................................  </p>  }
        </div>
      ) : (
        <p>Loading comments...</p>
      )}
    </div>
  );
};

export default UserComment;
