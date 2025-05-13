"use client";

import React from 'react';

interface banphimao {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  className?: string;
}

const VirtualKeyboard: React.FC<banphimao> = ({
  onKeyPress,
  onBackspace,
  onEnter,
  className = "",
}) => {
  const keysLayout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '.'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '/'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ':', '_'],
    [' '], // Space bar
  ];

  const handleKeyClick = (key: string) => {
    if (key === 'SPACE') {
      onKeyPress(' ');
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className={`bg-gray-200 p-4 rounded-lg shadow-md ${className}`}>
      {keysLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 mb-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key === ' ' ? 'SPACE' : key)}
              className={`
                min-w-[40px] h-14 text-xl font-semibold rounded-md shadow
                bg-white hover:bg-gray-100 active:bg-gray-300
                border border-gray-300
                ${key === ' ' ? 'flex-grow' : 'w-14'}
                sm:min-w-[50px] sm:h-16 sm:w-16
                md:min-w-[60px] md:h-20 md:w-20 md:text-2xl
              `}
            >
              {key === ' ' ? 'Space' : key}
            </button>
          ))}
        </div>
      ))}
      <div className="flex justify-center gap-1 mt-2">
        <button
          onClick={onBackspace}
          className="h-14 w-28 text-lg font-semibold rounded-md shadow bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 border border-yellow-500 sm:h-16 sm:w-32 md:h-20 md:w-40"
        >
          Xóa lùi
        </button>
        <button
          onClick={onEnter}
          className="h-14 w-28 text-lg font-semibold rounded-md shadow bg-green-500 text-white hover:bg-green-600 active:bg-green-700 border border-green-600 sm:h-16 sm:w-32 md:h-20 md:w-40"
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;