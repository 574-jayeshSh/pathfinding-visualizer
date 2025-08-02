import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { isEqual } from "../../../utils/helper";
import { isinQueue } from "../../../utils/isInQueue";
import type { GridType, TileType } from "../../../utils/types";

export const bfs = (
    grid: GridType,
    startTile: TileType,
    endTile: TileType
) => {
    const traversedTiles: TileType[] = [];
    const base = grid[startTile.row][startTile.col];
    base.distance = 0;
    base.isTraversed = true;
    const unTraversed = [base];
    let pathFound = false;
    while(unTraversed.length){
        const tile = unTraversed.shift()!;
        if(tile.isWall) continue;
        if(tile.distance === Infinity) break;
        tile.isTraversed = true;
        traversedTiles.push(tile);
        if (!pathFound && isEqual(tile, endTile)) {
        pathFound = true;
    }


        const neighbors = getUntraversedNeighbors(grid,tile);

        for(let i = 0;  i<neighbors.length ; i++ ){
            if(!isinQueue(neighbors[i],unTraversed)){
                const neighbor = neighbors[i];
                neighbor.distance = tile.distance+1;
                neighbor.parent = tile;
                unTraversed.push(neighbor);
            }
        }
    }

    const path = [];
    let tile = grid[endTile.row][endTile.col];
    while(tile != null){
        tile.isPath = true;
        path.unshift(tile);
        tile = tile.parent!
    }

    return {traversedTiles, path};
}