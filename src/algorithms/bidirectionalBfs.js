import {
  buildPathFromParents,
  getNeighbors,
  linkPathNodes,
  nodeKey,
} from "./graphHelpers.js";

function expandFrontier(
  queue,
  thisParents,
  thisVisited,
  otherVisited,
  grid,
  visitedNodesInOrder,
) {
  if (queue.length === 0) {
    return null;
  }

  const currentNode = queue.shift();
  const currentId = nodeKey(currentNode);
  visitedNodesInOrder.push(currentNode);

  if (otherVisited.has(currentId)) {
    return currentNode;
  }

  for (const neighbor of getNeighbors(currentNode, grid)) {
    const neighborId = nodeKey(neighbor);

    if (neighbor.isWall || thisVisited.has(neighborId)) {
      continue;
    }

    thisVisited.add(neighborId);
    thisParents.set(neighborId, currentNode);
    queue.push(neighbor);

    if (otherVisited.has(neighborId)) {
      return neighbor;
    }
  }

  return null;
}

export function bidirectionalBreadthFirstSearch(grid, startNode, finishNode) {
  if (startNode === finishNode) {
    return [startNode];
  }

  const visitedNodesInOrder = [];
  const startQueue = [startNode];
  const finishQueue = [finishNode];
  const startVisited = new Set([nodeKey(startNode)]);
  const finishVisited = new Set([nodeKey(finishNode)]);
  const startParents = new Map([[nodeKey(startNode), null]]);
  const finishParents = new Map([[nodeKey(finishNode), null]]);

  while (startQueue.length > 0 && finishQueue.length > 0) {
    const meetingFromStart = expandFrontier(
      startQueue,
      startParents,
      startVisited,
      finishVisited,
      grid,
      visitedNodesInOrder,
    );

    if (meetingFromStart) {
      const path = buildPathFromParents(
        meetingFromStart,
        startParents,
        finishParents,
      );
      linkPathNodes(path);
      return visitedNodesInOrder;
    }

    const meetingFromFinish = expandFrontier(
      finishQueue,
      finishParents,
      finishVisited,
      startVisited,
      grid,
      visitedNodesInOrder,
    );

    if (meetingFromFinish) {
      const path = buildPathFromParents(
        meetingFromFinish,
        startParents,
        finishParents,
      );
      linkPathNodes(path);
      return visitedNodesInOrder;
    }
  }

  return visitedNodesInOrder;
}
