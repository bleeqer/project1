import React, {MouseEvent} from "react";
import {EventWithType} from "@/core/event/EventWithType";

export class MouseEventWithType implements EventWithType<MouseEvent> {
    type: "down" | "move" | "up";
    event: MouseEvent;
}
