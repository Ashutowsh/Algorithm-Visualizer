import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import {
  dijkstra,
  getShortestPathNodes,
} from "../Algorithms/Djikstra/algorithm";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const END_NODE_ROW = 10;
const END_NODE_COL = 38;

const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [shortestPathNodes, setShortestPathNodes] = useState([]);

  useEffect(() => {
    const initialGrid = createInitialGrid();
    setGrid(initialGrid);
  }, []);

  const handleMouseDown = (row, col) => {
    const updatedGrid = toggleWall(grid, row, col);
    setGrid(updatedGrid);
    setIsMousePressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!isMousePressed) return;
    const updatedGrid = toggleWall(grid, row, col);
    setGrid(updatedGrid);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
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
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    // console.log("Start Node : ", startNode);
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    // console.log("End Node : ", endNode);
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    // console.log("visitedNodesInOrder : ", visitedNodesInOrder);
    const nodesInShortestPathOrder = getShortestPathNodes(endNode);
    // console.log("nodesInShortestPathOrder : ", nodesInShortestPathOrder);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={visualizeDijkstra}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Visualize Dijkstra's Algorithm
      </button>
      <div className="grid grid-cols-50 gap-px">
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

const createInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => ({
  col,
  row,
  isStart: row === START_NODE_ROW && col === START_NODE_COL,
  isEnd: row === END_NODE_ROW && col === END_NODE_COL,
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

export default Grid;
