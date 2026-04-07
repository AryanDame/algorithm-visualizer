import { describe, it, expect } from "vitest";
import { breadthFirstSearch } from "./bfs.js";
import { depthFirstSearch } from "./dfs.js";
import { greedyBestFirstSearch } from "./greedyBestFirst.js";
import { bidirectionalBreadthFirstSearch } from "./bidirectionalBfs.js";
import { mazeRecursiveBacktracker } from "./mazeRecursiveBacktracker.js";
import { getNodesInShortestPathOrder } from "./dijkstra.js";

function createMockGrid(rows, cols) {
  const grid = [];

  for (let row = 0; row < rows; row += 1) {
    const currentRow = [];
    for (let col = 0; col < cols; col += 1) {
      currentRow.push({
        row,
        col,
        isStart: false,
        isFinish: false,
        isWall: false,
        isWeight: false,
        weight: 1,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
        fScore: Infinity,
        gScore: Infinity,
        hScore: Infinity,
      });
    }
    grid.push(currentRow);
  }

  return grid;
}

describe("new pathfinding algorithms", () => {
  it("breadth-first search finds the shortest path on an open grid", () => {
    const grid = createMockGrid(3, 3);
    const startNode = grid[0][0];
    const finishNode = grid[2][2];

    const visitedNodes = breadthFirstSearch(grid, startNode, finishNode);
    const path = getNodesInShortestPathOrder(finishNode);

    expect(visitedNodes).toContain(finishNode);
    expect(path).toHaveLength(5);
  });

  it("depth-first search still reaches the finish node", () => {
    const grid = createMockGrid(3, 3);
    const startNode = grid[0][0];
    const finishNode = grid[2][2];

    const visitedNodes = depthFirstSearch(grid, startNode, finishNode);
    const path = getNodesInShortestPathOrder(finishNode);

    expect(visitedNodes).toContain(finishNode);
    expect(path[0]).toBe(startNode);
    expect(path[path.length - 1]).toBe(finishNode);
  });

  it("greedy best-first search reaches the target", () => {
    const grid = createMockGrid(4, 4);
    const startNode = grid[0][0];
    const finishNode = grid[3][3];

    const visitedNodes = greedyBestFirstSearch(grid, startNode, finishNode);
    const path = getNodesInShortestPathOrder(finishNode);

    expect(visitedNodes).toContain(finishNode);
    expect(path[0]).toBe(startNode);
    expect(path[path.length - 1]).toBe(finishNode);
  });

  it("bidirectional breadth-first search reconstructs a valid shortest path", () => {
    const grid = createMockGrid(3, 3);
    const startNode = grid[0][0];
    const finishNode = grid[2][2];

    const visitedNodes = bidirectionalBreadthFirstSearch(
      grid,
      startNode,
      finishNode,
    );
    const path = getNodesInShortestPathOrder(finishNode);

    expect(visitedNodes).toContain(startNode);
    expect(visitedNodes).toContain(finishNode);
    expect(path).toHaveLength(5);
  });
});

describe("mazeRecursiveBacktracker", () => {
  it("carves passages instead of leaving the grid fully blocked", () => {
    const grid = createMockGrid(7, 7);

    mazeRecursiveBacktracker(grid);

    const openCells = grid.flat().filter((node) => !node.isWall);
    const wallCells = grid.flat().filter((node) => node.isWall);

    expect(openCells.length).toBeGreaterThan(1);
    expect(wallCells.length).toBeGreaterThan(0);
  });
});
