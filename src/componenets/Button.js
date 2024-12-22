import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons';
  const Button = () => {
  const categories = [
    'All', 'Music', 'Gaming', 'Movies', 'News', 'Sports', 'Live', 'Fashion', 'Technology', 'Food', 'Health',
    'Comedy', 'Science',
  ];

  const [position, setPosition] = useState(0);
  const darkk = useSelector((state) => state.dark.isdark); // For dark mode

  const left = () => {
    setPosition((prev) => (prev > 0 ? prev - 10 : prev));
  };

  const right = () => {
    setPosition((prev) => (prev < (categories.length - 5) * 100 ? prev + 10 : prev));
  };

  return (
    <div className="relative">
      {/* Left Button */}
      <button
        onClick={left}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 px-3 py-2 
          bg-${darkk ? 'gray-700' : 'gray-300'} 
          text-${darkk ? 'white' : 'gray-800'} 
          rounded-full hover:bg-${darkk ? 'gray-600' : 'gray-400'}`}
      >

<FontAwesomeIcon icon={faChevronLeft} />       </button>

      {/* Category Bar */}
      <div className="flex gap-5 overflow-x-auto p-2 bg-white shadow-md">
        <div
          style={{ transform: `translateX(-${position}%)` }}
          className="flex gap-5 transition-transform duration-300"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-sm font-semibold 
                text-${darkk ? 'gray-300' : 'gray-600'} 
                bg-transparent 
                border-${darkk ? 'gray-600' : 'gray-300'} 
                rounded-lg hover:bg-${darkk ? 'gray-600' : 'gray-100'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Right Button */}
      <button
        onClick={right}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 px-3 py-2 
          bg-${darkk ? 'gray-700' : 'gray-300'} 
          text-${darkk ? 'white' : 'gray-800'} 
          rounded-full hover:bg-${darkk ? 'gray-600' : 'gray-400'}`}
      >

<FontAwesomeIcon icon={ faChevronRight } />       </button>
    </div>
  );
};

export default Button;



