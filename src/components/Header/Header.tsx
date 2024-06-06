import React from 'react';

function Header() {
  return (
    <div className="flex justify-between p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md">
      <div className="flex items-center">
        <img src="logo.png" alt="Logo" className="h-10 w-10 mr-2" />
        <span className="text-xl font-bold">Algorithm Visualizer</span>
      </div>
      <div>
        <ul className="flex gap-6 mt-3">
          <li className="hover:text-yellow-300 transition duration-300 cursor-pointer">Dijkstra Algorithm</li>
          <li className="hover:text-yellow-300 transition duration-300 cursor-pointer">BFS</li>
          <li className="hover:text-yellow-300 transition duration-300 cursor-pointer">DFS</li>
          <li className="hover:text-yellow-300 transition duration-300 cursor-pointer">A* Algorithm</li>
        </ul>
      </div>
      <div>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-300">
          Instructions
        </button>
      </div>
    </div>
  );
}

export default Header;
