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
import Short from './componenets/Short';
import Watch from './componenets/Watch';
import History from './componenets/History';
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
        path:'/userprofile/home',
        element:<Home/>,

      },  {
        path:'/userprofile/short',
        element:<Short/>,

      },  {
        path:'/watch/:id',
        element:<Watch/>,

      },
      {
        path:'/community',
        element:<Community/>,
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
