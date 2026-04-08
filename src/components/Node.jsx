import React from 'react';
import './Node.css';

const Node = React.memo(({ node, onMouseDown, onMouseEnter, onMouseUp, onContextMenu }) => {
  return (
    <div
      id={`node-${node.row}-${node.col}`}
      className={`node ${node.isStart ? 'start' : ''} ${node.isFinish ? 'finish' : ''} ${node.isWall ? 'wall' : ''} ${node.isWeight ? 'node-weight' : ''}`}
      onPointerDown={(event) => {
        event.preventDefault();
        onMouseDown(node.row, node.col);
      }}
      onPointerEnter={() => onMouseEnter(node.row, node.col)}
      onPointerUp={onMouseUp}
      onPointerCancel={onMouseUp}
      onContextMenu={(e) => onContextMenu(node.row, node.col, e)}
    ></div>
  );
});

export default Node;