import React from 'react';
import './Node.css';

const Node = React.memo(({ node, onMouseDown, onMouseEnter, onMouseUp, onContextMenu }) => {
  return (
    <div
      id={`node-${node.row}-${node.col}`}
      className={`node ${node.isStart ? 'start' : ''} ${node.isFinish ? 'finish' : ''} ${node.isWall ? 'wall' : ''} ${node.isWeight ? 'node-weight' : ''}`}
      onMouseDown={() => onMouseDown(node.row, node.col)}
      onMouseEnter={() => onMouseEnter(node.row, node.col)}
      onMouseUp={onMouseUp}
      onContextMenu={(e) => onContextMenu(node.row, node.col, e)}
    ></div>
  );
});

export default Node;