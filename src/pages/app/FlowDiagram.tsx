import type { FlowInstance } from "@/@types/Flow";
import { useQueryClient } from "@tanstack/react-query";
import { ReactFlow } from "@xyflow/react"
import { useMemo, useState } from "react";
import { useParams, replace } from "react-router-dom";

export function FlowDiagram() {
  const params = useParams();

  const nodeTypes = useMemo(() => { }, []);

  const queryClient = useQueryClient();
  const [flow, setFlow] = useState(() => {
    const orgFlows = queryClient.getQueryData(["get-organization-flows"]) as FlowInstance[] ?? [];
    if (params.id) {
      const flowFound = orgFlows.find((instance) => instance.id === params.id)
      console.log(flowFound);
      return flowFound
    }
  });

  return (
    <div>
      <ReactFlow
        nodes={flow?.nodes}

      />

      aa
    </div>
  )

}