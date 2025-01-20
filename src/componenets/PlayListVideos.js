import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PLAYLIST_DATA, YOUR_API_KEY } from './utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowsAlt, faArrowsAltH, faArrowsSplitUpAndLeft, faEllipsisVertical, faFlag, faLongArrowDown, faPlay, faShuffle, faSortDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons/faArrowDownAZ';
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons/faArrowsAltV';
import { add } from 'date-fns';
import { laterplaylist } from './utils/userProfileSlice';

const PlayListVideos = () => {
  const { list } = useParams();
  const[add,setadd]=useState(false);
  const{id}=useParams();
  const[openmenu,setopenmenu]=useState(false);
  const[current,setcurrent]=useState(1);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [video, setVideo] = useState(null);
  const heading = useSelector((state) => state.userprofile.playlisttitle);
const[openindex,setopenindex]=useState(-1);
  useEffect(() => {
    makeApiCall();
  }, []);

  const makeApiCall = async () => {
    const get = await fetch(
      `${PLAYLIST_DATA}${list}&maxResults=50&key=${YOUR_API_KEY}`
    );
    const convert = await get.json();
    setVideo(convert);
  };

  if (!video) return null;

  return (
    <div className="mt-11  w-[400px]   ">
      <div className="bg-[#212121] rounded-t-2xl px-3    py-2 border border-t-slate-500 border-y-slate-500  flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-white text-lg font-bold">{heading}</p>
          <div className="flex">
          <but   onClick={()=>dispatch(laterplaylist(video))}
  className=' text-white ' >   save watch later  </but>
            <p className="text-white text-sm">{video?.items[0]?.snippet?.channelTitle}</p>
            <p className="pl-2 text-white">
              {current}/{video?.pageInfo?.totalResults}
            </p>
          </div>
          
          <div className="flex gap-6 mt-2">
            <button className="text-white text-lg">
              <FontAwesomeIcon icon={faLongArrowDown} />
            </button>
            <button className="text-white text-lg">
              <FontAwesomeIcon icon={faShuffle} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button className="text-white text-lg">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <button  onClick={()=>setadd(!add)}  className="text-white text-lg">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
{      add   &&       <button  onClick={()=>setadd(!add)}   className=' text-[#f1f1f1]  bg-[#717171]  py-2  rounded-md hover:bg-[#4D4D4D]  absolute right-28 top-48 px-4       ' >  <FontAwesomeIcon  className=' text-white text-lg   ' icon={ faArrowDown} />Save plalist to libarary </button>
}        </div>
      </div>

      <div className="overflow-y-scroll    h-[353px] bg-[#181818] text-white border border-slate-500 rounded-b-2xl">
        {video.items.map((card, index) => (
          <div

          onClick={()=> {
          setcurrent(card?.snippet?.position+1)
           navigate(`/watch/${card?.snippet?.resourceId
?.videoId
}/${list}`)}
          }
            key={index}
            className="flex group items-center  cursor-pointer gap-4 p-2  group hover:bg-[#292929] border-b border-gray-700"

            onMouseEnter={()=>setopenindex(index)}
            onMouseLeave={()=>setopenindex(-1)}
 
          >       
          {console.log(index)}   

{              <div className="text-gray-400  text-center" >  {id===card?.snippet?.resourceId?.videoId    ? <FontAwesomeIcon icon={ faPlay  } />  : ''   }     {index + 1}</div>
}
            <div className="w-[120px] h-[67px] flex-shrink-0">
              <img
                src={card?.snippet?.thumbnails?.standard?.url || card?.snippet?.thumbnails?.default?.url}
                alt="thumbnail"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
<div className=' absolute  '>     </div>
            <div className="flex-1 text-sm text-gray-200">
              <p className="line-clamp-2">{card?.snippet?.title}</p>
              <p className="text-gray-400 text-xs mt-1">{card?.snippet?.channelTitle}</p>
            </div>
            <button   className='   px-2        '><FontAwesomeIcon  onClick={()=>setopenmenu(!openmenu)}   className=' text-white  opacity-0  group-hover:opacity-100  '  icon={faEllipsisVertical} /> </button>
            {openmenu    && <div>
<div className='  bg-[#3c3c3c]    rounded-lg absolute    top-[350px]     right-36    w-64 px-3 h-40 justify-between py-2    flex flex-col'>
<div className=' flex gap-2   h-7      hover:bg-[#909090]  hover:bg-opacity-50    '>
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"   fill=' currentcolor'  className=' text-white '     ><path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"></path></svg>

<p  className=' text-[#f1f1f1]'  onClick={ card?.snippet}  >  

    Save to  Watch Later    </p>

</div>
<div className=' flex gap-2   h-7      hover:bg-[#909090]  hover:bg-opacity-50    '
>
{console.log("    secons ined ",index," when the plalist saved time")}
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"  fill=' currentcolor'  className=' text-white ' ><path d="M18 4v15.06l-5.42-3.87-.58-.42-.58.42L6 19.06V4h12m1-1H5v18l7-5 7 5V3z"></path></svg>
<p> Save to Playlist </p>

</div>
<div className=' flex gap-2   h-7      hover:bg-[#909090]  hover:bg-opacity-50    '>
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"  fill=' currentcolor'  className=' text-white '  ><path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path></svg>
<p> Download </p>

</div>
<div className=' flex gap-2   h-7      hover:bg-[#909090]  hover:bg-opacity-50    '>
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"  fill=' currentcolor'  className=' text-white ' ><path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"></path></svg>
  <p>  Share  </p>
</div><p>   </p>
</div>

          </div>}
          </div>
        ))}
      {  console.log("component render again")}
      </div>
    </div>
  );
};

export default PlayListVideos;
