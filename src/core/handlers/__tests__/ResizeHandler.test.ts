import ResizeHandler from "@/core/handlers/ResizeHandler";

describe("ResizeHandler", () => {

    let resizeHandler: ResizeHandler;
    beforeEach(() => {
        resizeHandler = new ResizeHandler("left-panel");
    })

   it("테두리를 mouse down하면 resizing 플래그가 켜짐", () => {
      const downEvent = {x: 0, y: 0, width: 100, height: 500, mouseX: 100, mouseY: 250};
        resizeHandler.isOnThreshold(downEvent);
        expect((resizeHandler as any).isDragging).toBe(true);
   });

    // it("테두리를 벗어나 mouse down하면 resizing 플래그가 켜지지 않음", () => {
    //     const downEvent = {x: 0, y: 0, width: 100, height: 500, mouseX: 100, mouseY: 250};
    //     resizeHandler.isOnThreshold(downEvent);
    //     expect((resizeHandler as any).isDragging).toBe(true);
    // });
});
