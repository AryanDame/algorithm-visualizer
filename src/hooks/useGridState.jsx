import { useState, useEffect, useRef } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import { breadthFirstSearch } from "../algorithms/bfs";
import { depthFirstSearch } from "../algorithms/dfs";
import { greedyBestFirstSearch } from "../algorithms/greedyBestFirst";
import { bidirectionalBreadthFirstSearch } from "../algorithms/bidirectionalBfs";
import { bidirectionalDijkstra } from "../algorithms/bidirectionalDijkstra";
import { bellmanFord } from "../algorithms/bellmanFord";
import { beamSearch } from "../algorithms/beamSearch";
import { iterativeDeepeningDfs } from "../algorithms/iddfs";
import { mazeRecursiveBacktracker } from "../algorithms/mazeRecursiveBacktracker";
import { weightedAstar } from "../algorithms/weightedAstar";

export const useGridState = (props) => {
  const {
    selectedAlgorithm,
    drawingMode,
    setIsAnimating,
    setGenerateMaze,
    setClearGrid,
    setClearPath,
    setVisualizeDijkstra,
  } = props;

  // State variables
  const [startNodePos, setStartNodePos] = useState({ row: 10, col: 10 });
  const [finishNodePos, setFinishNodePos] = useState({ row: 10, col: 40 });
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [draggingNode, setDraggingNode] = useState(null);
  const [isAnimatingLocal, setIsAnimatingLocal] = useState(false);
  const [isVisualized, setIsVisualized] = useState(false);

  // Grid initialization function
  const getInitialGrid = (startPos, finishPos) => {
    return Array.from({ length: 50 }, (_, row) =>
      Array.from({ length: 50 }, (_, col) => ({
        row,
        col,
        isStart: row === startPos.row && col === startPos.col,
        isFinish: row === finishPos.row && col === finishPos.col,
        isWall: false,
        isWeight: false,
        weight: 1,
        distance: Infinity,
      })),
    );
  };

  const [grid, setGrid] = useState(() =>
    getInitialGrid(startNodePos, finishNodePos),
  );

  const placeWalls = (scenarioGrid, walls) => {
    walls.forEach(([row, col]) => {
      if (!scenarioGrid[row]?.[col]) return;
      if (scenarioGrid[row][col].isStart || scenarioGrid[row][col].isFinish) {
        return;
      }
      scenarioGrid[row][col] = {
        ...scenarioGrid[row][col],
        isWall: true,
      };
    });
  };

  const placeWeights = (scenarioGrid, weights) => {
    weights.forEach(([row, col, weight = 15]) => {
      if (!scenarioGrid[row]?.[col]) return;
      if (scenarioGrid[row][col].isStart || scenarioGrid[row][col].isFinish) {
        return;
      }
      scenarioGrid[row][col] = {
        ...scenarioGrid[row][col],
        isWeight: true,
        weight,
      };
    });
  };

  const getAlgorithmScenario = (algorithmName) => {
    switch (algorithmName) {
      case "dijkstra": {
        const start = { row: 24, col: 4 };
        const finish = { row: 24, col: 45 };
        const weights = [];
        for (let col = 8; col <= 40; col += 1) {
          weights.push([24, col, 30]);
        }
        return { start, finish, walls: [], weights };
      }
      case "astar": {
        const start = { row: 44, col: 4 };
        const finish = { row: 6, col: 46 };
        const walls = [];
        for (let row = 5; row <= 44; row += 1) {
          if (row === 22) continue;
          walls.push([row, 24]);
        }
        return { start, finish, walls, weights: [] };
      }
      case "weighted-astar": {
        const start = { row: 43, col: 5 };
        const finish = { row: 6, col: 44 };
        const walls = [];
        for (let row = 6; row <= 43; row += 1) {
          if (row !== 18 && row !== 33) {
            walls.push([row, 25]);
          }
        }
        const weights = [];
        for (let col = 7; col <= 42; col += 1) {
          weights.push([26, col, 22]);
        }
        return { start, finish, walls, weights };
      }
      case "bfs": {
        const start = { row: 8, col: 5 };
        const finish = { row: 40, col: 40 };
        const walls = [];
        for (let row = 8; row <= 40; row += 1) {
          if (row === 20) continue;
          walls.push([row, 20]);
        }
        for (let col = 12; col <= 40; col += 1) {
          if (col === 32) continue;
          walls.push([28, col]);
        }
        return { start, finish, walls, weights: [] };
      }
      case "dfs": {
        const start = { row: 40, col: 6 };
        const finish = { row: 8, col: 44 };
        const walls = [];
        for (let row = 6; row <= 42; row += 1) {
          if (row !== 36) walls.push([row, 12]);
          if (row !== 12) walls.push([row, 24]);
          if (row !== 30) walls.push([row, 36]);
        }
        return { start, finish, walls, weights: [] };
      }
      case "greedy": {
        const start = { row: 38, col: 8 };
        const finish = { row: 12, col: 42 };
        const walls = [];
        for (let col = 10; col <= 42; col += 1) {
          if (col !== 18) walls.push([16, col]);
        }
        for (let row = 16; row <= 38; row += 1) {
          if (row !== 30) walls.push([18, row <= 26 ? 18 : 30]);
        }
        for (let row = 18; row <= 38; row += 1) {
          if (row !== 34) walls.push([row, 30]);
        }
        const weights = [
          [34, 30, 20],
          [33, 30, 20],
          [32, 30, 20],
          [31, 30, 20],
        ];
        return { start, finish, walls, weights };
      }
      case "beam-search": {
        const start = { row: 41, col: 4 };
        const finish = { row: 8, col: 45 };
        const walls = [];
        for (let row = 8; row <= 42; row += 1) {
          if (row !== 15) walls.push([row, 14]);
          if (row !== 36) walls.push([row, 24]);
          if (row !== 20) walls.push([row, 34]);
        }
        return { start, finish, walls, weights: [] };
      }
      case "bidirectional-bfs": {
        const start = { row: 24, col: 2 };
        const finish = { row: 24, col: 47 };
        const walls = [];
        for (let row = 8; row <= 40; row += 1) {
          if (row === 24) continue;
          walls.push([row, 16]);
          walls.push([row, 32]);
        }
        return { start, finish, walls, weights: [] };
      }
      case "bidirectional-dijkstra": {
        const start = { row: 24, col: 3 };
        const finish = { row: 24, col: 46 };
        const walls = [];
        for (let row = 7; row <= 41; row += 1) {
          if (row !== 18 && row !== 30) {
            walls.push([row, 18]);
            walls.push([row, 31]);
          }
        }
        const weights = [];
        for (let col = 4; col <= 45; col += 1) {
          if (col < 17 || col > 32) {
            weights.push([24, col, 10]);
          }
        }
        return { start, finish, walls, weights };
      }
      case "bellman-ford": {
        const start = { row: 30, col: 5 };
        const finish = { row: 14, col: 45 };
        const walls = [];
        for (let col = 9; col <= 44; col += 1) {
          if (col !== 33) {
            walls.push([22, col]);
          }
        }
        const weights = [];
        for (let row = 14; row <= 30; row += 1) {
          weights.push([row, 20, 25]);
          weights.push([row, 21, 25]);
        }
        return { start, finish, walls, weights };
      }
      case "iddfs": {
        const start = { row: 42, col: 4 };
        const finish = { row: 6, col: 45 };
        const walls = [];
        for (let row = 6; row <= 42; row += 1) {
          if (row !== 40) walls.push([row, 10]);
          if (row !== 9) walls.push([row, 20]);
          if (row !== 33) walls.push([row, 30]);
          if (row !== 15) walls.push([row, 40]);
        }
        return { start, finish, walls, weights: [] };
      }
      default:
        return {
          start: { row: 10, col: 10 },
          finish: { row: 10, col: 40 },
          walls: [],
          weights: [],
        };
    }
  };

  const buildGridWithSpecialNodes = (
    sourceGrid,
    nextStartPos,
    nextFinishPos,
    resetTerrain = false,
  ) => {
    return sourceGrid.map((row) =>
      row.map((node) => {
        const nextNode = {
          ...node,
          distance: Infinity,
          isVisited: false,
          previousNode: null,
          fScore: Infinity,
          gScore: Infinity,
          hScore: Infinity,
        };

        if (resetTerrain) {
          nextNode.isWall = false;
          nextNode.isWeight = false;
          nextNode.weight = 1;
        }

        nextNode.isStart =
          node.row === nextStartPos.row && node.col === nextStartPos.col;
        nextNode.isFinish =
          node.row === nextFinishPos.row && node.col === nextFinishPos.col;

        return nextNode;
      }),
    );
  };

  // Ref to track all active timeouts for cleanup
  const timeoutIdsRef = useRef([]);

  // Sync parent isAnimating prop
  const handleSetIsAnimating = (value) => {
    setIsAnimatingLocal(value);
    setIsAnimating(value);
  };

  // Clear all pending timeouts
  const clearAllTimeouts = () => {
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];
  };

  // Algorithm runner
  const runAlgorithm = (algoName, grid, startNode, finishNode) => {
    switch (algoName) {
      case "dijkstra":
        return dijkstra(grid, startNode, finishNode);
      case "astar":
        return astar(grid, startNode, finishNode);
      case "weighted-astar":
        return weightedAstar(grid, startNode, finishNode);
      case "bfs":
        return breadthFirstSearch(grid, startNode, finishNode);
      case "dfs":
        return depthFirstSearch(grid, startNode, finishNode);
      case "greedy":
        return greedyBestFirstSearch(grid, startNode, finishNode);
      case "beam-search":
        return beamSearch(grid, startNode, finishNode);
      case "bidirectional-bfs":
        return bidirectionalBreadthFirstSearch(grid, startNode, finishNode);
      case "bidirectional-dijkstra":
        return bidirectionalDijkstra(grid, startNode, finishNode);
      case "bellman-ford":
        return bellmanFord(grid, startNode, finishNode);
      case "iddfs":
        return iterativeDeepeningDfs(grid, startNode, finishNode);
      default:
        throw new Error(`Unknown algorithm: ${algoName}`);
    }
  };

  // Grid mutation helpers
  const toggleNodeProperty = (gridState, row, col, mode) => {
    const target = gridState[row]?.[col];
    if (!target || target.isStart || target.isFinish) {
      return gridState;
    }

    const nextGrid = [...gridState];
    const nextRow = [...nextGrid[row]];
    nextGrid[row] = nextRow;

    if (mode === "wall") {
      nextRow[col] = {
        ...target,
        isWall: !target.isWall,
        isWeight: false,
        weight: 1,
      };
      return nextGrid;
    }

    nextRow[col] = {
      ...target,
      isWeight: !target.isWeight,
      weight: !target.isWeight ? 15 : 1,
      isWall: false,
    };
    return nextGrid;
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    return toggleNodeProperty(grid, row, col, "wall");
  };

  const getNewGridWithWeightToggled = (grid, row, col) => {
    return toggleNodeProperty(grid, row, col, "weight");
  };

  // DOM manipulation helpers
  const clearPathVisuals = () => {
    const visitedNodes = document.querySelectorAll(".node-visited");
    visitedNodes.forEach((node) => node.classList.remove("node-visited"));
    const pathNodes = document.querySelectorAll(".node-shortest-path");
    pathNodes.forEach((node) => node.classList.remove("node-shortest-path"));
  };

  const drawPathInstantly = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    visitedNodesInOrder.forEach((node) => {
      const nodeElement = document.getElementById(
        `node-${node.row}-${node.col}`,
      );
      if (
        nodeElement &&
        !nodeElement.classList.contains("start") &&
        !nodeElement.classList.contains("finish")
      ) {
        nodeElement.classList.add("node-visited");
      }
    });

    nodesInShortestPathOrder.forEach((node) => {
      const nodeElement = document.getElementById(
        `node-${node.row}-${node.col}`,
      );
      if (
        nodeElement &&
        !nodeElement.classList.contains("start") &&
        !nodeElement.classList.contains("finish")
      ) {
        nodeElement.classList.add("node-shortest-path");
      }
    });
  };

  // Mouse event handlers
  const handleMouseDown = (row, col) => {
    if (isAnimatingLocal) return;
    if (row === startNodePos.row && col === startNodePos.col) {
      setDraggingNode("start");
      setMouseIsPressed(true);
      return;
    }
    if (row === finishNodePos.row && col === finishNodePos.col) {
      setDraggingNode("finish");
      setMouseIsPressed(true);
      return;
    }

    if (
      (row === startNodePos.row && col === startNodePos.col) ||
      (row === finishNodePos.row && col === finishNodePos.col)
    ) {
      return;
    }

    setMouseIsPressed(true);
    const toggleFunction =
      drawingMode === "wall"
        ? getNewGridWithWallToggled
        : getNewGridWithWeightToggled;
    setGrid((prevGrid) => toggleFunction(prevGrid, row, col));
  };

  const handleMouseEnter = (row, col) => {
    if (isAnimatingLocal || !mouseIsPressed) return;

    if (draggingNode === "start") {
      const targetNode = grid[row][col];
      if (
        targetNode.isWall ||
        targetNode.isWeight ||
        (row === finishNodePos.row && col === finishNodePos.col)
      ) {
        return;
      }
      const updatedGrid = buildGridWithSpecialNodes(
        grid,
        { row, col },
        finishNodePos,
      );
      setGrid(updatedGrid);
      setStartNodePos({ row, col });

      if (isVisualized) {
        clearPathVisuals();
        const newStartNode = updatedGrid[row][col];
        const newFinishNode = updatedGrid[finishNodePos.row][finishNodePos.col];
        const visitedNodesInOrder = runAlgorithm(
          selectedAlgorithm,
          updatedGrid,
          newStartNode,
          newFinishNode,
        );
        const nodesInShortestPathOrder = newFinishNode.previousNode
          ? getNodesInShortestPathOrder(newFinishNode)
          : [];
        drawPathInstantly(visitedNodesInOrder, nodesInShortestPathOrder);
      }
      return;
    }

    if (draggingNode === "finish") {
      const targetNode = grid[row][col];
      if (
        targetNode.isWall ||
        targetNode.isWeight ||
        (row === startNodePos.row && col === startNodePos.col)
      ) {
        return;
      }
      const updatedGrid = buildGridWithSpecialNodes(
        grid,
        startNodePos,
        { row, col },
      );
      setGrid(updatedGrid);
      setFinishNodePos({ row, col });

      if (isVisualized) {
        clearPathVisuals();
        const newStartNode = updatedGrid[startNodePos.row][startNodePos.col];
        const newFinishNode = updatedGrid[row][col];
        const visitedNodesInOrder = runAlgorithm(
          selectedAlgorithm,
          updatedGrid,
          newStartNode,
          newFinishNode,
        );
        const nodesInShortestPathOrder = newFinishNode.previousNode
          ? getNodesInShortestPathOrder(newFinishNode)
          : [];
        drawPathInstantly(visitedNodesInOrder, nodesInShortestPathOrder);
      }
      return;
    }

    if (
      (row === startNodePos.row && col === startNodePos.col) ||
      (row === finishNodePos.row && col === finishNodePos.col)
    ) {
      return;
    }

    const toggleFunction =
      drawingMode === "wall"
        ? getNewGridWithWallToggled
        : getNewGridWithWeightToggled;
    setGrid((prevGrid) => toggleFunction(prevGrid, row, col));
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setDraggingNode(null);
  };

  const handleRightClick = (row, col, e) => {
    e.preventDefault();
    if (isAnimatingLocal || draggingNode) return;
    if (
      (row === startNodePos.row && col === startNodePos.col) ||
      (row === finishNodePos.row && col === finishNodePos.col)
    ) {
      return;
    }
    const toggleFunction =
      drawingMode === "wall"
        ? getNewGridWithWeightToggled
        : getNewGridWithWallToggled;
    setGrid((prevGrid) => toggleFunction(prevGrid, row, col));
  };

  // Animation functions
  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const timeoutId = setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`,
        );
        if (
          nodeElement &&
          !nodeElement.classList.contains("start") &&
          !nodeElement.classList.contains("finish")
        ) {
          nodeElement.classList.remove("node-visited");
          nodeElement.classList.add("node-shortest-path");
        }
      }, i * 50);
      timeoutIdsRef.current.push(timeoutId);
    }
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    handleSetIsAnimating(true);

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const timeoutId = setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`,
        );
        if (
          nodeElement &&
          !nodeElement.classList.contains("start") &&
          !nodeElement.classList.contains("finish")
        ) {
          nodeElement.classList.add("node-visited");
        }
      }, i * 10);
      timeoutIdsRef.current.push(timeoutId);
    }

    const visitedAnimationTime = visitedNodesInOrder.length * 10;
    const timeoutId1 = setTimeout(() => {
      animateShortestPath(nodesInShortestPathOrder);
    }, visitedAnimationTime);
    timeoutIdsRef.current.push(timeoutId1);

    const totalAnimationTime =
      visitedAnimationTime + nodesInShortestPathOrder.length * 50;
    const timeoutId2 = setTimeout(() => {
      handleSetIsAnimating(false);
      setIsVisualized(true);
    }, totalAnimationTime);
    timeoutIdsRef.current.push(timeoutId2);
  };

  // Algorithm visualization
  const visualizeDijkstra = () => {
    clearAllTimeouts();
    clearPathVisuals();

    const searchGrid = buildGridWithSpecialNodes(
      grid,
      startNodePos,
      finishNodePos,
    );
    const startNode = searchGrid[startNodePos.row][startNodePos.col];
    const finishNode = searchGrid[finishNodePos.row][finishNodePos.col];
    const visitedNodesInOrder = runAlgorithm(
      selectedAlgorithm,
      searchGrid,
      startNode,
      finishNode,
    );
    const nodesInShortestPathOrder = finishNode.previousNode
      ? getNodesInShortestPathOrder(finishNode)
      : [];
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  // Grid manipulation
  const generateMaze = () => {
    if (draggingNode) return;
    clearAllTimeouts();
    clearPathVisuals();
    setIsVisualized(false);
    setIsAnimatingLocal(false);
    setIsAnimating(false);

    const newGrid = buildGridWithSpecialNodes(
      grid,
      startNodePos,
      finishNodePos,
      true,
    );

    // Run maze generation
    mazeRecursiveBacktracker(newGrid);
    
    // Ensure start and finish nodes are not walls
    newGrid[startNodePos.row][startNodePos.col] = {
      ...newGrid[startNodePos.row][startNodePos.col],
      isWall: false,
      isStart: true,
      isWeight: false,
    };
    newGrid[finishNodePos.row][finishNodePos.col] = {
      ...newGrid[finishNodePos.row][finishNodePos.col],
      isWall: false,
      isFinish: true,
      isWeight: false,
    };
    
    setGrid(newGrid);
  };

  const clearGrid = () => {
    clearAllTimeouts();
    clearPathVisuals();
    setIsVisualized(false);
    setGrid(
      buildGridWithSpecialNodes(grid, startNodePos, finishNodePos, true),
    );
  };

  const clearPath = () => {
    clearAllTimeouts();
    setIsVisualized(false);
    setGrid(buildGridWithSpecialNodes(grid, startNodePos, finishNodePos));
    clearPathVisuals();
  };

  const loadAlgorithmExample = (algorithmName = selectedAlgorithm) => {
    if (draggingNode || isAnimatingLocal) return;

    clearAllTimeouts();
    clearPathVisuals();
    setIsVisualized(false);
    setIsAnimatingLocal(false);
    setIsAnimating(false);

    const scenario = getAlgorithmScenario(algorithmName);
    const scenarioGrid = getInitialGrid(scenario.start, scenario.finish);
    placeWalls(scenarioGrid, scenario.walls);
    placeWeights(scenarioGrid, scenario.weights);

    setStartNodePos(scenario.start);
    setFinishNodePos(scenario.finish);
    setGrid(scenarioGrid);
  };

  useEffect(() => {
    setVisualizeDijkstra(() => visualizeDijkstra);
  }, [grid, setVisualizeDijkstra, startNodePos, finishNodePos]);

  useEffect(() => {
    setGenerateMaze(() => generateMaze);
  }, [setGenerateMaze, grid, startNodePos, finishNodePos, draggingNode]);

  useEffect(() => {
    setClearGrid(() => clearGrid);
  }, [setClearGrid]);

  useEffect(() => {
    setClearPath(() => clearPath);
  }, [setClearPath]);

  useEffect(() => {
    if (draggingNode || isAnimatingLocal) {
      return;
    }

    loadAlgorithmExample(selectedAlgorithm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAlgorithm]);

  // Cleanup: Clear all timeouts when component unmounts
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  // Return all state and handlers
  return {
    grid,
    startNodePos,
    finishNodePos,
    isAnimatingLocal,
    isVisualized,
    mouseIsPressed,
    draggingNode,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleRightClick,
  };
};
