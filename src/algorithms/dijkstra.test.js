import { describe, it, expect } from "vitest";
import {
  getAllNodes,
  sortNodesByDistance,
  dijkstra,
  getNodesInShortestPathOrder,
} from "./dijkstra.js";

// Helper function to create a mock grid
function createMockGrid(rows, cols) {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push({
        row: i,
        col: j,
        isStart: false,
        isFinish: false,
        isWall: false,
        isWeight: false,
        weight: 1,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
      });
    }
    grid.push(row);
  }
  return grid;
}

describe("getAllNodes", () => {
  it("should flatten a 2x2 grid into a 1D array of 4 nodes", () => {
    const grid = createMockGrid(2, 2);
    const nodes = getAllNodes(grid);
    expect(nodes).toHaveLength(4);
    expect(nodes[0]).toEqual(grid[0][0]);
    expect(nodes[3]).toEqual(grid[1][1]);
  });

  it("should flatten a 3x3 grid into a 1D array of 9 nodes", () => {
    const grid = createMockGrid(3, 3);
    const nodes = getAllNodes(grid);
    expect(nodes).toHaveLength(9);
    expect(nodes[0]).toEqual(grid[0][0]);
    expect(nodes[8]).toEqual(grid[2][2]);
  });

  it("should handle an empty grid", () => {
    const grid = [];
    const nodes = getAllNodes(grid);
    expect(nodes).toHaveLength(0);
  });

  it("should handle a grid with empty rows", () => {
    const grid = [[]];
    const nodes = getAllNodes(grid);
    expect(nodes).toHaveLength(0);
  });
});

describe("sortNodesByDistance", () => {
  it("should sort nodes by distance in ascending order", () => {
    const nodes = [
      { distance: 5 },
      { distance: 1 },
      { distance: 3 },
      { distance: 2 },
    ];
    sortNodesByDistance(nodes);
    expect(nodes).toEqual([
      { distance: 1 },
      { distance: 2 },
      { distance: 3 },
      { distance: 5 },
    ]);
  });

  it("should handle nodes with Infinity distance", () => {
    const nodes = [{ distance: Infinity }, { distance: 1 }, { distance: 2 }];
    sortNodesByDistance(nodes);
    expect(nodes[0].distance).toBe(1);
    expect(nodes[1].distance).toBe(2);
    expect(nodes[2].distance).toBe(Infinity);
  });

  it("should handle an empty array", () => {
    const nodes = [];
    sortNodesByDistance(nodes);
    expect(nodes).toEqual([]);
  });

  it("should handle nodes with equal distances", () => {
    const nodes = [{ distance: 2 }, { distance: 2 }, { distance: 1 }];
    sortNodesByDistance(nodes);
    expect(nodes[0].distance).toBe(1);
    expect(nodes[1].distance).toBe(2);
    expect(nodes[2].distance).toBe(2);
  });
});

