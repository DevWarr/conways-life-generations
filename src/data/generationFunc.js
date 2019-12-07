import { generationTemplate } from ".";

export default function getGeneration(cells, generations, speed, setterFunc) {
  if (!generations || !cells[0].length) return cells;

  let cellAnalyze, newCells;

  function lookAround(x, y, alive) {
    let liveCount = 0;
    for (let xChange = -1; xChange <= 1; xChange++) {
      for (let yChange = -1; yChange <= 1; yChange++) {
        if (!xChange && !yChange) continue;
        if (!cellAnalyze[y - yChange]) continue;
        if (cellAnalyze[y - yChange][x - xChange]) liveCount++;
      }
    }

    if (liveCount < 2) return 0;
    if (liveCount > 3) return 0;
    if (alive && liveCount === 2) return 1;
    if (liveCount === 3) return 1;
    else return 0;
  }

  function trim(inputArr) {
    const arr = inputArr;
    let trimming = true;
    let sidesTrimmed;
    while (trimming) {
      sidesTrimmed = false;

      if (arr[0] && arr[0].every(cell => cell === 0)) {
        arr.shift();
        sidesTrimmed = true;
      }

      if (
        arr[arr.length - 1] &&
        arr[arr.length - 1].every(cell => cell === 0)
      ) {
        arr.pop();
        sidesTrimmed = true;
      }

      const deadCellsCheckArr = [[], []];
      arr.forEach(row => {
        deadCellsCheckArr[0].push(row[0]);
        deadCellsCheckArr[1].push(row[row.length - 1]);
      });
      const trimLeft = deadCellsCheckArr[0].every(cell => cell === 0);
      const trimRight = deadCellsCheckArr[1].every(cell => cell === 0);

      if (trimLeft || trimRight) {
        // Then let's trim!
        sidesTrimmed = true;
        arr.forEach(row => {
          if (trimLeft) row.shift();
          if (trimRight) row.pop();
        });
      }
      if (!sidesTrimmed) trimming = false;
    }
    return arr;
  }

  async function main() {
    while (generations > 0) {
      console.log(generations);
      console.log(newCells);
      if (newCells) cellAnalyze = trim(newCells);
      else {
        cellAnalyze = cells.map(cellRow => [0, ...cellRow, 0]);
        cellAnalyze.unshift(new Array(cellAnalyze[0].length).fill(0));
        cellAnalyze.push(cellAnalyze[0]);
      }

      if (!cellAnalyze.length) {
        setterFunc(generationTemplate);
        break;
      }

      newCells = cellAnalyze.map(cellRow => []);

      for (let y = 0; y < cellAnalyze.length; ++y) {
        for (let x = 0; x < cellAnalyze[y].length; ++x) {
          newCells[y].push(lookAround(x, y, cellAnalyze[y][x]));
        }
      }
      setterFunc(newCells);
      generations--;
      await new Promise(res => {
        setTimeout(() => res(), speed * 1000);
      });
    }
    return 0;
  }

  return main();
}
