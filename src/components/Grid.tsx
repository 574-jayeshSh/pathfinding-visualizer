import { twMerge } from "tailwind-merge";
import { usePathfiding } from "../hooks/usePathfinding.hook";
import { MAX_ROW } from "../utils/constants";
import { Tile } from "./Tile";
import { useState, type MutableRefObject } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helper";

export function Grid({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}) {
  const { grid, setGrid } = usePathfiding();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mode, setMode] = useState<"wall" | "weight">("wall"); // ✅ Mode state

  const handleMouseDown = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) return;
    setIsMouseDown(true);
    const newGrid = createNewGrid(grid, row, col, mode); // ✅ Pass mode
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) return;
    if (isMouseDown) {
      const newGrid = createNewGrid(grid, row, col, mode); // ✅ Pass mode
      setGrid(newGrid);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      {/* ✅ Mode Toggle */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setMode("wall")}
          className={twMerge(
            "px-4 py-2 rounded font-semibold transition",
            mode === "wall" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
          )}
        >
          Wall Mode
        </button>
        <button
          onClick={() => setMode("weight")}
          className={twMerge(
            "px-4 py-2 rounded font-semibold transition",
            mode === "weight" ? "bg-green-600 text-white" : "bg-gray-200 text-black"
          )}
        >
          Weight Mode
        </button>
      </div>

      {/* ✅ Grid */}
      <div
        className={twMerge(
          "flex flex-col items-center justify-center border-sky-300",
          `lg:min-h-[${MAX_ROW * 17}px] md:min-h-[${MAX_ROW * 15}px] 
           xs:min-h-[${MAX_ROW * 8}px] min-h-[${MAX_ROW * 7}px]`,
          `lg:w-[${MAX_ROW * 17}px] md:w-[${MAX_ROW * 15}px] 
           xs:w-[${MAX_ROW * 8}px] w-[${MAX_ROW * 7}px]`
        )}
      >
        {grid.map((r, rowIndex) => (
          <div key={rowIndex} className="flex">
            {r.map((tile, tileIndex) => {
              const {
                row,
                col,
                isStart,
                isEnd,
                isTraversed,
                isWall,
                isPath,
                weight,
              } = tile;
              return (
                <Tile
                  key={tileIndex}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isEnd={isEnd}
                  isTraversed={isTraversed}
                  isWall={isWall}
                  isPath={isPath}
                  weight={weight}
                  handleMouseDown={() => handleMouseDown(row, col)}
                  handleMouseUp={handleMouseUp}
                  handleMouseEnter={() => handleMouseEnter(row, col)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
