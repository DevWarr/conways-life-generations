export const generationUpdate = (generation, action) => {
  console.log(action)
  switch (action.type) {
    case "SUBTRACT_COLUMN":
      return generation.map(row => row.slice(1));

    case "ADD_COLUMN":
      return generation.map(row => [0, ...row]);

    case "SUBTRACT_ROW":
      return generation.slice(1);

    case "ADD_ROW":
      const newRow = new Array(generation[0].length).fill(0);
      return [newRow, ...generation];

    case "CELL_TOGGLE":
      return generation.map((row, yValue) => {
        if ((yValue === action.payload.y)) {
          return row.map((cell, xValue) =>
            xValue === action.payload.x ? !cell : cell
          );
        }
        else return row
      });
    default:
      return generation;
  }
};
