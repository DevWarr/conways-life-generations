import React from "react";
import Cell from "./Cell";

export default function Generations({ generationArray, toggleAlive }) {

  return (
    <div className="cell-array">
      {generationArray.map((row, i) => {
        return (
          <div className="cell-row" key={i}>
            {row.map(cell => (
              <Cell cell={cell} key={cell.key} toggleAlive={toggleAlive} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

/*
 ______ ______ ______ ______ ______       The entire cell-array
|      |      |      |      |      |
|      |      |      |      |      |  ← One cell-row
|      |      |      |      |      |
|      |      |      |      |      |
|______|______|______|______|______|
|      |      |      |      |      |
|      |      |      |      |single|  ← One cell-row
|      |      |      |      | cell |
|      |      |      |      |      |
|______|______|______|______|______|
|      |      |      |      |      |
|      |      |      |single|      |  ← One cell-row
|      |      |      | cell |      |
|      |      |      |      |      |
|______|______|______|______|______|
*/
