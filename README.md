# PathForge Route Lab

PathForge Route Lab is an interactive pathfinding visualizer built with React and Vite. It is designed for learning, comparison, and demonstration of graph search behavior on a dynamic 2D grid.

The application includes weighted and unweighted algorithms, draggable start/finish nodes, maze generation, startup acknowledgement content, and GitHub Pages deployment support.

## Live Deployment

- Production URL: https://aryandame.github.io/algorithm-visualizer/

## Tech Stack

- React 19
- Vite 8
- CSS3 (custom animations and responsive UI)
- Vitest 4
- ESLint 9
- gh-pages

## Implemented Algorithms

### Shortest-path focused

- Dijkstra
- A*
- Weighted A*
- Bellman-Ford
- Bidirectional Dijkstra

### Traversal and heuristic search

- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Iterative Deepening DFS (IDDFS)
- Greedy Best-First Search
- Beam Search
- Bidirectional BFS

### Maze generation

- Recursive backtracking maze generator

## Core Features

- Interactive 50x50 grid
- Draggable start and finish nodes
- Wall drawing mode
- Weighted node drawing mode
- Right-click alternate toggle behavior
- Visualize visited order and shortest path
- Persistent shortest-path highlighting after animation
- Clear Path and Clear Grid controls
- Algorithm-specific auto-loaded scenarios
- Startup acknowledgement modal (removable module)
- About modal with author profile and portrait
- PDF report and GitHub links inside acknowledgement module

## Project Structure

```text
algorithm-visualizer/
  public/
    Aryan_Dame_Project_Report_Copilot.pdf
    aryan-professional-photo.png
    favicon.svg
    hero.png
  src/
    algorithms/
      astar.js
      beamSearch.js
      bellmanFord.js
      bfs.js
      bidirectionalBfs.js
      bidirectionalDijkstra.js
      dfs.js
      dijkstra.js
      graphHelpers.js
      greedyBestFirst.js
      iddfs.js
      mazeRecursiveBacktracker.js
      weightedAstar.js
      searchAlgorithms.test.js
    components/
      AboutModal.jsx
      Grid.jsx
      LearningPage.jsx
      Navbar.jsx
      Node.jsx
      ProjectAcknowledgementModule.jsx
      StartupAcknowledgementModal.jsx
      TutorialModal.jsx
    hooks/
      useGridState.jsx
    App.jsx
    App.css
    main.jsx
  index.html
  package.json
  vite.config.js
  README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Run tests

```bash
npm run test -- --run
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Deployment (GitHub Pages)

This project is configured for GitHub Pages with:

- `base: "/algorithm-visualizer/"` in Vite config
- `gh-pages` deployment scripts in package.json

Deploy command:

```bash
npm run deploy
```

## How To Use

1. Open the app.
2. Review the startup acknowledgement and continue.
3. Select an algorithm from the dropdown.
4. Modify the board using walls/weights and drag start or finish nodes.
5. Click Visualize.
6. Compare behavior across algorithms by switching options and rerunning.

## Notes on Assets

- Author portrait file expected at `public/aryan-professional-photo.png`
- Report file expected at `public/Aryan_Dame_Project_Report_Copilot.pdf`
- Paths are base-aware for GitHub Pages deployment

## Quality Status

- Unit tests passing
- Production build passing
- Deployed to `main` branch workflow via `gh-pages`

## Acknowledgement

This project includes a dedicated startup acknowledgement module for the Artificial Business Intelligence subject context and can be removed later without affecting the core visualizer.
