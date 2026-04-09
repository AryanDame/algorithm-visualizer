import { getNeighbors } from "./graphHelpers.js";

export function uniformCostSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const frontier = [startNode];

  startNode.distance = 0;

  while (frontier.length > 0) {
    frontier.sort((a, b) => a.distance - b.distance);
    const currentNode = frontier.shift();

    if (currentNode.isWall || currentNode.isVisited) {
      continue;
    }

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    }

    for (const neighbor of getNeighbors(currentNode, grid)) {
      if (neighbor.isWall || neighbor.isVisited) {
        continue;
      }

      const nextDistance = currentNode.distance + neighbor.weight;
      if (nextDistance < neighbor.distance) {
        neighbor.distance = nextDistance;
        neighbor.previousNode = currentNode;
        frontier.push(neighbor);
      }
    }
  }

  return visitedNodesInOrder;
}
