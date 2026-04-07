import { getNeighbors, nodeKey } from "./graphHelpers.js";

function manhattanDistance(nodeA, nodeB) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

export function beamSearch(grid, startNode, finishNode, beamWidth = 6) {
  const visitedNodesInOrder = [];
  const discovered = new Set([nodeKey(startNode)]);

  startNode.distance = 0;
  startNode.hScore = manhattanDistance(startNode, finishNode);

  let frontier = [startNode];

  while (frontier.length > 0) {
    const nextFrontier = [];

    for (const currentNode of frontier) {
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
        nextFrontier.push(neighbor);
      }
    }

    nextFrontier.sort((a, b) => a.hScore - b.hScore || a.distance - b.distance);
    frontier = nextFrontier.slice(0, beamWidth);
  }

  return visitedNodesInOrder;
}
