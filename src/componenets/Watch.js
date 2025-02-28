import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideoDetails } from './fetchVideoDetails';
import MainVideo from './MainVideo';
import SideVideo from './SideVideo';
import { useSelector } from 'react-redux';
import MainContainer from './MainContainer';
import VideosContainer from './VideosContainer';
const Watch = () => {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const sidebar=useSelector((state)=>state.app.ismenuopen)

  useEffect(() => {
    const getVideoDetails = async () => {
      const details = await fetchVideoDetails(id);
      setVideoDetails(details); // Update state with video details
    };
    getVideoDetails();
  }, [id]);

  if (!videoDetails) return <p>Loading video details...</p>;

  console.log(videoDetails);

  return (
<div className={`    flex  h-full   -ml-12  w-full   `} >
<div className=' w-[80%]'><MainVideo data={videoDetails}   /></div>
<div className='       flex flex-wrap w-[30%]     '><SideVideo/></div>

</div> 

  );
};

export default Watch;
