import React from 'react';
import './Navbar.css';

const algorithmOptions = [
  { value: 'dijkstra', label: 'Dijkstra' },
  { value: 'astar', label: 'A*' },
  { value: 'weighted-astar', label: 'Weighted A*' },
  { value: 'bfs', label: 'Breadth-First Search' },
  { value: 'dfs', label: 'Depth-First Search' },
  { value: 'greedy', label: 'Greedy Best-First' },
  { value: 'beam-search', label: 'Beam Search' },
  { value: 'bidirectional-bfs', label: 'Bidirectional BFS' },
  { value: 'bidirectional-dijkstra', label: 'Bidirectional Dijkstra' },
  { value: 'bellman-ford', label: 'Bellman-Ford' },
  { value: 'iddfs', label: 'Iterative Deepening DFS' },
];

function Navbar({ visualizeDijkstra, isAnimating, selectedAlgorithm, setSelectedAlgorithm, generateMaze, clearGrid, clearPath, drawingMode, setDrawingMode, activePage, onSetPage, onOpenTutorial, onOpenAbout }) {
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
          <h1>PathForge Route Lab</h1>
          <p>
            An interactive AI pathfinding studio for comparing shortest-path behavior,
            heuristic trade-offs, and search efficiency across real grid scenarios.
          </p>
        </div>
        <div className="header-actions">
          <button
            className={`nav-chip ${activePage === 'visualizer' ? 'active' : ''}`}
            onClick={() => onSetPage('visualizer')}
            type="button"
          >
            Visualizer
          </button>
          <button
            className={`nav-chip ${activePage === 'learning' ? 'active' : ''}`}
            onClick={() => onSetPage('learning')}
            type="button"
          >
            Learning
          </button>
          <button className="about-button" onClick={onOpenAbout} title="About the author">
            About Me
          </button>
          <button className="help-button" onClick={onOpenTutorial} title="Open Tutorial">
            ?
          </button>
        </div>
      </header>
      <div className="control-bar">
        {activePage === 'visualizer' && (
          <>
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
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;