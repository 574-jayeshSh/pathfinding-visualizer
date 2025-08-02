import { useContext } from "react"
import { PathfindingContext } from "../context/pathfinding.context"


export const usePathfiding = ()=>{
    const context = useContext(PathfindingContext);

    if(!context) {
        throw new Error("usePathfiding must be used within a PathfindingProvider");
    }

    return context;
}