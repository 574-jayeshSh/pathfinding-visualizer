import type { AlgorithmSelectype, MazeSelectType, SpeedSelectType } from "./types";

export const MAX_ROW = 39;
export const MAX_COL = 49;

export const START_TILE_CONFIGURATION = {
    row: 1,
    col: 1,
    isEnd: false,
    isWall: false,
    isPath: false,
    distance: 0,
    isStart: false,
    isTraversed: false,
    parent: null,
    weight: 1,
}


export const END_TILE_CONFIGURATION = {
    row: MAX_ROW - 2,
    col: MAX_COL - 2,
    isEnd: false,
    isWall: false,
    isPath: false,
    distance: 0,
    isStart: false,
    isTraversed: false,
    parent: null,
    weight: 1,
}

export const TILE_STYLE = 
"lg:w-[17px] lg:h-[17px] md:w-[15px] md:h-[15px] xs:w-[8px] xs:h-[8px] w-[7px] h-[7px] border-t border-r border-sky-200";

export const TRAVERSED_TILE_STYLE = TILE_STYLE + " bg-cyan-400";

export const START_TILE_STYLE = TILE_STYLE + " bg-green-400";

export const END_TILE_STYLE = TILE_STYLE + " bg-red-400";

export const WALL_TILE_STYLE = TILE_STYLE + " bg-gray-400";

export const PATH_TILE_STYLE = TILE_STYLE + " bg-Gellow-500";


export const MAZES: MazeSelectType[] = [
        {name: "No Maze" , value: "NONE"},
        {name: "Recursive Division", value: "RECURSIVE_DIVISION"},
        {name: "Binary Tree", value: "BINARY_TREE"},
];

export const PATHFINDING_ALGORITHMS: AlgorithmSelectype[] = [
    { name: "Dijkstra" , value: "DIJKSTRA"},
    { name: "A_Star" , value: "A_STAR"},
    { name: "Breath First Search" , value: "BFS"},
    { name: "Depth First Search" , value: "DFS"},
]

export const SPEEDS: SpeedSelectType[] = [
    {name: "Slow" , value: 2},
    {name: "Medium" , value: 1},
    {name: "Fast" , value: 0.5}
]


export const SLEEP_TIME = 8;

export const EXTENDED_SLEEP_TIME = 30;
