import React from 'react';
import './Navbar.css';

const algorithmOptions = [
  { value: 'dijkstra', label: 'Dijkstra' },
  { value: 'astar', label: 'A*' },
  { value: 'bfs', label: 'Breadth-First Search' },
  { value: 'dfs', label: 'Depth-First Search' },
  { value: 'greedy', label: 'Greedy Best-First' },
  { value: 'bidirectional-bfs', label: 'Bidirectional BFS' },
];

function Navbar({ visualizeDijkstra, isAnimating, selectedAlgorithm, setSelectedAlgorithm, generateMaze, clearGrid, clearPath, drawingMode, setDrawingMode, onOpenTutorial }) {
  const handleVisualize = () => {
    if (visualizeDijkstra && !isAnimating) {
      visualizeDijkstra();
    }
  };

  const handleAlgorithmChange = (e) => {
    setSelectedAlgorithm(e.target.value);
  };

  return (
    <>
      <header className="header">
        <div className="header-copy">
          <h1>Algorithm Visualizer</h1>
          <p>Compare search strategies, generate mazes, and explore pathfinding interactively.</p>
        </div>
        <button className="help-button" onClick={onOpenTutorial} title="Open Tutorial">
          ?
        </button>
      </header>
      <div className="control-bar">
        <select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
          {algorithmOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button onClick={handleVisualize} disabled={isAnimating}>Visualize</button>
        <button onClick={generateMaze} disabled={isAnimating}>Generate Maze</button>
        <button onClick={() => setDrawingMode(drawingMode === 'wall' ? 'weight' : 'wall')} className={drawingMode}>
          {drawingMode === 'wall' ? 'Draw Weights' : 'Draw Walls'}
        </button>
        <button onClick={clearGrid} disabled={isAnimating}>Clear Grid</button>
        <button onClick={clearPath} disabled={isAnimating}>Clear Path</button>
      </div>
    </>
  );
}

export default Navbar;