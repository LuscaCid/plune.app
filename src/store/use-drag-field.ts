import { create } from "zustand";

interface DraggingFieldContext 
{
    isDraggingAnyField : boolean
    setIsDraggingAnyField: (list : boolean) => void;
} 
export const useDragField = create<DraggingFieldContext>((set) => ({
  isDraggingAnyField : false,
  setIsDraggingAnyField : (isDragging) => set({isDraggingAnyField : isDragging})
}));