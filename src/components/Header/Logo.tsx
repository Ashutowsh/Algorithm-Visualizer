import React from 'react';

function Logo() {
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
        <path d="M20 16a4 4 0 1 1-4-4 4 4 0 0 1 4 4zm-9-4a4 4 0 1 1-4-4 4 4 0 0 1 4 4zM4 20h16v2H4z"/>
      </svg>

      </div>
      <span className="ml-2 text-xl font-bold text-white">Algorithm Visualizer</span>
    </div>
  );
}

export default Logo;
