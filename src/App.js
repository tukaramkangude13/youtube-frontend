import React from 'react';
import { Provider, useSelector } from 'react-redux';
import Header from './componenets/Header';
import store from './componenets/utils/store';
import { Outlet } from 'react-router-dom';
import SideBar from './componenets/SideBar';
import UserProfile from './componenets/UserProfile';
const AppContent = () => {
  const profile = useSelector((state) => state.app.profile);
  console.log(profile);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header stays at the top */}
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar stays on the left */}
        <SideBar />

        {/* Main content */}
        <div className="flex-1 p-4">
         
          <main className="mt-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);
export default App;