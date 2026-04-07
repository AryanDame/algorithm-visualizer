import { getNeighbors, nodeKey } from "./graphHelpers.js";

export function depthFirstSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const stack = [startNode];
  const discovered = new Set([nodeKey(startNode)]);

  startNode.distance = 0;

  while (stack.length > 0) {
    const currentNode = stack.pop();

    if (currentNode.isWall || currentNode.isVisited) {
      continue;
    }

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    }

    const neighbors = getNeighbors(currentNode, grid).reverse();
    for (const neighbor of neighbors) {
      const neighborId = nodeKey(neighbor);
      if (neighbor.isWall || discovered.has(neighborId)) {
        continue;
      }

      discovered.add(neighborId);
      neighbor.previousNode = currentNode;
      neighbor.distance = currentNode.distance + 1;
      stack.push(neighbor);
    }
  }

  return visitedNodesInOrder;
}
