const ChannelInfo = ({ full, profile, darkMode, setShowMore, setShare }) => {
    const converttostring = (views) => {
      if (views >= 1_000_000) return Math.floor(views / 1_000_000) + 'M';
      if (views >= 1_000) return Math.floor(views / 1_000) + 'K';
      return views + '';
    };
    return (
      <div className="flex ml-20">
        <img src={full?.items[0]?.snippet?.thumbnails?.high?.url} className="w-52 h-52 rounded-full" alt="Channel Thumbnail" />
        <div className="flex flex-col">
          <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
            {profile?.items[0]?.brandingSettings?.channel?.title}
          </p>
          <div className="flex">
            <p   className={`  ${darkMode ? 'text-white' : 'text-black'}`} >{full?.items[0]?.snippet?.customUrl}</p>
            <p   className={`  ${darkMode ? 'text-white' : 'text-black'}`} >{converttostring(full?.items[0]?.statistics?.subscriberCount)} subscribers</p>
            <p  className={`  text-sm ${darkMode ? 'text-white' : 'text-black'}`} >{converttostring(full?.items[0]?.statistics?.videoCount)} videos</p>
          </div>
         <div className="flex"> <p  className={`   truncate w-80 text-sm ${darkMode ? 'text-white' : 'text-black'}`} >{full?.items[0]?.snippet?.description} </p>
         <button   className={`  text-sm  ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => setShowMore(true)}>Show More</button></div>
          <button   className={`  text-sm  ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => setShare(true)}>Share</button>
        </div>
      </div>
    );
  };
  
  export default ChannelInfo;
  