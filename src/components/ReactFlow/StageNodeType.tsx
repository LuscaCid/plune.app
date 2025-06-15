import { Handle, NodeResizer, NodeToolbar, Position, type NodeProps } from "reactflow";
import React from "react";

export const StageNodeType = React.memo((nodeProps: NodeProps) => {
  return (
    <div>
      <NodeToolbar
        className="bg-zinc-300/80 backdrop:blur-md dark:bg-zinc-900 p-1 shadow-md rounded-md flex gap-1 -top-3"
        isVisible={nodeProps.selected}
        position={Position.Top}
      >
      </NodeToolbar>
      <NodeResizer
        isVisible={nodeProps.selected}
        minHeight={150}
        minWidth={270}
        maxHeight={550}
        lineClassName={`${nodeProps.selected ? "ring-[3px] ring-orange-600/50" : ""}   transition-all duration-200`}
        handleClassName="w-3 h-3 rounded-full bg-orange-600"
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className={`${!nodeProps.selected && "opacity-50"} p-1 bg-orange-600 -right-4`}
      />
      <Handle
        className={`${!nodeProps.selected && "opacity-50"} p-1 bg-orange-600  -left-4`}
        id="left"
        type="source"
        position={Position.Left}
      />
      <Handle
        className={`${!nodeProps.selected && "opacity-50"} p-1 bg-orange-600 -top-4`}
        id="top"
        type="source"
        position={Position.Top}
      />
      <Handle
        className={`${!nodeProps.selected && "opacity-50"} p-1 bg-orange-600 -bottom-4`}
        id="bottom"
        type="source"
        position={Position.Bottom}
      />
    </div>


  );
})