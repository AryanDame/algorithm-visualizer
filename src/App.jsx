import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Grid from './components/Grid';
import TutorialModal from './components/TutorialModal';

function App() {
  const [visualizeDijkstra, setVisualizeDijkstra] = useState(() => () => {});
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra');
  const [generateMaze, setGenerateMaze] = useState(() => () => {});
  const [clearGrid, setClearGrid] = useState(() => () => {});
  const [clearPath, setClearPath] = useState(() => () => {});
  const [drawingMode, setDrawingMode] = useState('wall');
  const [showTutorial, setShowTutorial] = useState(true);

  return (
    <div className="app">
      <TutorialModal isOpen={showTutorial} onClose={() => setShowTutorial(false)} />
      <Navbar 
        visualizeDijkstra={visualizeDijkstra} 
        isAnimating={isAnimating}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
        generateMaze={generateMaze}
        clearGrid={clearGrid}
        clearPath={clearPath}
        drawingMode={drawingMode}
        setDrawingMode={setDrawingMode}
        onOpenTutorial={() => setShowTutorial(true)}
      />
      <main className="main-body">
        <Grid 
          setVisualizeDijkstra={setVisualizeDijkstra} 
          setIsAnimating={setIsAnimating}
          selectedAlgorithm={selectedAlgorithm}
          setGenerateMaze={setGenerateMaze}
          setClearGrid={setClearGrid}
          setClearPath={setClearPath}
          drawingMode={drawingMode}
          setDrawingMode={setDrawingMode}
        />
      </main>
    </div>
  );
}

export default App;