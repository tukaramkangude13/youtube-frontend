import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ChannelBanner from './ChannelBanner';
import ChannelInfo from './ChannelInfo';
import AboutSection from './AboutSection';
import ShareModal from './ShareModal';
import NavigationMenu from './NavigationMenu';
import { toogleprofile } from './utils/appSlice';
import { CHANNEL_INFO, CHANNEL_PROFILE, YOUR_API_KEY } from './utils/constant';
import PlayList from './PlayList';
import Community from './Community';
import Short from './Short';
import 'react-loading-skeleton/dist/skeleton.css';
import Video from './Video';
import Search from './Search';
import Skeleton from 'react-loading-skeleton';
import Home from './Home';
import { withcount } from './PlayList';
const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [full, setFull] = useState(null);
  const [share, setShare] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // Active index state

  const dispatch = useDispatch();
  const { channelId } = useParams();
  const darkMode = useSelector((state) => state.dark.isdark);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    fetchFullInfo();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `${CHANNEL_PROFILE}${channelId}&key=${YOUR_API_KEY}`
      );
      const data = await response.json();
      setProfile(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchFullInfo = async () => {
    try {
      const response = await fetch(
        `${CHANNEL_INFO}${channelId}&key=${YOUR_API_KEY}`
      );
      const data = await response.json();
      setFull(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching full info:', error);
    }
  };

  const handleNavigate = (index) => {
    setActiveIndex(index); // Update activeIndex
    dispatch(toogleprofile(true));
    // const paths = [
    //   '/home',
    //   '/userprofile/community',
    //   '/userprofile/short',
    //   '/userprofile/playlist',
    //   '/userprofile/videos',
    //   '/userprofile/search',
    // ];
    // navigate(paths[index]);
  };
// const HigherOrder=withcount(PlayList);

  const renderClickedComponent = () => {
//  return <PlayList/>
    switch (activeIndex) {
      
      case 0:
        return  <Home/>
      case 1:
        return <Community/>
      case 2:
        return <Short/>
      case 3:
        return <PlayList/>
      case 4:
        return <Video/>
      case 5:
        return <Search/>
      default:
        return <PlayList/>;
    }
  };
  if (!profile || !full) {
    return (
      <div className={`${darkMode ?   'bg-black' : 'bg-white'} w-full      h-screen mt-[72px] px-20`}>
        {/* Shimmer Effect while loading */}
        <Skeleton height={200} width="100%" className="mb-4" />
        <div className="flex space-x-4">
          <Skeleton circle height={50} width={50} />
          <div className="flex flex-col space-y-2">
            <Skeleton width="60%" height={20} />
            <Skeleton width="40%" height={15} />
          </div>
        </div>
        <Skeleton height={50} width="100%" className="mt-4" />
        <div className="mt-5">
          <Skeleton height={200} width="100%" />
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-[#060505]' : 'bg-white'} w-full h-screen mt-[72px] px-20`}>
      <ChannelBanner profile={profile} darkMode={darkMode} />
      <ChannelInfo full={full} profile={profile} darkMode={darkMode} setShowMore={setShowMore} setShare={setShare} />
      {showMore && <AboutSection full={full} profile={profile} setShowMore={setShowMore} />}
      {share && <ShareModal full={full} setShare={setShare} />}
      <NavigationMenu darkMode={darkMode} handleNavigate={handleNavigate} activeIndex={activeIndex} />
      <div className="mt-5  w-full  h-full  bg-black     ">{renderClickedComponent()}    there is no to shoiw   </div>
    </div>
  );
};

export default UserProfile;
