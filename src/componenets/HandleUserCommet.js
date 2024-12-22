import React, { useRef, useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faSmile } from '@fortawesome/free-solid-svg-icons';
import { emojis } from './utils/Emojis';
const HandleUserCommet = ({ totalcomment }) => {
  const [showcommentbutton, setshowcommentbutton] = useState(null);

const cardRef=useRef(null);
  const [filter, setFilter] = useState(false);
  const[showemoji,setshowemoji]=useState(false);
  const[comment,setcomment]=useState(null);
  const visiblebutton = async () => {
    setshowcommentbutton(true);
  };
const handleemoji=()=>{
    setshowemoji(true);
}

// const handleClickOutside = (event) => {
//     if (cardRef.current && !cardRef.current.contains(event.target)) {
//         setshowemoji(false);
//     }
//   };
const addemoji=(index)=>{
    if(comment)
    setcomment(comment+emojis[index])
 
 else   setcomment(emojis[index])

}
//   useEffect(() => {
//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);
  
return (
    <div className="bg-[#212121E6] h-auto border-blue-900 w-full rounded-md flex flex-col justify-between items-center px-8 py-6 relative">
      <div className="flex justify-between items-center w-full mb-4">
        <p className="text-white text-lg font-semibold">{totalcomment} Comments</p>
        <FontAwesomeIcon
          onClick={() => setFilter(!filter)}
          icon={faSliders}
          className="text-white cursor-pointer"
        />
      </div>

      
      <div className="flex items-center gap-4 w-full">
        <p className="text-white -ml-8 bg-red-600 rounded-full w-8 h-8 flex items-center justify-center text-center text-xs">
          TK
        </p>

        <input
          type="text"
          onClick={visiblebutton}
          value={comment}
          onChange={(e)=>setcomment(e.target.value)}
          placeholder="Add a Comment..."
          className="w-full border-b-2 bg-black text-white text-sm py-2 px-3 focus:outline-none focus:border-blue-500"
        />

        <hr className="my-4 border-gray-600" />
      </div>

      {/* Display Cancel and Comment buttons */}
      {showcommentbutton && (
        <div className="mt-3 w-full flex   justify-between gap-4">
<div className=' flex flex-col'>        <button onClick={ handleemoji  }  > <FontAwesomeIcon icon={faSmile } className=' text-white' /> </button>
{showemoji &&<div  ref={cardRef} className=' z-10  w-80 h-80 overflow-y-scroll    border rounded-md border-slate-600   bg-black'>

   {  emojis.map((emojis,index)=>(

  <button  onClick={()=>addemoji(index)}  className=' font-bold text-2xl gap-7   '>{emojis}   </button>

  
))}

</div>}


</div>
        <div>

        <button className="rounded-lg text-white px-3 text-sm py-1">Cancel</button>
        <button className={`rounded-lg    ${comment!=null ? ' bg-blue-600 ':'bg-slate-500'} text-white  opacity-80 py-1 text-sm px-3`}>Comment</button>
        </div>
        </div>
      )}

      {/* Display sorting options when filter is true */}
      {filter && (
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-black rounded-md p-4 w-80">
          <div className="flex flex-col gap-3">
            <button className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md">Top Comment</button>
            <button className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md">Newest</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandleUserCommet;
