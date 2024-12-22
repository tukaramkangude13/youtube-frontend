import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ChannelBanner from './ChannelBanner';
import ChannelInfo from './ChannelInfo';
import AboutSection from './AboutSection';
import ShareModal from './ShareModal';
import NavigationMenu from './NavigationMenu';
import { toogleprofile } from './utils/appSlice';
import { YOUR_API_KEY } from './utils/constant';
import PlayList from './PlayList';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [full, setFull] = useState(null);
  const [share, setShare] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Active index state

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
        `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelId}&key=${YOUR_API_KEY}`
      );
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchFullInfo = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${YOUR_API_KEY}`
      );
      const data = await response.json();
      setFull(data);
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

  const renderClickedComponent = () => {
    switch (activeIndex) {
      case 0:
        return  <PlayList/>
      case 1:
        return <PlayList/>
      case 2:
        return <PlayList/>
      case 3:
        return <PlayList/>
      case 4:
        return <PlayList/>
      case 5:
        return <PlayList/>
      default:
        return <PlayList/>;
    }
  };

  if (!profile || !full) return null;

  return (
    <div className={`${darkMode ? 'bg-black' : 'bg-white'} w-full h-screen mt-[72px] px-20`}>
      <ChannelBanner profile={profile} darkMode={darkMode} />
      <ChannelInfo full={full} profile={profile} darkMode={darkMode} setShowMore={setShowMore} setShare={setShare} />
      {showMore && <AboutSection full={full} profile={profile} setShowMore={setShowMore} />}
      {share && <ShareModal full={full} setShare={setShare} />}
      <NavigationMenu darkMode={darkMode} handleNavigate={handleNavigate} activeIndex={activeIndex} />
      <div className="mt-5">{renderClickedComponent()}</div>
    </div>
  );
};

export default UserProfile;
