import {MouseEvent} from "react";
import {useResizeStore} from "@/core/stores/ResizeStore";
import {ResizeDirection} from "@/core/types/ResizeDirection";
import {MouseEventWithType} from "@/core/event/MouseEventWithType";
import {EventSubscriber} from "@/core/event/EventSubscriber";
import {useWindowStore} from "@/core/stores/WindowStore";
import {DeepPartial} from "@/core/types/DeepPartial";
import {WindowMap} from "@/core/types/WindowMap";

export class ResizeSubscriber implements EventSubscriber<MouseEventWithType> {
    id: "resize";
    threshold: number = 10;

    addResizeTarget(id: string, coords: { x: number, y: number, width: number, height: number }): void {
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

    resetResizeTarget() {
        useResizeStore.setState({resizeHandles: {}});
    }

    findResizeTargets(mouseEvent: MouseEvent): void {
        const updatedMaps: DeepPartial<WindowMap>[] = [];
        Object.entries(useWindowStore.getState().windows)
            .forEach((window) => {
                const windowMap = window[1];
                const id = windowMap.id;
                const resizeDirection = this.getResizeDirection(windowMap, mouseEvent);
                if (resizeDirection) {
                    updatedMaps.push({
                       id,
                       isResizing: true,
                        resizeDirection: resizeDirection,
                    });
                }
            });
        if (updatedMaps.length > 0) {
            useWindowStore.getState().updateWindows(updatedMaps);
        }
    }

    resizeTargets(mouseEvent: MouseEvent): void {
        const updatedMaps: DeepPartial<WindowMap>[] = [];
        Object.entries(useWindowStore.getState().windows)
            .forEach((window) => {
                const windowMap = window[1];
                if (!windowMap.isResizing) return;
                const id = windowMap.id;
                const coords = windowMap.coords;
                const resizeDirection = windowMap.resizeDirection;
                let row = coords.row;
                let x = coords.x;
                let y = coords.y;
                let width = coords.width;
                let height = coords.height;
                switch (resizeDirection) {
                    case "north":
                        const northDiff = mouseEvent.clientY - y;
                        height = height + northDiff;
                        y = northDiff;
                        break;
                    case "east":
                        const eastDiff = mouseEvent.clientX - (x + width);
                        width = width + eastDiff;
                        break;
                    case "west":
                        const westDiff = mouseEvent.clientX - x;
                        x = x + westDiff;
                        width = width - westDiff;
                        break;
                    case "south":
                        const southDiff = mouseEvent.clientY - (y + height);
                        height = height + southDiff;
                        break;
                }
                updatedMaps.push({
                    id,
                    coords: {
                        row, x, y, width, height
                    }
                });
            });
        if (updatedMaps.length > 0) {
            useWindowStore.getState().updateWindows(this.limitWidth(updatedMaps));
        }
    }

    endResizing(mouseEvent: MouseEvent) {
        const updatedMaps: DeepPartial<WindowMap>[] = [];
        Object.entries(useWindowStore.getState().windows)
            .forEach((window) => {
                const windowMap = window[1];
                const id = windowMap.id;
                updatedMaps.push({
                    id,
                    isResizing: false,
                });
            })
        if (updatedMaps.length > 0) {
            useWindowStore.getState().updateWindows(updatedMaps);
        }
    }

    getResizeDirection(windowMap: WindowMap, mouseEvent: MouseEvent): ResizeDirection {
        let resizeDirection: ResizeDirection = null;
        const coords = windowMap.coords;
        if (
            coords.y - this.threshold <= mouseEvent.clientY &&
            coords.y + this.threshold >= mouseEvent.clientY &&
            coords.x - this.threshold <= mouseEvent.clientX &&
            coords.x + coords.width + this.threshold >= mouseEvent.clientX
        ) {
            resizeDirection = "north";
        } else if (
            coords.x + coords.width - this.threshold <= mouseEvent.clientX &&
            coords.x + coords.width + this.threshold >= mouseEvent.clientX &&
            coords.y - this.threshold <= mouseEvent.clientY &&
            coords.y + coords.height + this.threshold >= mouseEvent.clientY

        ) {
            resizeDirection = "east";
        } else if (
            coords.x - this.threshold <= mouseEvent.clientX &&
            coords.x + this.threshold >= mouseEvent.clientX &&
            coords.y - this.threshold <= mouseEvent.clientY &&
            coords.y + coords.height + this.threshold >= mouseEvent.clientY
        ) {
            resizeDirection = "west";
        } else if (
            coords.y + coords.height - this.threshold <= mouseEvent.clientY &&
            coords.y + coords.height + this.threshold >= mouseEvent.clientY &&
            coords.x - this.threshold <= mouseEvent.clientX &&
            coords.x + coords.width + this.threshold >= mouseEvent.clientX
        ) {
            resizeDirection = "south";
        }
        return resizeDirection;
    }

    limitWidth(updates: DeepPartial<WindowMap>[]): DeepPartial<WindowMap>[] {
        const rowWidthMap: Record<string, number> = {};
        return updates.map(update => {
            const row = update.coords.row;
            if (!rowWidthMap[row] === undefined) {
                rowWidthMap[row] = 0;
            }
            rowWidthMap[row] += update.coords.width;
            if (useWindowStore.getState().windowWidth <= rowWidthMap[row]) {
                update.coords.width = update.coords.width - (rowWidthMap[row] - useWindowStore.getState().windowWidth)
            }
            return update;
        });


    }

    notify(mouseEventWithType: MouseEventWithType) {
        switch (mouseEventWithType.type) {
            case "down":
                this.findResizeTargets(mouseEventWithType.event);
                break;
            case "move":
                this.resizeTargets(mouseEventWithType.event);
                break;
            case "up":
                this.endResizing(mouseEventWithType.event);
                break;
        }
    }
}