describe("dijkstra", () => {
  it("should find the shortest path in a simple 2x2 grid", () => {
    const grid = createMockGrid(2, 2);
    const startNode = grid[0][0];
    const finishNode = grid[1][1];
    startNode.isStart = true;
    finishNode.isFinish = true;

    const visitedNodes = dijkstra(grid, startNode, finishNode);
    expect(visitedNodes).toContain(finishNode);
    expect(visitedNodes[visitedNodes.length - 1]).toBe(finishNode);
  });

  it("should find the target in a completely open grid", () => {
    const grid = createMockGrid(5, 5);
    const startNode = grid[0][0];
    const finishNode = grid[4][4];
    startNode.isStart = true;
    finishNode.isFinish = true;

    const visitedNodes = dijkstra(grid, startNode, finishNode);
    expect(visitedNodes).toContain(finishNode);
    expect(visitedNodes.length).toBeGreaterThan(1);
    // Verify the path is found
    const path = getNodesInShortestPathOrder(finishNode);
    expect(path[0]).toBe(startNode);
    expect(path[path.length - 1]).toBe(finishNode);
  });

  it("should fail gracefully if surrounded by walls", () => {
    const grid = createMockGrid(3, 3);
    const startNode = grid[1][1];
    const finishNode = grid[0][0];
    startNode.isStart = true;
    finishNode.isFinish = true;
    // Surround start with walls
    grid[0][1].isWall = true;
    grid[1][0].isWall = true;
    grid[1][2].isWall = true;
    grid[2][1].isWall = true;

    const visitedNodes = dijkstra(grid, startNode, finishNode);
    expect(visitedNodes).toContain(startNode);
    expect(visitedNodes).not.toContain(finishNode);
    // Should only visit the start node
    expect(visitedNodes.length).toBe(1);
  });

  it("should correctly route around high-weight nodes", () => {
    const grid = createMockGrid(3, 3);
    const startNode = grid[0][0];
    const finishNode = grid[2][2];
    startNode.isStart = true;
    finishNode.isFinish = true;
    // Add high weight to middle path
    grid[1][1].isWeight = true;
    grid[1][1].weight = 100;

    const visitedNodes = dijkstra(grid, startNode, finishNode);
    expect(visitedNodes).toContain(finishNode);
    // Verify the path avoids the high-weight node
    const path = getNodesInShortestPathOrder(finishNode);
    expect(path).not.toContain(grid[1][1]);
    // Path should go around: (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) or similar
    expect(path.length).toBeGreaterThan(3);
  });

  it("should return visited nodes when no path exists due to walls", () => {
    const grid = createMockGrid(2, 2);
    const startNode = grid[0][0];
    const finishNode = grid[1][1];
    startNode.isStart = true;
    finishNode.isFinish = true;
    grid[0][1].isWall = true;
    grid[1][0].isWall = true;

    const visitedNodes = dijkstra(grid, startNode, finishNode);
    expect(visitedNodes).toContain(startNode);
    expect(visitedNodes).not.toContain(finishNode);
  });

  it("should handle weights correctly", () => {
    const grid = createMockGrid(2, 2);
    const startNode = grid[0][0];
    const finishNode = grid[1][1];
    startNode.isStart = true;
    finishNode.isFinish = true;
    grid[0][1].isWeight = true;
    grid[0][1].weight = 15;

    const visitedNodes = dijkstra(grid, startNode, finishNode);
    expect(visitedNodes).toHaveLength(3);
    expect(finishNode.distance).toBe(2); // 1 + 1
  });

  it("should return empty array if start is finish", () => {
    const grid = createMockGrid(2, 2);
    const startNode = grid[0][0];
    startNode.isStart = true;
    startNode.isFinish = true;

    const visitedNodes = dijkstra(grid, startNode, startNode);
    expect(visitedNodes).toHaveLength(1);
    expect(visitedNodes[0]).toBe(startNode);
  });

  it("should handle a grid with no reachable finish", () => {
    const grid = createMockGrid(3, 3);
    const startNode = grid[0][0];
    const finishNode = grid[2][2];
    startNode.isStart = true;
    finishNode.isFinish = true;
    // Block all paths
    grid[0][1].isWall = true;
    grid[1][0].isWall = true;
    grid[1][1].isWall = true;
    grid[1][2].isWall = true;
    grid[2][1].isWall = true;

    const visitedNodes = dijkstra(grid, startNode, finishNode);
    expect(visitedNodes).toContain(startNode);
    expect(visitedNodes).not.toContain(finishNode);
  });
});

describe("getNodesInShortestPathOrder", () => {
  it("should reconstruct the shortest path from finish to start", () => {
    const grid = createMockGrid(3, 3);
    const startNode = grid[0][0];
    const middleNode = grid[1][1];
    const finishNode = grid[2][2];
    startNode.isStart = true;
    finishNode.isFinish = true;

    // Simulate a path: start -> middle -> finish
    startNode.distance = 0;
    middleNode.distance = 1;
    middleNode.previousNode = startNode;
    finishNode.distance = 2;
    finishNode.previousNode = middleNode;

    const path = getNodesInShortestPathOrder(finishNode);
    expect(path).toEqual([startNode, middleNode, finishNode]);
  });

  it("should handle a single node path", () => {
    const grid = createMockGrid(1, 1);
    const node = grid[0][0];
    node.isStart = true;
    node.isFinish = true;
    node.distance = 0;

    const path = getNodesInShortestPathOrder(node);
    expect(path).toEqual([node]);
  });

  it("should return empty array if finishNode has no previousNode and is not start", () => {
    const grid = createMockGrid(2, 2);
    const finishNode = grid[1][1];
    finishNode.isFinish = true;
    // No previousNode set

    const path = getNodesInShortestPathOrder(finishNode);
    expect(path).toEqual([finishNode]);
  });

  it("should handle null or undefined previousNode", () => {
    const grid = createMockGrid(2, 2);
    const finishNode = grid[1][1];
    finishNode.isFinish = true;
    finishNode.previousNode = null;

    const path = getNodesInShortestPathOrder(finishNode);
    expect(path).toEqual([finishNode]);
  });
});
