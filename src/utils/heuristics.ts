import { MAX_COL, MAX_ROW } from "./constants";
import type { GridType, TileType } from "./types";

const retrieveHeuristicCost = (currentTile: TileType, endTile: TileType) => {
    const manhattenDistance = 1
    const row = Math.abs(currentTile.row - endTile.row)
    const col = Math.abs(currentTile.col - endTile.col)
    return manhattenDistance*(row + col) 
}
export const initiHeuristicCost = (grid: GridType, endTile: TileType) => {
    const heuristicCost = [];
    for(let i = 0; i < MAX_ROW; i++){
        const row = [];
        for(let j = 0; j < MAX_COL; j++){
            row.push(retrieveHeuristicCost(grid[i][j],endTile))
        }
        heuristicCost.push(row);
    }
    return heuristicCost;
}

export const initFunctionCost = () =>{
    const functionCost = [];
    for(let i = 0;  i < MAX_ROW; i++){
        const row = [];
        for(let j = 0; j < MAX_COL; j++){
            row.push(Infinity)
        }
        functionCost.push(row);
    }
    return functionCost
}