import React from "react";

function Cell({
  column,
  isGoal,
  isSource,
  isObstacle,
  isVisited,
  isShortestPath,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  row,
}) {
  const baseClassName = "w-8 h-8 border inline-block shadow-lg z-10";
  const extraClassName = isGoal
    ? "bg-green-500 rounded-full border-green-700 shadow-lg z-10"
    : isSource
    ? "bg-blue-500 border-slate-700"
    : isObstacle
    ? "bg-gray-700"
    : "bg-white";

  return (
    <div
      id={`cell-${row}-${column}`}
      className={`${baseClassName} ${extraClassName} ${
        isVisited ? "node-visited" : ""
      } ${isShortestPath ? "node-shortest-path" : ""}`}
      onMouseDown={() => onMouseDown(row, column)}
      onMouseEnter={() => onMouseEnter(row, column)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
}

export default Cell;
