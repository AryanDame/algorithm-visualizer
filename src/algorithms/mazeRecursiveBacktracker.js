/**
 * Function: mazeRecursiveBacktracker
 * 1. Start at a random node.
 * 2. Mark as visited.
 * 3. Get random unvisited neighbors two steps away.
 * 4. If neighbors exist, move to one, remove the wall between, and recurse.
 */
export function mazeRecursiveBacktracker(grid) {
  // Start with all cells as walls
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      grid[row][col].isWall = true;
    }
  }

  // Choose random starting point
  const startRow = Math.floor(Math.random() * grid.length);
  const startCol = Math.floor(Math.random() * grid[0].length);

  // Mark start as passage and begin recursion
  grid[startRow][startCol].isWall = false;
  carvePassagesFrom(startRow, startCol, grid);
}

function carvePassagesFrom(currentRow, currentCol, grid) {
  // Get unvisited neighbors (adjacent cells that are still walls)
  const neighbors = getUnvisitedNeighbors(currentRow, currentCol, grid);

  // Shuffle neighbors for randomness
  shuffleArray(neighbors);

  // Visit each neighbor
  for (const neighbor of neighbors) {
    const { row, col } = neighbor;

    // If neighbor is still a wall, carve a passage
    if (grid[row][col].isWall) {
      grid[row][col].isWall = false;
      carvePassagesFrom(row, col, grid);
    }
  }
}

function getUnvisitedNeighbors(row, col, grid) {
  const neighbors = [];
  const directions = [
    { dr: -1, dc: 0 }, // up
    { dr: 1, dc: 0 }, // down
    { dr: 0, dc: -1 }, // left
    { dr: 0, dc: 1 }, // right
  ];

  for (const dir of directions) {
    const newRow = row + dir.dr;
    const newCol = col + dir.dc;

    // Check bounds
    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length
    ) {
      neighbors.push({ row: newRow, col: newCol });
    }
  }

  return neighbors;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
