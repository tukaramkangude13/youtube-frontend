import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const DescriptionBox = ({channelDetail,data}) => {

    const[more,setmore]=useState(1);

const DarkMode=useSelector((state)=>state.dark.isdark);
const paragraphs = data?.snippet?.localized?.description.split('\n').filter((text) => text.trim() !== '');
console.log(paragraphs);
    console.log(channelDetail);
    const moss=paragraphs.length;
    console.log(data);
  return (
    <div className={` w-full  flex flex-col  h-full ${DarkMode ? 'bg-slate-800 text-white ' : 'bg-white'}`}>DescriptionBox
   <div> 
   <div className={` flex `}>
<p>{data?.statistics?.viewCount} Views </p>
<p>{data?.snippet?.publishedAt}</p>

<p>{}</p>
   </div>
 <div className={`${ more<2?' flex':' flex flex-col' }`}  >
 {    paragraphs.slice(0,more).map((text,index)=>
(<p className= {`  h-full bg-slate-800 ${more<1 ? '  truncate w-[490px]':''}`}    >{text}</p> )

       
    )
}
{ more <2 && <button onClick={ ()=>setmore(paragraphs.length)} className='   text-white'>...more</button>
}</div>
  

    </div>
   <div>  </div>
   <div> </div>
   </div>
  )
}

export default DescriptionBox