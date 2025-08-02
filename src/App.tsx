import {  useRef } from "react"
import { Grid } from "./components/Grid"
import { PathfindingProvider } from "./context/pathfinding.context"
import { SpeedProvider } from "./context/speed.context"
import { TileProvider } from "./context/Tile.context"
import { Nav } from "./components/Nav"

function App() {
  const isVisualizationRunningRef = useRef(false);
   
  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
      <div className="flex flex-col w-screen h-screen">
  <Nav isVisualizationRunningRef={isVisualizationRunningRef} />
  <div className="flex flex-grow">
  {/* Grid Area */}
  <div className="flex-grow overflow-auto">
    <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
  </div>

  {/* Description Panel */}
  <div className="w-[300px] p-6 bg-[#1e1e1e] text-gray-200 border-l border-gray-700 overflow-y-auto hidden lg:block">
  <h2 className="mb-4 text-2xl font-bold text-white"> Pathfinding Visualizer</h2>

  <p className="mb-5 text-base leading-relaxed text-gray-300">
    Build, block, and explore! This tool helps you visualize how popular pathfinding algorithms traverse a grid to find the shortest path between two points. Add <span className="font-semibold text-white">walls</span> to block paths or <span className="font-semibold text-white">weights</span> to slow them down (Shift + Click).
  </p>

  <h3 className="mb-3 text-lg font-semibold text-white"> Algorithms Supported</h3>
  <ul className="space-y-2 text-base text-gray-300 list-disc list-inside">
    <li><span className="font-semibold text-white">Dijkstra's</span> – Weighted & guarantees the shortest path.</li>
    <li><span className="font-semibold text-white">BFS</span> – Unweighted, but also ensures the shortest path.</li>
    <li><span className="font-semibold text-white">DFS</span> – Explores deeply; fast but not always optimal.</li>
    <li><span className="font-semibold text-white">A*</span> – (Coming soon) Smart and efficient with heuristics.</li>
  </ul>

  <div className="pt-4 mt-6 text-sm text-gray-400 border-t border-gray-600">
     Tip: Use <span className="font-semibold text-white">Shift + Click</span> to assign weights to tiles.
  </div>
</div>

</div>

</div>

        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>
  )
}

export default App
