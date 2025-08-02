import { MAX_COL, MAX_ROW } from "./constants";
import type { GridType, TileType } from "./types";

export const getUntraversedNeighbors = (grid: GridType, tile: TileType) => {
    const {row,col} = tile;

    const neighbors = [];

    if(row > 0){
        neighbors.push(grid[row - 1][col]);
    }
    if(row < MAX_ROW - 1){
        neighbors.push(grid[row + 1][col]);
    }
    if(col > 0){
        neighbors.push(grid[row][col - 1]);
    }
    if(col < MAX_COL - 1){
        neighbors.push(grid[row][col+ 1]);
    }
    return neighbors.filter((neighbor) => !neighbor.isTraversed)
}