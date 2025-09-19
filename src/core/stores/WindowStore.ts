import {WindowMap} from "@/core/types/WindowMap";
import {create} from "zustand";
import {deepMergeObjects} from "@/core/utils/deepMergeObjects";
import {DeepPartial} from "@/core/types/DeepPartial";

interface WindowState {
    windowWidth: number,
    windowHeight: number,
    windows: WindowMap[],
    addWindow: (windowMap: WindowMap) => void;
    updateWindow: (windowMap: DeepPartial<WindowMap>) => void;
    updateWindows: (windowMaps: DeepPartial<WindowMap>[]) => void;
}

export const useWindowStore = create<WindowState>((set) => ({
    windowWidth: 0,
    windowHeight: 0,
    windows: [],
    addWindow: (windowMap: WindowMap) => (set((state) => {
        const existing = state.windows.find((window) => window.id === windowMap.id);
        if (!existing) {
            state.windows.push(windowMap);
        }
        return state;
    })),
    updateWindow: (windowMap: DeepPartial<WindowMap>) => (set((state) => {
        const target = state.windows.find(window => window.id === windowMap.id);
        return {
            windows: [
                ...state.windows,
                ...deepMergeObjects(target, windowMap)
            ]
        }

    })),
    updateWindows: (windowMaps: DeepPartial<WindowMap>[]) => (set((state) => {
        if (windowMaps.length === 0) return;
        const merges = windowMaps.map(update => {
            const original = state.windows.find((window) => window.id === update.id);
            return deepMergeObjects(original, update);
        });
        const updates = state.windows.map(window => {
            const merge = merges.find(merge => merge.id === window.id);
            if (merge) {
                return merge;
            } else {
                return window;
            }
        });
        return {
            windows: updates
        };
    })),
}))
