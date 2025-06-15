import ReactFlow, { useNodesState, useEdgesState, Controls, Background, MiniMap, BackgroundVariant, addEdge, type Connection } from "reactflow"
import type { Flow } from "@/@types/Flow";
import { FloatingEdge } from "@/components/ReactFlow/FloatingEdge";
import { FormNodeType } from "@/components/ReactFlow/FormNodeType";
import { StageNodeType } from "@/components/ReactFlow/StageNodeType";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import 'reactflow/dist/style.css';

export function FlowDiagram() {
  const queryClient = useQueryClient();
  const params = useParams();
  const queryKeyBytype = useMemo(() => {
    if (params.type && (params.type == "models" || params.type == "instances")) {
      //instances -- models
      const flowsDictionary = {
        instances: ["get-org-instance-flows"],
        models: ["get-org-models-flows"],
      }
      return flowsDictionary[params.type];
    }
  }, [params]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const EDGE_TYPES = useMemo(() => ({
    "floating": FloatingEdge
  }), []);
  const nodeTypes = useMemo(() => ({
    form: FormNodeType,
    end: StageNodeType,
    start: StageNodeType,
    approval: FormNodeType,
    condition: FormNodeType,
    webhook: FormNodeType
  }), []);

  useEffect(() => {
    const orgFlows = queryClient.getQueryData(queryKeyBytype ?? []) as Flow[] ?? [];
    if (params.id) {
      const flowFound = orgFlows.find((instance) => instance.id === params.id);

      if (flowFound) setNodes(flowFound.nodes);
      else {
        queryClient.refetchQueries({ queryKey: queryKeyBytype })
        .then(() => {
          const orgFlowsRefetched = queryClient.getQueryData(queryKeyBytype ?? []) as Flow[] ?? [];

          const flowFoundByRefetch = orgFlowsRefetched.find((instance) => instance.id === params.id);
          console.log(flowFoundByRefetch);
          if (flowFoundByRefetch) setNodes(flowFoundByRefetch.nodes);
          
        })
        .catch(err => console.log(err))
      }
    }
  }, [params, queryClient, setNodes, queryKeyBytype]);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        minZoom={0.1}
        maxZoom={2}
        onConnect={onConnect}
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        fitView
        edgeTypes={EDGE_TYPES}
        nodeTypes={nodeTypes}
      >
        <Controls
          showFitView
          color="#121212"
          className="dark:bg-zinc-800 rounded-md"
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
        />
        <MiniMap
          zoomable
          pannable
          nodeStrokeWidth={3}
          className="dark:bg-zinc-800 opacity-50 bg-zinc-400"
          position="bottom-right"
        />
      </ReactFlow>
    </div >

  )
}