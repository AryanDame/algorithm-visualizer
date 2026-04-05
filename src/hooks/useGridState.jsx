import { useState, useEffect, useRef } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import { mazeRecursiveBacktracker } from "../algorithms/mazeRecursiveBacktracker";

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
      default:
        throw new Error(`Unknown algorithm: ${algoName}`);
    }
  };

  // Grid mutation helpers
  const getNewGridWithWallToggled = (grid, row, col) => {
    return grid.map((r) =>
      r.map((node) =>
        node.row === row && node.col === col
          ? { ...node, isWall: !node.isWall }
          : node,
      ),
    );
  };

  const getNewGridWithWeightToggled = (grid, row, col) => {
    return grid.map((r) =>
      r.map((node) =>
        node.row === row && node.col === col
          ? {
              ...node,
              isWeight: !node.isWeight,
              weight: !node.isWeight ? 15 : 1,
            }
          : node,
      ),
    );
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
      setStartNodePos({ row, col });

      if (isVisualized) {
        clearPathVisuals();
        const newStartNode = grid[row][col];
        const newFinishNode = grid[finishNodePos.row][finishNodePos.col];
        const visitedNodesInOrder = runAlgorithm(
          selectedAlgorithm,
          grid,
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
      setFinishNodePos({ row, col });

      if (isVisualized) {
        clearPathVisuals();
        const newStartNode = grid[startNodePos.row][startNodePos.col];
        const newFinishNode = grid[row][col];
        const visitedNodesInOrder = runAlgorithm(
          selectedAlgorithm,
          grid,
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
        if (nodeElement) {
          nodeElement.className = "node node-shortest-path";
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
        if (nodeElement) {
          nodeElement.className = "node node-visited";
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
    const startNode = grid[startNodePos.row][startNodePos.col];
    const finishNode = grid[finishNodePos.row][finishNodePos.col];
    const visitedNodesInOrder = runAlgorithm(
      selectedAlgorithm,
      grid,
      startNode,
      finishNode,
    );
    const nodesInShortestPathOrder = finishNode.previousNode
      ? getNodesInShortestPathOrder(finishNode)
      : [];
    console.log(visitedNodesInOrder);
    console.log("Shortest path:", nodesInShortestPathOrder);
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
    
    const newGrid = grid.map((row) =>
      row.map((node) => ({
        ...node,
        isWall: false,
        isWeight: false,
        weight: 1,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
      }))
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
    setIsVisualized(false);
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((node) => ({
          ...node,
          isWall: false,
          isWeight: false,
          weight: 1,
          distance: Infinity,
          isVisited: false,
          previousNode: null,
        })),
      ),
    );
  };

  const clearPath = () => {
    clearAllTimeouts();
    setIsVisualized(false);
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((node) => ({
          ...node,
          distance: Infinity,
          isVisited: false,
          previousNode: null,
        })),
      ),
    );
    clearPathVisuals();
  };

  // Effects to sync with parent component callbacks
  useEffect(() => {
    setGrid(getInitialGrid(startNodePos, finishNodePos));
  }, [startNodePos, finishNodePos]);

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
