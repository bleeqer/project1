import { MouseEvent } from "react";
import {create} from "zustand";
import {ResizeDirection} from "@/core/types/ResizeDirection";
import {DeepPartial} from "@/core/types/DeepPartial";
import {deepMergeObjects} from "@/core/utils/deepMergeObjects";
import {ResizeMap} from "@/core/types/ReszieMap";


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
