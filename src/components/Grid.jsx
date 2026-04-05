import React from 'react';
import './Grid.css';
import Node from './Node';
import { useGridState } from '../hooks/useGridState';

function Grid({ setVisualizeDijkstra, setIsAnimating, selectedAlgorithm, setGenerateMaze, drawingMode, setDrawingMode, setClearGrid, setClearPath }) {
  // Extract all state and handlers from the custom hook
  const {
    grid,
    isAnimatingLocal,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleRightClick,
  } = useGridState({
    selectedAlgorithm,
    drawingMode,
    setIsAnimating,
    setGenerateMaze,
    setClearGrid,
    setClearPath,
    setVisualizeDijkstra,
  });

  return (
    <div className="grid" style={{ pointerEvents: isAnimatingLocal ? 'none' : 'auto' }}>
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="grid-row">
          {row.map((node, nodeIdx) => (
            <Node
              key={nodeIdx}
              node={node}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              onMouseUp={handleMouseUp}
              onContextMenu={handleRightClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;