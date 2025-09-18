import React, {useRef, MouseEvent, useState, useEffect} from "react";
import { LeftPanel } from "@/components/layouts/LeftPanel";
import {EditorZone} from "@/components/layouts/EditorZone";
import {ResizeHandler} from "@/core/handlers/ResizeHandler";
import {getResizeCursorStyle} from "@/core/utils/getCursorStyle";
import {useResizeStore} from "@/core/stores/ResizeStore";

export function Layout() {
    const ref = useRef(null);
    const [resizeHoverCursorStyle, setResizeHoverCursorStyle] = useState("default");
    const {resizeHandles} = useResizeStore();

    useEffect(() => {
        ref.current.style.cursor = resizeHoverCursorStyle;
    }, [ref, resizeHoverCursorStyle]);

    return (
        <div
            ref={ref}
            className="h-full w-full flex flex-row"
            onMouseDown={(event) => {
                ResizeHandler.findResizeTargets(event);
            }}
            onMouseMove={(event) => {
                ResizeHandler.resizeTargets(event);
                Object.entries(resizeHandles)
                    .forEach(entry => {
                        const resizeMap = entry[1];
                        const resizeDirection = ResizeHandler.getResizeDirection(resizeMap, event);
                        setResizeHoverCursorStyle(getResizeCursorStyle(resizeDirection));
                    });
            }}
            onMouseUp={(event) => {
                ResizeHandler.endResizing(event);
            }}
        >
            <LeftPanel />
            <EditorZone />
        </div>
    )
}
