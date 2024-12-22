import React from 'react';

const NavigationMenu = ({ darkMode, handleNavigate, activeIndex }) => {
  const menuItems = ['Home', 'Community', 'Shorts', 'Playlist', 'Videos', 'Search'];

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-200'} p-4 flex space-x-4`}>
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`py-2 px-4 rounded ${
            activeIndex === index ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'
          } hover:bg-blue-600`}
          onClick={() => handleNavigate(index)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default NavigationMenu;
