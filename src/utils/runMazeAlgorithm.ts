
import { binaryTree } from "../lib/algorithm/maze/binaryTree.ts";
import recursiveDivision from "../lib/algorithm/maze/recursiveDivision.ts";
import type { MazeType, GridType ,TileType ,SpeedType } from "../utils/types.ts";
import { MAX_COL, MAX_ROW, SPEEDS } from "./constants.ts";
import { constructBorder } from "./constructBorder.ts";
export const runMazeAlgorithm = async ({
    maze,
    grid,
    startTile,
    endTile,
    setIsDisabled,
    speed
}:{
    maze: MazeType;
    grid: GridType;
    startTile: TileType;
    endTile: TileType;
    setIsDisabled: (isDisabled: boolean) => void;
    speed: SpeedType;
}) => {
    if(maze == "BINARY_TREE"){
        await binaryTree(grid,startTile,endTile,setIsDisabled,speed);
    } else if(maze === "RECURSIVE_DIVISION"){
        const currentSpeed = SPEEDS.find((s) => s.value === speed)!.value ?? 2 
        await constructBorder(grid, startTile, endTile);
        await recursiveDivision({
            grid,
            startTile,
            endTile,
            row: 1,
            col: 1,
            height: Math.floor((MAX_ROW - 1)/2),
            width: Math.floor((MAX_COL - 1)/2),
            setIsDisabled,
            speed
        })
        setTimeout(() => {
            setIsDisabled(false); 
        }, 800 * currentSpeed );
    }
}