import React from "react";
import Logo from "./Logo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header({ algo, setAlgo }) {
  const handleAlgoClick = (selectedAlgo) => {
    setAlgo(selectedAlgo);
  };

  const displayInstructions = () => {
    toast.info(
      <>
        <div className="p-6 bg-white rounded-lg shadow-md max-h-[900px] overflow-auto">
          <h2 className="text-lg font-bold mb-4">Instructions:</h2>
          <ol className="list-decimal ml-8 space-y-2">
            <li>
              <strong>Choosing Start and End Nodes:</strong> Input the row and column numbers for the start and end nodes in the respective input fields provided.
            </li>
            <li>
              <strong>Selecting the Algorithm:</strong> Choose the algorithm you want to visualize (BFS, DFS, or Djikstra) by clicking on the respective button.
            </li>
            <li>
              <strong>Adding obstacles(walls):</strong> You can add obstacles by clicking, holding and moving the mouse over grid cells.
            </li>
            <li>
              <strong>Visualizing the Algorithm:</strong> Once you've selected the algorithm, click on the "Visualize Algorithm" button to run the chosen algorithm.
            </li>
            <li>
              <strong>Clearing the Board:</strong> If you want to start over or clear the current board, simply click on the "Clear Board" button.
            </li>
            <li>
              <strong>Understanding the Algorithms:</strong> Take note of the differences between the algorithms and how they perform their searches.
            </li>
            <li>
              <strong>Observing Path Finding:</strong> Observe how each algorithm finds the path between the start and end nodes.
            </li>
            <li>
              <strong>Experimentation:</strong> Feel free to experiment with different start and end node coordinates, algorithms, and speeds to gain a better understanding.
            </li>
            <li>
              <strong>Enjoy Learning:</strong> Have fun exploring and learning about these classic pathfinding algorithms in a visually engaging way!
            </li>
          </ol>
        </div>
      </>,
      {
        position: "top-center",
        autoClose: false // To keep the toast open until manually closed
      }
    );
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
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-300"
          onClick={displayInstructions}
        >
          Instructions
        </button>
      </div>
    </div>
  );
}

export default Header;
