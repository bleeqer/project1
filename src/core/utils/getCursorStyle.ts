import {ResizeDirection} from "@/core/types/ResizeDirection";

export function getResizeCursorStyle(direction: ResizeDirection) {
    switch (direction) {
        case "north":
        case "south":
            return "ns-resize";
        case "east":
        case "west":
            return "ew-resize";
        default:
            return "default";
    }
}
