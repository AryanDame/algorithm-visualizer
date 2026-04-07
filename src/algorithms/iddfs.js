import { getNeighbors, nodeKey } from "./graphHelpers.js";

function depthLimitedSearch(
  currentNode,
  finishNode,
  grid,
  depthLimit,
  seenInPath,
  visitOrder,
) {
  visitOrder.push(currentNode);

  if (currentNode === finishNode) {
    return true;
  }

  if (depthLimit === 0) {
    return false;
  }

  const neighbors = getNeighbors(currentNode, grid);
  for (const neighbor of neighbors) {
    const key = nodeKey(neighbor);
    if (neighbor.isWall || seenInPath.has(key)) {
      continue;
    }

    seenInPath.add(key);
    neighbor.previousNode = currentNode;

    if (
      depthLimitedSearch(
        neighbor,
        finishNode,
        grid,
        depthLimit - 1,
        seenInPath,
        visitOrder,
      )
    ) {
      return true;
    }

    seenInPath.delete(key);
  }

  return false;
}

export function iterativeDeepeningDfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const maxDepth = grid.length * grid[0].length;

  for (let depth = 0; depth <= maxDepth; depth += 1) {
    for (const row of grid) {
      for (const node of row) {
        node.previousNode = null;
      }
    }

    const passOrder = [];
    const seenInPath = new Set([nodeKey(startNode)]);

    const found = depthLimitedSearch(
      startNode,
      finishNode,
      grid,
      depth,
      seenInPath,
      passOrder,
    );

    for (const node of passOrder) {
      if (!visitedNodesInOrder.includes(node)) {
        visitedNodesInOrder.push(node);
      }
    }

    if (found) {
      return visitedNodesInOrder;
    }
  }

  return visitedNodesInOrder;
}
