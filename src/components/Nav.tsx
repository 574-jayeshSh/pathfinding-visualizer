import { useState, type MutableRefObject } from "react";
import { usePathfiding } from "../hooks/usePathfinding.hook";
import { useTile } from "../hooks/useTile.hook";
import { EXTENDED_SLEEP_TIME, MAZES, PATHFINDING_ALGORITHMS, SLEEP_TIME, SPEEDS } from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import type { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { Select } from "./Select";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import {useSpeed} from "../hooks/useSpeed.hook"
import { PlayButton } from "./PlayButton";
import { runPathfindingAlgorithm } from "../utils/runPathFindingAlgorithm";
import { animatePath } from "../utils/animatePath";

export function Nav({isVisualizationRunningRef}: {isVisualizationRunningRef: MutableRefObject<boolean>}) {
    const [isDisabled,setIsDisabled] = useState(false);
    const {
        maze , setMaze ,grid , setGrid ,isGraphVisualized, setIsGraphVisualized , algorithm, setAlgorithm
    } = usePathfiding();
    const {startTile, endTile} = useTile();
    const {speed , setSpeed} = useSpeed();
    
    const handleGenerateMaze = (maze: MazeType)=>{
        if(maze === "NONE"){
            setMaze(maze);
            resetGrid({grid , startTile, endTile});
            return
        }
        
        setMaze(maze);
        setIsDisabled(true);
        runMazeAlgorithm({
            maze , grid , startTile ,endTile ,setIsDisabled,speed
        })
        const newGrid = grid.slice();
        setGrid(newGrid);
        setIsGraphVisualized(false);
    }

    const handleRunVisualizer = () =>{
        if(isGraphVisualized){
            setIsGraphVisualized(false);
            resetGrid({grid: grid.slice() , startTile , endTile});
            return;
        }

    const {traversedTiles,path} = runPathfindingAlgorithm({
            algorithm,
            grid,
            startTile,
            endTile
    })

    animatePath(traversedTiles,path,startTile,endTile,speed)
    setIsDisabled(true);
    isVisualizationRunningRef.current = true;
    setTimeout(() => {
        const newGrid = grid.slice();
        setGrid(newGrid);
        setIsGraphVisualized(true);
        setIsDisabled(false);
        isVisualizationRunningRef.current = false;
    }, (SLEEP_TIME * (traversedTiles.length + SLEEP_TIME*2) + EXTENDED_SLEEP_TIME * (path.length + 60) * SPEEDS.find((s) => s.value=== speed)!.value));
    

    }
    return(
        <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
            <div className="flex items-center justify-center w-full lg:justify-between sm:w-[52rem] ">
                <h1 className="hidden lg:flex w-[40%] text-2xl pl-1">
                    Pathfinding Visualizer
                </h1>
                <div className="flex flex-col items-center justify-start py-4 space-y-3 sm:items-end sm:justify-between sm:flex-row sm:space-y-0 sm:py-0 sm:space-x-4">
                    <Select 
                        label='Maze'
                        value={maze}
                        options={MAZES}
                        onChange={(e) => {
                            //handles generating maze
                            handleGenerateMaze(e.target.value as MazeType);
                        }}
                    />
                    <Select
                        label='Graph'
                        value={algorithm}
                        options={PATHFINDING_ALGORITHMS}
                        onChange={(e) => {
                            setAlgorithm(e.target.value as AlgorithmType)
                        }}
                    >
                    </Select>
                    <Select
                    label="Speed"
                    value={speed}
                    options={SPEEDS}
                    onChange={(e) => {
                        setSpeed(parseInt(e.target.value) as SpeedType);
                        
                    }}
                    ></Select>
                    <PlayButton
                    isDisabled={isDisabled}
                    isGraphVisualized={isGraphVisualized}
                    handleRunVisualizer={handleRunVisualizer}/>
                    
                    
                    
                    

                </div>
            </div>
        </div>
    )
}