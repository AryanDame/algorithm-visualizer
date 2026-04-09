import {
  buildPathFromParents,
  getNeighbors,
  linkPathNodes,
  nodeKey,
} from "./graphHelpers.js";

function manhattanDistance(nodeA, nodeB) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

function expandGreedyFrontier(
  frontier,
  thisParents,
  thisVisited,
  otherVisited,
  targetNode,
  grid,
  visitedNodesInOrder,
) {
  while (frontier.length > 0) {
    frontier.sort((a, b) => a.hScore - b.hScore || a.distance - b.distance);
    const currentNode = frontier.shift();
    const currentId = nodeKey(currentNode);

    if (currentNode.isWall) {
      continue;
    }

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
      neighbor.distance = currentNode.distance + neighbor.weight;
      neighbor.hScore = manhattanDistance(neighbor, targetNode);
      frontier.push(neighbor);

      if (otherVisited.has(neighborId)) {
        return neighbor;
      }
    }

    return null;
  }

  return null;
}

export function bidirectionalGreedyBestFirstSearch(
  grid,
  startNode,
  finishNode,
) {
  if (startNode === finishNode) {
    return [startNode];
  }

  const visitedNodesInOrder = [];
  const startFrontier = [startNode];
  const finishFrontier = [finishNode];
  const startVisited = new Set([nodeKey(startNode)]);
  const finishVisited = new Set([nodeKey(finishNode)]);
  const startParents = new Map([[nodeKey(startNode), null]]);
  const finishParents = new Map([[nodeKey(finishNode), null]]);

  startNode.distance = 0;
  finishNode.distance = 0;
  startNode.hScore = manhattanDistance(startNode, finishNode);
  finishNode.hScore = manhattanDistance(finishNode, startNode);

  while (startFrontier.length > 0 && finishFrontier.length > 0) {
    const meetingFromStart = expandGreedyFrontier(
      startFrontier,
      startParents,
      startVisited,
      finishVisited,
      finishNode,
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

    const meetingFromFinish = expandGreedyFrontier(
      finishFrontier,
      finishParents,
      finishVisited,
      startVisited,
      startNode,
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
