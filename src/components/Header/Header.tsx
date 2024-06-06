import React from "react";
import Logo from "./Logo";
function Header({ algo, setAlgo }) {
  const handleAlgoClick = (selectedAlgo) => {
    setAlgo(selectedAlgo);
  };

  return (
    <div className="flex justify-between p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md">
      <div className="flex items-center">
        <Logo />
      </div>
      <div>
        <ul className="flex gap-6 mt-3">
          {["Dijkstra", "BFS", "DFS"].map((algorithm) => (
            <li
              key={algorithm}
              className={`cursor-pointer transition duration-300 ${
                algo === algorithm ? "text-yellow-300 font-bold" : "hover:text-yellow-300"
              }`}
              onClick={() => handleAlgoClick(algorithm)}
            >
              {algorithm} Algorithm
            </li>
          ))}
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
