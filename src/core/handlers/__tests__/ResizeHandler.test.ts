import { MouseEvent } from "react";
import {ResizeHandler} from "@/core/handlers/ResizeHandler";
import {useResizeStore} from "@/core/stores/ResizeStore";

describe("ResizeHandler", () => {

    beforeEach(() => {
        ResizeHandler.resetResizeTarget();
        ResizeHandler.addResizeTarget(
            "left-panel",
            {x: 0, y: 0, width: 100, height: 200,}
        );
    })

    it("threshold 안에 진입할 경우 해당 대상 isDragging 플래그 켜짐", () => {
        const downEvent = {clientX: 100, clientY: 100} as MouseEvent;
        ResizeHandler.findResizeTargets(downEvent);
        expect(useResizeStore.getState().resizeHandles["left-panel"].isDragging).toBeTruthy();
    });

    it("threshold 안에 진입하지 않을 경우 isDragging 플래그 안켜짐", () => {
        const downEvent = {clientX: 111, clientY: 100} as MouseEvent;
        ResizeHandler.findResizeTargets(downEvent);
        expect(useResizeStore.getState().resizeHandles["left-panel"].isDragging).toBeFalsy();
    });

    it("윗변 클릭 시 resizeDirection = north", () => {
        const downEvent = {clientX: 50, clientY: 0} as MouseEvent;
        ResizeHandler.findResizeTargets(downEvent);
        expect(useResizeStore.getState().resizeHandles["left-panel"].resizeDirection).toBe("north");
    });

    it("오른쪽변 클릭 시 resizeDirection = east", () => {
        const downEvent = {clientX: 100, clientY: 100} as MouseEvent;
        ResizeHandler.findResizeTargets(downEvent);
        expect(useResizeStore.getState().resizeHandles["left-panel"].resizeDirection).toBe("east");
    });

    it("아래쪽변 클릭 시 resizeDirection = south", () => {
        const downEvent = {clientX: 50, clientY: 200} as MouseEvent;
        ResizeHandler.findResizeTargets(downEvent);
        expect(useResizeStore.getState().resizeHandles["left-panel"].resizeDirection).toBe("south");
    });

    it("왼쪽변 클릭 시 resizeDirection = west", () => {
        const downEvent = {clientX: 0, clientY: 100} as MouseEvent;
        ResizeHandler.findResizeTargets(downEvent);
        expect(useResizeStore.getState().resizeHandles["left-panel"].resizeDirection).toBe("west");
    });

    it("윗변 클릭 후 위쪽으로 드래그 시 해당 대상 y 감소함 & height 증가함", () => {
        const downEvent = {clientX: 50, clientY: 0} as MouseEvent;
        ResizeHandler.findResizeTargets(downEvent);
        const moveEvent = {clientX: 50, clientY: -10} as MouseEvent;
        ResizeHandler.resizeTargets(moveEvent);
        expect(useResizeStore.getState().resizeHandles["left-panel"].top.top).toBe(-10);
        expect(useResizeStore.getState().resizeHandles["left-panel"].left.height).toBe(210);
    });

    it("윗변 클릭 후 아래쪽으로 드래그 시 해당 대상 y 증가함 & height 감소함", () => {
        const downEvent = {clientX: 50, clientY: 0} as MouseEvent;
        ResizeHandler.findResizeTargets(downEvent);
        const moveEvent = {clientX: 50, clientY: 10} as MouseEvent;
        ResizeHandler.resizeTargets(moveEvent);
        expect(useResizeStore.getState().resizeHandles["left-panel"].top.top).toBe(10);
        expect(useResizeStore.getState().resizeHandles["left-panel"].left.height).toBe(190);
    });

    it("왼쪽변 클릭 후 왼쪽으로 드래그 시 해당 대상 x 감소함 & width 증가함", () => {
        const downEvent = {clientX: 0, clientY: 100} as MouseEvent;
        ResizeHandler.findResizeTargets(downEvent);
        const moveEvent = {clientX: -10, clientY: 100} as MouseEvent;
        ResizeHandler.resizeTargets(moveEvent);
        expect(useResizeStore.getState().resizeHandles["left-panel"].left.left).toBe(-10);
        expect(useResizeStore.getState().resizeHandles["left-panel"].top.width).toBe(110);
    });

    it("왼쪽변 클릭 후 오른쪽으로 드래그 시 해당 대상 x 증가함 & width 감소함", () => {
        const downEvent = {clientX: 0, clientY: 100} as MouseEvent;
        ResizeHandler.findResizeTargets(downEvent);
        const moveEvent = {clientX: 10, clientY: 100} as MouseEvent;
        ResizeHandler.resizeTargets(moveEvent);
        expect(useResizeStore.getState().resizeHandles["left-panel"].left.left).toBe(10);
        expect(useResizeStore.getState().resizeHandles["left-panel"].top.width).toBe(90);
    });

    it("오른쪽변 클릭 후 왼쪽으로 드래그 시 해당 대상 x 유지됨 & width 감소함", () => {
        const downEvent = {clientX: 100, clientY: 100} as MouseEvent;
        ResizeHandler.findResizeTargets(downEvent);
        const moveEvent = {clientX: 90, clientY: 100} as MouseEvent;
        ResizeHandler.resizeTargets(moveEvent);
        expect(useResizeStore.getState().resizeHandles["left-panel"].left.left).toBe(0);
        expect(useResizeStore.getState().resizeHandles["left-panel"].top.width).toBe(90);
    });

    it("오른쪽변 클릭 후 오른쪽으로 드래그 시 해당 대상 x 유지됨 & width 증가함", () => {
        const downEvent = {clientX: 100, clientY: 100} as MouseEvent;
        ResizeHandler.findResizeTargets(downEvent);
        const moveEvent = {clientX: 110, clientY: 100} as MouseEvent;
        ResizeHandler.resizeTargets(moveEvent);
        expect(useResizeStore.getState().resizeHandles["left-panel"].left.left).toBe(0);
        expect(useResizeStore.getState().resizeHandles["left-panel"].top.width).toBe(110);
    });

    it("아래쪽변 클릭 후 위쪽으로 드래그 시 해당 대상 y 유지됨 & height 감소함", () => {
        const downEvent = {clientX: 50, clientY: 200} as MouseEvent;
        ResizeHandler.findResizeTargets(downEvent);
        const moveEvent = {clientX: 50, clientY: 190} as MouseEvent;
        ResizeHandler.resizeTargets(moveEvent);
        expect(useResizeStore.getState().resizeHandles["left-panel"].top.top).toBe(0);
        expect(useResizeStore.getState().resizeHandles["left-panel"].left.height).toBe(190);
    });

    it("아래쪽변 클릭 후 아래쪽으로 드래그 시 해당 대상 y 유지됨 & height 증가함", () => {
        const downEvent = {clientX: 50, clientY: 200} as MouseEvent;
        ResizeHandler.findResizeTargets(downEvent);
        const moveEvent = {clientX: 50, clientY: 210} as MouseEvent;
        ResizeHandler.resizeTargets(moveEvent);
        expect(useResizeStore.getState().resizeHandles["left-panel"].top.top).toBe(0);
        expect(useResizeStore.getState().resizeHandles["left-panel"].left.height).toBe(210);
    });
});
