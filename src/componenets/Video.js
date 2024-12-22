import React from 'react'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
const Video = () => {
    const[data,setdata]=useState(null);
    const props=useSelector((state)=>state.app.chanelid)
        const list=async()=>{
     const data=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${props}&maxResults=20&order=date&type=video&videoDuration=short&key=AIzaSyBOvbJJbeI-BrOB4F06ZLEqzYyKe6WTbwk`)
     const conver=await data.json();
     setdata(conver);
     console.log(data);
     }
     {data && console.log(data)}
     useEffect(()=>{
         list();
     },[]);
     if(!data) return;
    
       return (
         <div className=' flex  flex-wrap ml-36  '>
         
         {   data && data.items.map((x,index)=>(
             <div className=' flex flex-wrap w-48 h-40 gap-5 '>
                 <img src={x?.snippet?.thumbnails?.high?.url} className=' w-full h-full flex-wrap  ' alt='image'/> 
             </div>
         ))}
         </div>
       )
}

export default Video