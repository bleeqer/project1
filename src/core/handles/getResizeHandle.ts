
export function getResizeHandle({x, y, width, height}: {x: number, y: number, width: number, height: number }) {
    return {
        top: {
            top: y,
            left: x,
            width: width,
            height: 0,
        },
        right: {
            top: y,
            left: x + width,
            width: 0,
            height: height,
        },
        bottom: {
            top: y + height,
            left: x,
            width: width,
            height: 0
        },
        left: {
            top: y,
            left: x,
            width: 0,
            height: height,
        }
    }
}
