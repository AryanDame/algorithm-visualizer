import { getNeighbors, nodeKey } from "./graphHelpers.js";

function manhattanDistance(nodeA, nodeB) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

export function greedyBestFirstSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const openSet = [startNode];
  const discovered = new Set([nodeKey(startNode)]);

  startNode.distance = 0;
  startNode.hScore = manhattanDistance(startNode, finishNode);

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.hScore - b.hScore || a.distance - b.distance);
    const currentNode = openSet.shift();

    if (currentNode.isWall || currentNode.isVisited) {
      continue;
    }

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    }

    for (const neighbor of getNeighbors(currentNode, grid)) {
      const neighborId = nodeKey(neighbor);
      if (neighbor.isWall || discovered.has(neighborId)) {
        continue;
      }

      discovered.add(neighborId);
      neighbor.previousNode = currentNode;
      neighbor.distance = currentNode.distance + neighbor.weight;
      neighbor.hScore = manhattanDistance(neighbor, finishNode);
      openSet.push(neighbor);
    }
  }

  return visitedNodesInOrder;
}
