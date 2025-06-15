import type { FlowInstance } from "@/@types/Flow";
import { useQueryClient } from "@tanstack/react-query";
import { ReactFlow } from "@xyflow/react"
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export function FlowDiagram() {
  const queryClient = useQueryClient();
  const params = useParams();

  const nodeTypes = useMemo(() => { }, []);


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