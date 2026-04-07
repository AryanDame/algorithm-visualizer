import {
  buildPathFromParents,
  getNeighbors,
  linkPathNodes,
  nodeKey,
} from "./graphHelpers.js";

function minDistanceInOpen(openSet, distanceMap) {
  let min = Infinity;
  for (const node of openSet) {
    const nodeDistance = distanceMap.get(nodeKey(node)) ?? Infinity;
    if (nodeDistance < min) {
      min = nodeDistance;
    }
  }
  return min;
}

function extractMin(openSet, distanceMap) {
  let bestIndex = 0;
  let bestDistance = Infinity;

  for (let i = 0; i < openSet.length; i += 1) {
    const currentDistance = distanceMap.get(nodeKey(openSet[i])) ?? Infinity;
    if (currentDistance < bestDistance) {
      bestDistance = currentDistance;
      bestIndex = i;
    }
  }

  return openSet.splice(bestIndex, 1)[0];
}

export function bidirectionalDijkstra(grid, startNode, finishNode) {
  if (startNode === finishNode) {
    return [startNode];
  }

  const visitedNodesInOrder = [];
  const visitedOrderSet = new Set();

  const startOpen = [startNode];
  const finishOpen = [finishNode];
  const startVisited = new Set();
  const finishVisited = new Set();

  const startDistances = new Map([[nodeKey(startNode), 0]]);
  const finishDistances = new Map([[nodeKey(finishNode), 0]]);
  const startParents = new Map([[nodeKey(startNode), null]]);
  const finishParents = new Map([[nodeKey(finishNode), null]]);

  let bestPathCost = Infinity;
  let meetingNode = null;

  while (startOpen.length > 0 && finishOpen.length > 0) {
    const minStart = minDistanceInOpen(startOpen, startDistances);
    const minFinish = minDistanceInOpen(finishOpen, finishDistances);

    if (minStart + minFinish >= bestPathCost) {
      break;
    }

    const expandStartSide = minStart <= minFinish;

    if (expandStartSide) {
      const currentNode = extractMin(startOpen, startDistances);
      const currentId = nodeKey(currentNode);

      if (startVisited.has(currentId) || currentNode.isWall) {
        continue;
      }

      startVisited.add(currentId);
      if (!visitedOrderSet.has(currentId)) {
        visitedOrderSet.add(currentId);
        visitedNodesInOrder.push(currentNode);
      }

      const currentDistance = startDistances.get(currentId) ?? Infinity;

      if (finishVisited.has(currentId)) {
        const candidate =
          currentDistance + (finishDistances.get(currentId) ?? Infinity);
        if (candidate < bestPathCost) {
          bestPathCost = candidate;
          meetingNode = currentNode;
        }
      }

      for (const neighbor of getNeighbors(currentNode, grid)) {
        if (neighbor.isWall) {
          continue;
        }

        const neighborId = nodeKey(neighbor);
        const newDistance = currentDistance + neighbor.weight;

        if (newDistance < (startDistances.get(neighborId) ?? Infinity)) {
          startDistances.set(neighborId, newDistance);
          startParents.set(neighborId, currentNode);
          startOpen.push(neighbor);
        }

        if ((finishDistances.get(neighborId) ?? Infinity) < Infinity) {
          const candidate =
            newDistance + (finishDistances.get(neighborId) ?? Infinity);
          if (candidate < bestPathCost) {
            bestPathCost = candidate;
            meetingNode = neighbor;
          }
        }
      }
    } else {
      const currentNode = extractMin(finishOpen, finishDistances);
      const currentId = nodeKey(currentNode);

      if (finishVisited.has(currentId) || currentNode.isWall) {
        continue;
      }

      finishVisited.add(currentId);
      if (!visitedOrderSet.has(currentId)) {
        visitedOrderSet.add(currentId);
        visitedNodesInOrder.push(currentNode);
      }

      const currentDistance = finishDistances.get(currentId) ?? Infinity;

      if (startVisited.has(currentId)) {
        const candidate =
          currentDistance + (startDistances.get(currentId) ?? Infinity);
        if (candidate < bestPathCost) {
          bestPathCost = candidate;
          meetingNode = currentNode;
        }
      }

      for (const neighbor of getNeighbors(currentNode, grid)) {
        if (neighbor.isWall) {
          continue;
        }

        const neighborId = nodeKey(neighbor);
        const newDistance = currentDistance + currentNode.weight;

        if (newDistance < (finishDistances.get(neighborId) ?? Infinity)) {
          finishDistances.set(neighborId, newDistance);
          finishParents.set(neighborId, currentNode);
          finishOpen.push(neighbor);
        }

        if ((startDistances.get(neighborId) ?? Infinity) < Infinity) {
          const candidate =
            newDistance + (startDistances.get(neighborId) ?? Infinity);
          if (candidate < bestPathCost) {
            bestPathCost = candidate;
            meetingNode = neighbor;
          }
        }
      }
    }
  }

  if (meetingNode) {
    const path = buildPathFromParents(meetingNode, startParents, finishParents);
    linkPathNodes(path);
  }

  return visitedNodesInOrder;
}
