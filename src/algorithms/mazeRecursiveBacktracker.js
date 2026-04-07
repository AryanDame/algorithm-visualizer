/**
 * Function: mazeRecursiveBacktracker
 * 1. Start at a random node.
 * 2. Mark as visited.
 * 3. Get random unvisited neighbors two steps away.
 * 4. If neighbors exist, move to one, remove the wall between, and recurse.
 */
function getRandomOddIndex(limit) {
  const oddIndices = [];

  for (let index = 1; index < limit; index += 2) {
    oddIndices.push(index);
  }

  if (oddIndices.length === 0) {
    return 0;
  }

  return oddIndices[Math.floor(Math.random() * oddIndices.length)];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getTwoStepNeighbors(row, col, grid) {
  const neighbors = [];
  const directions = [
    { dr: -2, dc: 0 },
    { dr: 2, dc: 0 },
    { dr: 0, dc: -2 },
    { dr: 0, dc: 2 },
  ];

  for (const direction of directions) {
    const nextRow = row + direction.dr;
    const nextCol = col + direction.dc;

    if (
      nextRow >= 0 &&
      nextRow < grid.length &&
      nextCol >= 0 &&
      nextCol < grid[0].length
    ) {
      neighbors.push({ row: nextRow, col: nextCol });
    }
  }

  return neighbors;
}

function carvePassagesFrom(currentRow, currentCol, grid) {
  const neighbors = getTwoStepNeighbors(currentRow, currentCol, grid);
  shuffleArray(neighbors);

  for (const neighbor of neighbors) {
    const { row, col } = neighbor;

    if (grid[row][col].isWall) {
      const wallRow = currentRow + (row - currentRow) / 2;
      const wallCol = currentCol + (col - currentCol) / 2;
      grid[wallRow][wallCol].isWall = false;
      grid[row][col].isWall = false;
      carvePassagesFrom(row, col, grid);
    }
  }
}

export function mazeRecursiveBacktracker(grid) {
  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[row].length; col += 1) {
      grid[row][col].isWall = true;
      grid[row][col].isVisited = false;
      grid[row][col].previousNode = null;
      grid[row][col].distance = Infinity;
      grid[row][col].fScore = Infinity;
      grid[row][col].gScore = Infinity;
      grid[row][col].hScore = Infinity;
    }
  }

  const startRow = getRandomOddIndex(grid.length);
  const startCol = getRandomOddIndex(grid[0].length);

  grid[startRow][startCol].isWall = false;
  carvePassagesFrom(startRow, startCol, grid);
}
