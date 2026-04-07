import React from 'react';
import './TutorialModal.css';

function TutorialModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-modal">
        <h1 className="tutorial-title">Quick Help Guide</h1>
        <p className="tutorial-text">
          <strong>1) Pick an algorithm:</strong> Use the dropdown, then click <strong>Visualize</strong>. The grid auto-loads a scenario tailored to that algorithm so comparisons are easier.
        </p>
        <p className="tutorial-text">
          <strong>2) Edit the map:</strong> Drag the green start and red finish nodes. Use <strong>Draw Walls</strong> for obstacles or <strong>Draw Weights</strong> for expensive terrain.
        </p>
        <p className="tutorial-text">
          <strong>3) Reset controls:</strong> <strong>Clear Path</strong> keeps your walls and weights, while <strong>Clear Grid</strong> resets terrain. <strong>Generate Maze</strong> creates a random maze while preserving start/finish.
        </p>
        <p className="tutorial-text">
          <strong>How to interpret results:</strong> Dijkstra and A* are optimal with non-negative weights. BFS is optimal only for unweighted movement. Greedy and DFS can be faster visually but may return longer paths.
        </p>
        <button className="tutorial-button" onClick={onClose}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default TutorialModal;
