import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { bfs, getShortestPathNodes } from "../Algorithms/BFS/algorithm";

const BFS = () => {
  const [grid, setGrid] = useState([]);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [isFindingPath, setIsFindingPath] = useState(false);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [shortestPathNodes, setShortestPathNodes] = useState([]);
  const [startNode, setStartNode] = useState({ row: 10, col: 15 });
  const [endNode, setEndNode] = useState({ row: 10, col: 38 });

  useEffect(() => {
    const initialGrid = createInitialGrid(startNode, endNode);
    setGrid(initialGrid);
  }, [startNode, endNode]);

  const handleMouseDown = (row, col) => {
    if (isFindingPath) return;
    const updatedGrid = toggleWall(grid, row, col);
    setGrid(updatedGrid);
    setIsMousePressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!isMousePressed || isFindingPath) return;
    const updatedGrid = toggleWall(grid, row, col);
    setGrid(updatedGrid);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  const animateBFS = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        // Update the state to reflect the visited node
        setVisitedNodes((prevVisitedNodes) => [...prevVisitedNodes, node]);
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        // Update the state to reflect the shortest path node
        setShortestPathNodes((prevShortestPathNodes) => [
          ...prevShortestPathNodes,
          node,
        ]);
        if (i === nodesInShortestPathOrder.length - 1) {
          setIsFindingPath(false);
        }
      }, 50 * i);
    }
  };

  const visualizeBFS = () => {
    setIsFindingPath(true);
    const start = grid[startNode.row][startNode.col];
    const end = grid[endNode.row][endNode.col];
    const visitedNodesInOrder = bfs(grid, start, end);
    const nodesInShortestPathOrder = getShortestPathNodes(end);
    animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const handleStartNodeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setStartNode((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleEndNodeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setEndNode((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const createInitialGrid = (startNode, endNode) => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row, startNode, endNode));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const createNode = (col, row, startNode, endNode) => ({
    col,
    row,
    isStart: row === startNode.row && col === startNode.col,
    isEnd: row === endNode.row && col === endNode.col,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  });

  const toggleWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-6">
      <div className="flex space-x-4 mb-4 items-center">
        <div className="flex flex-col items-center">
          <label htmlFor="startRow">Source Row</label>
          <input
            type="number"
            id="startRow"
            name="row"
            value={startNode.row}
            onChange={handleStartNodeChange}
            className="px-2 py-1 rounded-lg shadow-md"
            disabled={isFindingPath}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="startCol">Source Column</label>
          <input
            type="number"
            id="startCol"
            name="col"
            value={startNode.col}
            onChange={handleStartNodeChange}
            className="px-2 py-1 rounded-lg shadow-md"
            disabled={isFindingPath}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="endRow">Goal Row</label>
          <input
            type="number"
            id="endRow"
            name="row"
            value={endNode.row}
            onChange={handleEndNodeChange}
            className="px-2 py-1 rounded-lg shadow-md"
            disabled={isFindingPath}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="endCol">Goal Column</label>
          <input
            type="number"
            id="endCol"
            name="col"
            value={endNode.col}
            onChange={handleEndNodeChange}
            className="px-2 py-1 rounded-lg shadow-md"
            disabled={isFindingPath}
          />
        </div>
        <button
          onClick={visualizeBFS}
          className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300"
          disabled={isFindingPath}
        >
          {isFindingPath ? "Finding Path..." : "Visualize BFS"}
        </button>
      </div>
      <div className="grid grid-cols-50 gap-1 p-4 bg-gray-100 rounded-lg shadow-inner border border-gray-300 mx-4">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="flex">
            {row.map((node, nodeIdx) => {
              const { row, col, isEnd, isStart, isWall } = node;
              const isVisited = visitedNodes.some(
                (visitedNode) =>
                  visitedNode.row === row && visitedNode.col === col
              );
              const isShortestPath = shortestPathNodes.some(
                (pathNode) => pathNode.row === row && pathNode.col === col
              );

              return (
                <Cell
                  key={nodeIdx}
                  column={col}
                  isGoal={isEnd}
                  isSource={isStart}
                  isObstacle={isWall}
                  isVisited={isVisited}
                  isShortestPath={isShortestPath}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                  row={row}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BFS;
