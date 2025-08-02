import { END_TILE_CONFIGURATION, MAX_COL, MAX_ROW, START_TILE_CONFIGURATION, TILE_STYLE } from "./constants";
import { isEqual } from "./helper";
import type { GridType, TileType } from "./types";

export const resetGrid = ({
    grid,
    startTile = START_TILE_CONFIGURATION,
    endTile = END_TILE_CONFIGURATION,
    resetWeightTo,
}: {
    grid: GridType;
    startTile?: TileType;
    endTile?: TileType;
    resetWeightTo?: number; // ✅ Optional param to reset weights
}) => {
    for (let row = 0; row < MAX_ROW; row++) {
        for (let col = 0; col < MAX_COL; col++) {
            const tile = grid[row][col];

            tile.isWall = false;
            tile.isPath = false;
            tile.isTraversed = false;
            tile.distance = Infinity;
            tile.parent = null;

            // ✅ Reset weight if needed
            if (typeof resetWeightTo === "number") {
                tile.weight = resetWeightTo;
            }

            if (!isEqual(startTile, tile) && !isEqual(endTile, tile)) {
                const tileElement = document.getElementById(`${tile.row}-${tile.col}`);

                if (tileElement) {
                    tileElement.className = TILE_STYLE;

                    if (tile.row === MAX_ROW - 1) {
                        tileElement.classList.add("border-b");
                    }
                    if (tile.col === 0) {
                        tileElement.classList.add("border-l");
                    }
                }
            }
        }
    }
};
