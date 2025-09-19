import {ResizeDirection} from "@/core/types/ResizeDirection";

export interface ResizeMap {
    isDragging: boolean,
    resizeDirection: ResizeDirection,
    top: {
        top: number,
        left: number,
        width: number,
        height: number,
    },
    right: {
        top: number,
        left: number,
        width: number,
        height: number,
    },
    bottom: {
        top: number,
        left: number,
        width: number,
        height: number,
    },
    left: {
        top: number,
        left: number,
        width: number,
        height: number,
    }
}
