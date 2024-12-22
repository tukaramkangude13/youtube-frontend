import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { YOUR_API_KEY } from './utils/constant';

const PlayList = ({props}) => {
const[data,setdata]=useState(null);
const tukara=useSelector((state)=>state.app.chanelid);
console.log("channel id is the ",tukara);

const list=async()=>{
const data=await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${tukara}&maxResults=20&key=${YOUR_API_KEY}`)
const conver=await data.json();
setdata(conver);

}
{data && console.log(data)}
useEffect(()=>{
    list();
},[]);
if(!data) return;
  return (
    <div className=' flex  flex-wrap ml-36  '>
    
    {   data.items && data.items.map((x,index)=>(
        <div className=' flex    flex-col w-64 h-56  '>
            <img src={x?.snippet?.thumbnails?.maxres?.url||x?.snippet?.thumbnails?.high?.url} className=' w-full h-full flex-wrap  px-6 ' alt='image'/> 
        <p  > {x?.snippet.title} </p>
        <p> view Full playlist</p>
        </div>
    ))}
    </div>
  )
}

export default PlayList