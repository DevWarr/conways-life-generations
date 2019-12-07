export const generationTemplate = [ 
    [0, 0, 1, 1, 0], 
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 0, 0],
    [1, 1, 0, 1, 0],
]
export const generationObjectify = arr => {
    return arr.map( (row, y) => {
        return row.map( (cell, x) => {
            return {
                x,
                y,
                key: Number(`${x}${y}`),
                alive: cell
            }
        })
    })
}