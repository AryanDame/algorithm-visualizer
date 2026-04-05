/**
 * Helper function: getAllNodes
 * Takes the 2D grid array and flattens it into a 1D array of all nodes.
 * Returns the 1D array.
 */
export function getAllNodes(grid) {
  const nodes = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      nodes.push(grid[i][j]);
    }
  }
  return nodes;
}

/**
 * Helper function: sortNodesByDistance
 * Takes an array of unvisited nodes and sorts them in place
 * by their 'distance' property in ascending order.
 */
export function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((a, b) => a.distance - b.distance);
}

/**
 * Main function: dijkstra
 * Parameters: grid (2D array), startNode (object), finishNode (object)
 * 1. Set startNode distance to 0.
 * 2. Get all unvisited nodes from the grid.
 * 3. Loop while there are unvisited nodes:
 * - Sort nodes by distance.
 * - Shift the closest node off the array.
 * - If it's a wall, continue.
 * - If closest node distance is Infinity, we are trapped; break.
 * - Mark node as visited. Push to visitedNodesInOrder array.
 * - If node === finishNode, return visitedNodesInOrder.
 * - Otherwise, update the unvisited neighbors of this node.
 */
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

// Function to update the distance and previousNode property of neighbors (up, down, left, right)
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    const newDistance = node.distance + neighbor.weight;
    if (newDistance < neighbor.distance) {
      neighbor.distance = newDistance;
      neighbor.previousNode = node;
    }
  }
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

/**
 * Function: getNodesInShortestPathOrder
 * Parameter: finishNode (object)
 * Starts at finishNode and works backward using the 'previousNode' property.
 * Unshifts each node into an array to get the correct order.
 * Returns the array.
 */
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null && currentNode !== undefined) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
