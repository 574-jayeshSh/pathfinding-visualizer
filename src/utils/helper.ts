import { MAX_COL, MAX_ROW } from "./constants";
import type { GridType, TileType } from "./types";

const createRow = (row: number, startTile: TileType, endTile: TileType) => {
    const currentRow = [];
    for(let col = 0; col < MAX_COL; col++){
        currentRow.push({
            row,
            col,
            isEnd: row === endTile.row && col === endTile.col,
            isWall: false,
            isPath: false,
            distance: Infinity,
            isStart: row === startTile.row && col === startTile.col,
            isTraversed: false,
            parent: null,
            weight: 1,
    });
    }
    return currentRow;
}
export const createGrid = (startTile: TileType , endTile: TileType)=>{
    const grid: GridType = [];
    for(let row = 0; row < MAX_ROW; row++){
        grid.push(createRow(row , startTile, endTile))
    }
    return grid;
}

export const checkIfStartOrEnd = (row: number,col: number) => {
     return (row === 1 && col === 1) || (row === MAX_ROW - 2 && col === MAX_COL - 2);
}
export function createNewGrid(grid: TileType[][], row: number, col: number, mode: 'wall' | 'weight'): TileType[][] {
  const newGrid = grid.map(row => row.map(tile => ({ ...tile })));
  const tile = newGrid[row][col];

  if (tile.isStart || tile.isEnd) return newGrid;

  if (mode === 'wall') {
    tile.isWall = !tile.isWall;
    tile.weight = 1; // reset to normal if it's a wall
  } else if (mode === 'weight') {
    tile.weight = tile.weight === 1 ? 5 : 1; // toggle weight: 1 <-> 5
    tile.isWall = false; // ensure it's not a wall
  }

  return newGrid;
}


export const isEqual = (tile1: TileType, tile2: TileType) => {
    return tile1.row === tile2.row && tile1.col === tile2.col;
}

export const isRowColEqual = (row: number, col: number, tile: TileType) => {
    return row === tile.row && col === tile.col;
}

export const sleep = (ms: number)=>{
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getRandInt = (min: number , max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min);
}

export const checkStack = (tile: TileType, stack: TileType[]) =>{
    for(let i= 0; i < stack.length; i++){
        if(isEqual(stack[i],tile)) return true;
    }
    return false;
}
export const dropFromQueue = (tile: TileType, queue: TileType[]) =>{
    for(let i= 0; i < queue.length; i++){
        if(isEqual(tile,queue[i])) {
            queue.splice(i,1);
            break
        }
    }
}
export const toggleWeight = (grid: GridType, row: number, col: number) => {
    const newGrid = grid.slice();
    const currentTile = newGrid[row][col];

    // Do not allow weight on walls or start/end
    if (currentTile.isWall || currentTile.isStart || currentTile.isEnd) return grid;

    const newTile = {
        ...currentTile,
        weight: currentTile.weight === 1 ? 5 : 1, // Toggle weight
    };

    newGrid[row][col] = newTile;
    return newGrid;
};
