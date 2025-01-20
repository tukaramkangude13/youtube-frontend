import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Body from './componenets/Body';
import UserProfile from './componenets/UserProfile';
import ErrorHandle from './componenets/ErrorHandle';
import Home from './componenets/Home';
import Community from './componenets/Community';
import PlayList from './componenets/PlayList';
import Video from './componenets/Video';
import Search from './componenets/Search';
import MainContainer from './componenets/MainContainer';
import Short from './componenets/Short';
import Watch from './componenets/Watch';
import History from './componenets/History';
import WatchPlayList from './componenets/WatchPlayList';
import WatchLaterPlaylist from './componenets/WatchLaterPlaylist';
import LikedVideos from './componenets/LikedVideos';
const appRouter = createBrowserRouter([
    
  {
    path: '/',
    element: <App />, // Main layout with Header
     // Error boundary
    children: [
      {
        path: '/', // Default route
        element: (
          <Suspense fallback={<p className="mt-52">Loading...</p>}>
            <Body />
          </Suspense>
        ),
      },
      {
        path: '/userprofile/:channelId',
        element: <UserProfile />,

      },
      {
path:'/history',
element:<History/>,

      },
      {
        path:"/home",
element:<MainContainer/>,
      },
      {
        path:'/userprofile/home',
        element:<Home/>,

      },
      {
        path:"/playlistvideo",
        element:<WatchLaterPlaylist/>
      },  {
        path:'/userprofile/short',
        element:<Short/>,

      },
     
      {
        path:'/watch/:id',
        element:<Watch/>,

      },
    {
      path:'/watch/:id/:list',
      element:<WatchPlayList/>
    },
    {
      path:'/community',
      element:<Community/>,
    }, {
      path:'/LL',
      element:<LikedVideos/>,
    },
      {
path:'/userprofile/playlist',
element:<PlayList/>,
      },
      {
        path:'/userprofile/videos',
        element:<Video/>,
      },
      {
        path:'/userprofile/search',
        element:<Search/>
      }
      
    ],
  },
]);

export default appRouter;
