import {getResizeHandle} from "@/core/handles/getResizeHandle";

describe("resizeHandle", () => {
    it("네변 좌표 정상 계산", () => {
        const rect = {x: 0, y: 0, width: 100, height: 100};
        const result = getResizeHandle(rect);
        expect(result.top).toStrictEqual({
            top: rect.y,
            left: rect.x,
            width: rect.width,
            height: 0,
        });
        expect(result.right).toStrictEqual({
            top: rect.y,
            left: rect.x + rect.width,
            width: 0,
            height: rect.height,
        });
        expect(result.bottom).toStrictEqual({
            top: rect.y + rect.height,
            left: rect.x,
            width: rect.width,
            height: 0,
        });
        expect(result.left).toStrictEqual({
            top: rect.y,
            left: rect.x,
            width: 0,
            height: rect.height,
        });
    });
});
