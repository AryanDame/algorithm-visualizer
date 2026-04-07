import { getNeighbors } from "./graphHelpers.js";

export function bellmanFord(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const enqueued = new Set();
  const allNodes = grid.flat().filter((node) => !node.isWall);

  startNode.distance = 0;

  for (let pass = 0; pass < allNodes.length - 1; pass += 1) {
    let updated = false;

    for (const node of allNodes) {
      if (node.distance === Infinity) {
        continue;
      }

      const neighbors = getNeighbors(node, grid);
      for (const neighbor of neighbors) {
        if (neighbor.isWall) {
          continue;
        }

        const nextDistance = node.distance + neighbor.weight;
        if (nextDistance < neighbor.distance) {
          neighbor.distance = nextDistance;
          neighbor.previousNode = node;
          updated = true;

          const key = `${neighbor.row}-${neighbor.col}`;
          if (!enqueued.has(key)) {
            enqueued.add(key);
            visitedNodesInOrder.push(neighbor);
          }
        }
      }
    }

    if (!updated) {
      break;
    }
  }

  if (!visitedNodesInOrder.includes(startNode)) {
    visitedNodesInOrder.unshift(startNode);
  }

  if (
    finishNode.distance !== Infinity &&
    !visitedNodesInOrder.includes(finishNode)
  ) {
    visitedNodesInOrder.push(finishNode);
  }

  return visitedNodesInOrder;
}
