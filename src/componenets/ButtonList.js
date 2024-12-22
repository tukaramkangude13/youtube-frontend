import React from 'react';
import { useSelector } from 'react-redux';
import Button from './Button';

const ButtonList = () => {
  const darkk = useSelector((state) => state.dark.isdark); // Accessing dark mode state from Redux store

  return (
    <div
      className={`w-full p-4 ${
        darkk ? 'bg-[#212121] text-white' : 'bg-white text-black'
      }`} // Apply dark or light mode styles based on darkk value
    >
      <Button />
    </div>
  );
};

export default ButtonList;
