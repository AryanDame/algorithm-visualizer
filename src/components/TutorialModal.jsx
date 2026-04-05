import React from 'react';
import './TutorialModal.css';

function TutorialModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-modal">
        <h1 className="tutorial-title">Welcome to Algorithm Visualizer</h1>
        <p className="tutorial-text">
          <strong>Drag Start & Finish Nodes:</strong> Click and drag the green (Start) and red (Finish) nodes to any empty cell on the grid to set your pathfinding endpoints.
        </p>
        <p className="tutorial-text">
          <strong>Draw Walls & Weights:</strong> Use the 'Draw Walls' mode to create obstacles, or switch to 'Draw Weights' mode to add weighted nodes (cost 15). Press 'Visualize' to find the shortest path!
        </p>
        <p className="tutorial-text">
          <strong>Generate Maze:</strong> Create a random maze and find paths through it. Choose Dijkstra or A* algorithm to see how they compare.
        </p>
        <button className="tutorial-button" onClick={onClose}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default TutorialModal;
