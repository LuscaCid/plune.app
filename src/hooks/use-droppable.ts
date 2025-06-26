import { FlowNodeType } from "@/@types/Flow";
import { useCallback } from "react";

export function useDroppable() {
  const onDragStartNewNode = useCallback((event: React.DragEvent<HTMLButtonElement>, type: FlowNodeType) => {
    event.dataTransfer!.setData('application/reactflow', type);
    event.dataTransfer!.effectAllowed = 'move';
  }, []);



  return {
    onDragStartNewNode
  }
}