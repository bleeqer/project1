import React, {useEffect, useRef, useState} from "react"
import {ResizeHandler} from "@/core/handlers/ResizeHandler";
import {useResizeStore} from "@/core/stores/ResizeStore";
import {getResizeCursorStyle} from "@/core/utils/getCursorStyle";

export function LeftPanel() {
    const ref = useRef(null);
    const {resizeHandles} = useResizeStore();
    let coords = {
        x: 0,
        y: 0,
        width: 200,
        height: 500
    };

    if (resizeHandles[LeftPanel.name]) {
        coords = {
            x: resizeHandles[LeftPanel.name].left.left,
            y: resizeHandles[LeftPanel.name].top.top,
            width: resizeHandles[LeftPanel.name].top.width,
            height: resizeHandles[LeftPanel.name].left.height,
        };
    }

    useEffect(() => {
        ResizeHandler.addResizeTarget(
            LeftPanel.name,
            {
                x: coords.x,
                y: coords.y,
                width: coords.width,
                height: coords.height,
            }
        )
    }, []);

    return (
        <div
            ref={ref}
            className="border absolute"
            style={{
                boxSizing: "content-box",
                top: coords.y,
                left: coords.x,
                width: coords.width,
                height: coords.height,
            }}
        >
            Left Panel
        </div>
    )
}
