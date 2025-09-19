import React, {useRef} from "react"
import {useWindowStore} from "@/core/stores/WindowStore";

export function LeftPanel() {
    const ref = useRef(null);
    const {windows} = useWindowStore();
    const leftPanel = windows.find((window) => window.id === LeftPanel.name);
    const leftPanelCoords = leftPanel.coords;

    return (
        <div
            ref={ref}
            className="border absolute"
            style={{
                top: leftPanelCoords.y,
                left: 0,
                width: leftPanelCoords.width,
                height: leftPanelCoords.height,
            }}
        >
            Left Panel
        </div>
    )
}
