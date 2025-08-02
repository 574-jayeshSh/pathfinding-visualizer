import { isEqual } from "./helper";
import type { TileType } from "./types";

export function isinQueue (tile: TileType , queue: TileType[]){
    for(let i = 0; i < queue.length ; i++){
        if(isEqual(tile , queue[i])) return true;

    }
    return false;
}