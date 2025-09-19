import React, {useRef} from "react"
import {useWindowStore} from "@/core/stores/WindowStore";
import {Tab} from "@/components/tabs/Tab";

export function EditorZone() {
    const ref = useRef(null);
    const {windows} = useWindowStore();
    const editorZone = windows.find((window) => window.id === EditorZone.name);
    const editorZoneCoords = editorZone.coords;
    const tabs = editorZone.tabs;
    tabs.push({title: "TAB1", content: "hi"})

    return (
        <div
            ref={ref}
            className="border absolute overflow-hidden"
            style={{
                top: editorZoneCoords.y,
                left: editorZoneCoords.x,
                width: editorZoneCoords.width,
                height: editorZoneCoords.height,
            }}
        >
            <div className="h-[50px] flex flex-row">
            {
                    tabs.map(tab => {
                        return Tab(tab);
                    })
                }
            </div>
            {
                tabs.length > 0 ?
                    <textarea
                        className="w-full h-full p-[15px] outline-none"
                    >
                    </textarea>
                    : <div className="w-full h-full bg-blue-200 flex justify-center items-center">
                    EDITOR
                    </div>
            }

        </div>
    )
}
