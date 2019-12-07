import React from "react";

export default function Cell({ cell, toggleAlive }) {
  return (
    <div
      className={cell.alive ? "cell alive" : "cell"}
      id={`${cell.x}-${cell.y}`}
      onClick={toggleAlive}
    />
  );
}
