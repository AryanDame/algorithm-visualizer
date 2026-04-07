import { getNeighbors } from "./graphHelpers.js";

function manhattanDistance(nodeA, nodeB) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

export function weightedAstar(
  grid,
  startNode,
  finishNode,
  heuristicWeight = 1.8,
) {
  const visitedNodesInOrder = [];
  const openSet = [startNode];

  startNode.gScore = 0;
  startNode.hScore = manhattanDistance(startNode, finishNode);
  startNode.fScore = startNode.gScore + heuristicWeight * startNode.hScore;
  startNode.distance = 0;

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.fScore - b.fScore || a.hScore - b.hScore);
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
      if (neighbor.isWall) {
        continue;
      }

      const tentativeGScore = currentNode.gScore + neighbor.weight;
      if (tentativeGScore >= neighbor.gScore) {
        continue;
      }

      neighbor.previousNode = currentNode;
      neighbor.gScore = tentativeGScore;
      neighbor.distance = tentativeGScore;
      neighbor.hScore = manhattanDistance(neighbor, finishNode);
      neighbor.fScore = neighbor.gScore + heuristicWeight * neighbor.hScore;

      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      }
    }
  }

  return visitedNodesInOrder;
}
