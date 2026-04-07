export function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
}

export function nodeKey(node) {
  return `${node.row}-${node.col}`;
}

export function linkPathNodes(pathNodes) {
  for (let index = 1; index < pathNodes.length; index += 1) {
    pathNodes[index].previousNode = pathNodes[index - 1];
  }
}

export function buildPathFromParents(meetingNode, startParents, finishParents) {
  const startPath = [];
  let current = meetingNode;

  while (current) {
    startPath.unshift(current);
    current = startParents.get(nodeKey(current)) ?? null;
  }

  const finishPath = [];
  current = finishParents.get(nodeKey(meetingNode)) ?? null;

  while (current) {
    finishPath.push(current);
    current = finishParents.get(nodeKey(current)) ?? null;
  }

  return [...startPath, ...finishPath];
}
