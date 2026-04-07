import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Grid from './components/Grid';
import TutorialModal from './components/TutorialModal';
import AboutModal from './components/AboutModal';
import LearningPage from './components/LearningPage';
import StartupAcknowledgementModal from './components/StartupAcknowledgementModal';

function App() {
  const [visualizeDijkstra, setVisualizeDijkstra] = useState(() => () => {});
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra');
  const [generateMaze, setGenerateMaze] = useState(() => () => {});
  const [clearGrid, setClearGrid] = useState(() => () => {});
  const [clearPath, setClearPath] = useState(() => () => {});
  const [drawingMode, setDrawingMode] = useState('wall');
  const [showTutorial, setShowTutorial] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showAcknowledgement, setShowAcknowledgement] = useState(true);
  const [activePage, setActivePage] = useState('visualizer');

  return (
    <div className="app">
      <StartupAcknowledgementModal
        isOpen={showAcknowledgement}
        onClose={() => setShowAcknowledgement(false)}
      />
      <TutorialModal isOpen={showTutorial} onClose={() => setShowTutorial(false)} />
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      <div className="orb orb-one" aria-hidden="true" />
      <div className="orb orb-two" aria-hidden="true" />
      <div className="orb orb-three" aria-hidden="true" />
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
        activePage={activePage}
        onSetPage={setActivePage}
        onOpenTutorial={() => setShowTutorial(true)}
        onOpenAbout={() => setShowAbout(true)}
      />
      <main className="main-body">
        {activePage === 'learning' ? (
          <LearningPage />
        ) : (
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
        )}
      </main>
    </div>
  );
}

export default App;