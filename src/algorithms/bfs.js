import { getNeighbors, nodeKey } from "./graphHelpers.js";

export function breadthFirstSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const queue = [startNode];
  const queued = new Set([nodeKey(startNode)]);

  startNode.distance = 0;

  while (queue.length > 0) {
    const currentNode = queue.shift();

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
      if (neighbor.isWall || queued.has(neighborId)) {
        continue;
      }

      neighbor.previousNode = currentNode;
      neighbor.distance = currentNode.distance + 1;
      queued.add(neighborId);
      queue.push(neighbor);
    }
  }

  return visitedNodesInOrder;
}
