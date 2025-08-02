export type AlgorithmType = "DIJKSTRA" | "A_STAR" | "BFS" | "DFS";
export interface AlgorithmSelectype{
    name: string;
    value: AlgorithmType;
}

export type MazeType = "NONE" | "BINARY_TREE" | "RECURSIVE_DIVISION";

export interface MazeSelectType{
    name: string;
    value: MazeType;
}


export type TileType = {
    row : number;
    col: number;
    isEnd: boolean;
    isWall: boolean;
    isPath: boolean;
    distance: number;
    isTraversed: boolean;
    isStart: boolean;
    parent: TileType | null;
    weight: number;
}
export type GridType = TileType[][];

export type SpeedType = 2 | 1 | 0.5;

export interface SpeedSelectType{
    name: string;
    value: SpeedType;
}
