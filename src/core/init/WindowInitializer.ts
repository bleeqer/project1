import {useWindowStore} from "@/core/stores/WindowStore";
import {LeftPanel} from "@/components/layouts/LeftPanel";
import {EditorZone} from "@/components/layouts/EditorZone";

class WindowInitializer {
    init(screenCoords: {width: number, height: number}): void {
        useWindowStore.getState().addWindow({
            id: LeftPanel.name,
            isResizing: false,
            resizeDirection: null,
            coords: {
                row: 0,
                x: 0,
                y: 0,
                width: 200,
                height: screenCoords.height
            },
            tabs: [],
        })
        useWindowStore.getState().addWindow({
            id: EditorZone.name,
            isResizing: false,
            resizeDirection: null,
            coords: {
                row: 0,
                x: 200,
                y: 0,
                width: screenCoords.width - 200,
                height: screenCoords.height
            },
            tabs: [],
        })
    }
}

export const windowInitializer = new WindowInitializer();
