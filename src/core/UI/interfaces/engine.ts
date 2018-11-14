import { MazeCell } from "../../../models/non-living/classes/maze-cell";
import { Ihero } from "../../../models/living/interfaces/hero";

export interface Iengine {
    currentX: number;
    currentY: number;
    start(map: MazeCell[][], hero: Ihero): void;
}
