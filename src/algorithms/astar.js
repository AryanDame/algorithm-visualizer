// Function: manhattanDistance. Calculates the absolute difference between x and y coordinates of two nodes.
function manhattanDistance(nodeA, nodeB) {
  const dx = Math.abs(nodeA.row - nodeB.row);
  const dy = Math.abs(nodeA.col - nodeB.col);
  return dx + dy;
}

/**
 * Function: astar
 * Similar to Dijkstra, but uses 'f', 'g', and 'h' scores.
 * f(n) = g(n) + h(n)
 * g score is distance from start.
 * h score is Manhattan distance to finish.
 * Returns visitedNodesInOrder.
 */
export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  startNode.fScore = manhattanDistance(startNode, finishNode);
  startNode.gScore = 0;
  startNode.hScore = manhattanDistance(startNode, finishNode);

  const openSet = [startNode];
  const closedSet = [];

  while (openSet.length > 0) {
    // Sort by fScore (lowest first)
    openSet.sort((a, b) => a.fScore - b.fScore);
    const currentNode = openSet.shift();

    if (currentNode.isWall) continue;
    if (currentNode.distance === Infinity) return visitedNodesInOrder;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;

    closedSet.push(currentNode);

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (closedSet.includes(neighbor)) continue;

      const tentativeGScore = currentNode.gScore + neighbor.weight;

      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (tentativeGScore >= neighbor.gScore) {
        continue;
      }

      neighbor.previousNode = currentNode;
      neighbor.gScore = tentativeGScore;
      neighbor.hScore = manhattanDistance(neighbor, finishNode);
      neighbor.fScore = neighbor.gScore + neighbor.hScore;
      neighbor.distance = neighbor.gScore;
    }
  }

  return visitedNodesInOrder;
}

/**
 * Helper function: getUnvisitedNeighbors
 * Gets the neighboring nodes (up, down, left, right) that have not been visited.
 * Returns an array of unvisited neighbor nodes.
 */
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  // Check up
  if (row > 0) neighbors.push(grid[row - 1][col]);
  // Check down
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  // Check left
  if (col > 0) neighbors.push(grid[row][col - 1]);
  // Check right
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
