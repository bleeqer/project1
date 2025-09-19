import React, {useRef, MouseEvent, useState, useEffect} from "react";
import { LeftPanel } from "@/components/layouts/LeftPanel";
import {EditorZone} from "@/components/layouts/EditorZone";
import {mouseEventPublisher} from "@/core/event/MouseEventPublisher";
import {ResizeSubscriber} from "@/core/event/ResizeSubscriber";
import {windowInitializer} from "@/core/init/WindowInitializer";
import {getResizeCursorStyle} from "@/core/utils/getCursorStyle";
import {useWindowStore} from "@/core/stores/WindowStore";

useWindowStore.setState({windowWidth: window.innerWidth});
useWindowStore.setState({windowHeight: window.innerHeight});
windowInitializer.init({width: window.innerWidth, height: window.innerHeight});
const resizeSubscriber = new ResizeSubscriber();
mouseEventPublisher.subscribe(resizeSubscriber);

export function Layout() {
    const ref = useRef(null);
    const [resizeHoverCursorStyle, setResizeHoverCursorStyle] = useState("default");
    const {windows} = useWindowStore();

    useEffect(() => {
        ref.current.style.cursor = resizeHoverCursorStyle;
    }, [ref, resizeHoverCursorStyle]);

    return (
        <div
            ref={ref}
            className="h-full w-full flex flex-row"
            onMouseDown={(event) => mouseEventPublisher.publish({type: "down", event})}
            onMouseMove={(event) => {
                mouseEventPublisher.publish({type: "move", event});
                let finalResizeDirection = null;
                windows.forEach((window) => {
                    const resizeDirection = resizeSubscriber.getResizeDirection(window, event);
                    if (resizeDirection) {
                        finalResizeDirection = resizeDirection;
                    }
                });
                setResizeHoverCursorStyle(getResizeCursorStyle(finalResizeDirection));
            }}
            onMouseUp={(event) => mouseEventPublisher.publish({type: "up", event})}
        >
            <LeftPanel />
            <EditorZone />
        </div>
    )
}
