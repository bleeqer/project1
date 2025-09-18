import { MouseEvent } from "react";
import {ResizeMap, useResizeStore} from "@/core/stores/ResizeStore";
import {ResizeDirection} from "@/core/types/ResizeDirection";

export class ResizeHandler {
    static threshold: number = 10;

    static addResizeTarget(id: string, coords: { x: number, y: number, width: number, height: number }): void {
        const resizeMap = {
            [id]: {
                isDragging: false,
                resizeDirection: null as null,
                currentX: null as null,
                currentY: null as null,
                top: {
                    top: coords.y,
                    left: coords.x,
                    width: coords.width,
                    height: 1,
                },
                right: {
                    top: coords.y,
                    left: coords.x + coords.width,
                    width: 1,
                    height: coords.height
                },
                bottom: {
                    top: coords.y + coords.height,
                    left: coords.x,
                    width: coords.x + coords.width,
                    height: 1,
                },
                left: {
                    top: coords.y,
                    left: coords.x,
                    width: 1,
                    height: coords.height
                }
            }
        }
        useResizeStore.getState().setResizeHandle(resizeMap);
    }

    static resetResizeTarget() {
        useResizeStore.setState({resizeHandles: {}});
    }

    static findResizeTargets(mouseEvent: MouseEvent): void {
        Object.entries(useResizeStore.getState().resizeHandles)
            .forEach((entry) => {
                const id = entry[0];
                const resizeMap = entry[1];
                const resizeDirection = this.getResizeDirection(resizeMap, mouseEvent);
                if (resizeDirection) {
                    useResizeStore.getState().setResizeOn(id);
                    useResizeStore.getState().setResizeDirection(id, resizeDirection);
                }
            });
    }

    static resizeTargets(mouseEvent: MouseEvent): void {
        Object.entries(useResizeStore.getState().resizeHandles)
            .forEach((entry) => {
                const id = entry[0];
                const resizeMap = entry[1];

                if (!resizeMap.isDragging) return;

                switch (resizeMap.resizeDirection) {
                    case "north":
                        const northDiff = mouseEvent.clientY - resizeMap.top.top;
                        useResizeStore.getState().updateResizeHandle(
                            id,
                            {
                                top: {
                                    top: resizeMap.top.top + northDiff,
                                },
                                left: {
                                    height: resizeMap.left.height - northDiff
                                }
                            }
                        );
                        break;
                    case "west":
                        const westDiff = mouseEvent.clientX - resizeMap.left.left;
                        useResizeStore.getState().updateResizeHandle(
                            id,
                            {
                                left: {
                                    left: resizeMap.left.left + westDiff
                                },
                                top: {
                                    width: resizeMap.top.width - westDiff
                                }
                            }
                        )
                        break;
                    case "east":
                        const eastDiff = mouseEvent.clientX - (resizeMap.left.left + resizeMap.top.width);
                        useResizeStore.getState().updateResizeHandle(
                            id,
                            {
                                top: {
                                    width: resizeMap.top.width + eastDiff
                                },
                            }
                        )
                        break;
                    case "south":
                        const southDiff = mouseEvent.clientY - (resizeMap.top.top + resizeMap.left.height);
                        useResizeStore.getState().updateResizeHandle(
                            id,
                            {
                                left: {
                                    height: resizeMap.left.height + southDiff
                                }
                            }
                        );
                        break;
                }
            })
    }

    static endResizing(mouseEvent: MouseEvent) {
        Object.entries(useResizeStore.getState().resizeHandles)
            .forEach((entry) => {
                const id = entry[0];
                useResizeStore.getState().updateResizeHandle(
                    id,
                    {
                        isDragging: false,
                        resizeDirection: null,
                    }
                )
            })
    }

    static getResizeDirection(resizeMap: ResizeMap, mouseEvent: MouseEvent): ResizeDirection {
        if (
            resizeMap.top.top - this.threshold <= mouseEvent.clientY &&
            resizeMap.top.top + this.threshold >= mouseEvent.clientY &&
            resizeMap.top.left - this.threshold <= mouseEvent.clientX &&
            resizeMap.top.left + resizeMap.top.width + this.threshold >= mouseEvent.clientX
        ) {
            return "north";
        } else if (
            resizeMap.left.left - this.threshold <= mouseEvent.clientX &&
            resizeMap.left.left + this.threshold >= mouseEvent.clientX &&
            resizeMap.left.top - this.threshold <= mouseEvent.clientY &&
            resizeMap.left.top + resizeMap.left.height + this.threshold >= mouseEvent.clientY
        ) {
            return "west";
        } else if (
            resizeMap.left.left + resizeMap.top.width - this.threshold <= mouseEvent.clientX &&
            resizeMap.left.left + resizeMap.top.width + this.threshold >= mouseEvent.clientX &&
            resizeMap.left.top - this.threshold <= mouseEvent.clientY &&
            resizeMap.left.top + resizeMap.left.height + this.threshold >= mouseEvent.clientY
        ) {
            return "east";
        } else if (
            resizeMap.top.top + resizeMap.left.height - this.threshold <= mouseEvent.clientY &&
            resizeMap.top.top + resizeMap.left.height + this.threshold >= mouseEvent.clientY &&
            resizeMap.top.left - this.threshold <= mouseEvent.clientX &&
            resizeMap.top.left + resizeMap.top.width + this.threshold >= mouseEvent.clientX
        ) {
            return "south";
        }
    }
}
