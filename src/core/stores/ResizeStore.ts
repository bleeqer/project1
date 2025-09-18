import { MouseEvent } from "react";
import {create} from "zustand";
import {ResizeDirection} from "@/core/types/ResizeDirection";
import {DeepPartial} from "@/core/types/DeepPartial";
import {deepMergeObjects} from "@/core/utils/deepMergeObjects";

export interface ResizeMap {
    isDragging: boolean,
    resizeDirection: ResizeDirection,
    top: {
        top: number,
        left: number,
        width: number,
        height: number,
    },
    right: {
        top: number,
        left: number,
        width: number,
        height: number,
    },
    bottom: {
        top: number,
        left: number,
        width: number,
        height: number,
    },
    left: {
        top: number,
        left: number,
        width: number,
        height: number,
    }
}

interface ResizeState {
    resizeHandles: Record<string, ResizeMap> | null;
    setResizeHandle: (box: Record<string, ResizeMap>) => void;
    updateResizeHandle: (id: string, changes: DeepPartial<ResizeMap>) => void;
    setResizeOn: (id: string) => void;
    setResizeDirection: (id: string, direction: ResizeDirection) => void;
}

export const useResizeStore = create<ResizeState>((set) => ({
    resizeHandles: {},
    setResizeHandle: (box: Record<string, ResizeMap>) => set((state) => (
        {resizeHandles: {...state.resizeHandles, ...box}}
    )),
    updateResizeHandle: (id: string, changes: DeepPartial<ResizeMap>) => set((state) => ({
        resizeHandles: {
            ...state.resizeHandles,
            [id]: {
                ...deepMergeObjects(state.resizeHandles[id], changes)
            }
        }
    })),
    setResizeOn: (id: string) => set((state) => ({
        resizeHandles: {
            ...state.resizeHandles,
            [id]: {
                ...state.resizeHandles[id],
                isDragging: true,
            }
        }
    })),

    setResizeDirection: (id: string, direction: ResizeDirection) => set((state) => ({
        resizeHandles: {
            ...state.resizeHandles,
            [id]: {
                ...state.resizeHandles[id],
                resizeDirection: direction
            }
        }
    })),
}));
