import React from "react";
import { LeftPanel } from "@/components/layouts/LeftPanel";
import {EditorZone} from "@/components/layouts/EditorZone";

export function Layout() {
    return (
        <div className="h-full w-full flex flex-1 flex-row">
            <LeftPanel />
            <EditorZone />
        </div>
    )
}
