import React, {useState} from "react"

export function LeftPanel() {
    const [width, setWidth] = useState({width: 200});
    const [dragging, setDragging] = useState(false);
    return (
        <div style={ width }
            onMouseDown={(event) => {

            }}>
            Left Panel
        </div>
    )
}
