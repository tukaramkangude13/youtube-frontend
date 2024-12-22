import React from 'react';
import SideBar from './SideBar';
import MainContainer from './MainContainer';
import { useSelector } from 'react-redux';
import UserComment from './UserComment';

const Body = () => {
  const showbar = useSelector((state) => state.app.ismenuopen);

  return (
    <div className="flex w-full h-screen">
      <div className={`${showbar ? 'w-[250px]' : 'w-[80px]'} bg-gray-100 h-full`}>
        <SideBar />
      </div>

      <div className={`${showbar ? 'w-[calc(100%-250px)]' : 'w-[calc(100%-80px)]'} bg-white h-full`}>
        {/* <UserComment /> */}
        <MainContainer />
      </div>
    </div>
  );
};

export default Body;
