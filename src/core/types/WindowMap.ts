import {ResizeDirection} from "@/core/types/ResizeDirection";

interface WindowCoords {
    row: number,
    x: number,
    y: number,
    width: number,
    height: number,
}

export interface WindowMap {
    id: string;
    isResizing: boolean;
    resizeDirection: ResizeDirection;
    coords: WindowCoords;
    tabs: any[];
}
