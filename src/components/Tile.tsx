import { twMerge } from "tailwind-merge";
import {
  END_TILE_STYLE,
  MAX_ROW,
  PATH_TILE_STYLE,
  START_TILE_STYLE,
  TILE_STYLE,
  TRAVERSED_TILE_STYLE,
  WALL_TILE_STYLE,
} from "../utils/constants";

interface MouseFunction {
  (row: number, col: number): void;
}

export function Tile({
  row,
  col,
  isStart,
  isEnd,
  isTraversed,
  isWall,
  isPath,
  weight, // ✅ New prop
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
}: {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isTraversed: boolean;
  isWall: boolean;
  isPath: boolean;
  weight: number; // ✅ New prop
  handleMouseDown: MouseFunction;
  handleMouseUp: MouseFunction;
  handleMouseEnter: MouseFunction;
}) {
  let tileTyleStyle;

  if (isStart) {
    tileTyleStyle = START_TILE_STYLE;
  } else if (isEnd) {
    tileTyleStyle = END_TILE_STYLE;
  } else if (isWall) {
    tileTyleStyle = WALL_TILE_STYLE;
  } else if (isPath) {
    tileTyleStyle = PATH_TILE_STYLE;
  } else if (isTraversed) {
    tileTyleStyle = TRAVERSED_TILE_STYLE;
  } else {
    tileTyleStyle = TILE_STYLE;
  }

  // ✅ Border styling
  const borderStyle =
    row === MAX_ROW - 1 ? "border-b" : col === 0 ? "border-l" : "";
  const edgeStyle = row === 0 && col === MAX_ROW - 1 ? "border-l" : "";

  // ✅ Weighted color style (non-wall, non-special tiles)
  const weightStyle =
    !isStart && !isEnd && !isWall && weight > 1
      ? weight >= 10
        ? "bg-green-600 text-white"
        : weight >= 5
        ? "bg-green-400 text-white"
        : "bg-green-200"
      : "";

  return (
    <div
      className={twMerge(
        tileTyleStyle,
        borderStyle,
        edgeStyle,
        weightStyle,
        "text-[10px] font-semibold flex items-center justify-center"
      )}
      id={`${row}-${col}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={() => handleMouseUp(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
    >
      {/* ✅ Display weight if applicable */}
      {!isWall && !isStart && !isEnd && weight > 1 ? weight : ""}
    </div>
  );
}
