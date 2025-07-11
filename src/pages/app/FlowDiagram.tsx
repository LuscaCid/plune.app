import ReactFlow, { useNodesState, useEdgesState, Controls, Background, MiniMap, BackgroundVariant, type Connection, ConnectionMode, MarkerType, Panel, NodeProps } from "reactflow"
import type { Flow, FlowNodeType } from "@/@types/Flow";
import { FloatingEdge } from "@/components/ReactFlow/FloatingEdge";
import { FormNodeType } from "@/components/ReactFlow/FormNodeType";
import { StageNodeType } from "@/components/ReactFlow/StageNodeType";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ConditionNodeType } from "@/components/ReactFlow/ConditionNodeType";
import { ApprovalNodeType } from "@/components/ReactFlow/ApprovalNodeType";
import { WebhookNodeType } from "@/components/ReactFlow/WebhookNodeType";
import { useDragField } from "@/store/use-drag-field";
import { Button } from "@/components/ui/button";
import { FormInput, User, Webhook, Workflow } from "lucide-react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useDroppable } from "@/hooks/use-droppable";

export type AppNodeTypes = Record<FlowNodeType, React.MemoExoticComponent<(nodeProps: NodeProps<any>) => JSX.Element>>

export function FlowDiagram() {
  const nodeTypes: AppNodeTypes = useMemo(() => ({
    form: FormNodeType,
    stage: StageNodeType,
    approval: ApprovalNodeType,
    condition: ConditionNodeType,
    webhook: WebhookNodeType,

  }), []);
  const EDGE_TYPES = useMemo(() => ({
    "floating": FloatingEdge
  }), []);
  const isDraggingAnyField = useDragField((state) => state.isDraggingAnyField);
  const {
    onDragStartNewNode
  } = useDroppable();

  const queryClient = useQueryClient();
  const params = useParams();
  const queryKeyBytype = useMemo(() => {
    if (params.type && (params.type == "templates" || params.type == "instances")) {
      const flowsDictionary = {
        instances: ["get-org-instance-flows"],
        templates: ["get-org-template-flows"],
      }
      return flowsDictionary[params.type];
    }
  }, [params]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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
            if (flowFoundByRefetch) setNodes(flowFoundByRefetch.nodes);

          })
          .catch(err => console.log(err))
      }
    }
  }, [params, queryClient, setNodes, queryKeyBytype]);

  const onConnect = useCallback((connection: Connection) => {
    if (connection.source && connection.target) {
      setEdges(
        [...edges, {
          id: connection.source! + connection.target + Math.round((Math.random() * 10000)),
          source: connection.source,
          target: connection.target,
          animated: true,
          type: "floating",
          markerEnd: { type: MarkerType.Arrow },
        }]
      )
    }
  }, [setEdges, edges]);

  const onNodeDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    //obtencao do evento de transferencia de dados do proprio reactflow
    const type = event.dataTransfer.getData('application/reactflow') as keyof typeof nodeTypes;
    if (typeof type === 'undefined' || !type) {
      return;
    }
    switch (type) {
      case "form":
        // return createNoteDispatch(event);  
        break;
      case "approval":
        break;
      // return createNodeDispatch(event);
    }
  }, []);
  return (
    <div className="w-full h-full">
      <ReactFlow
        minZoom={0.1}
        maxZoom={2}
        onConnect={onConnect}
        edgeTypes={EDGE_TYPES}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        onDrop={onNodeDrop}
        defaultEdgeOptions={{
          type: "floating",
          animated: true,
          markerEnd: { type: MarkerType.Arrow }
        }}
        // connectionLineComponent={FloatingConnectionLine}
        connectionMode={ConnectionMode.Loose}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        fitView
        panOnDrag={!isDraggingAnyField}
      >
        <Panel position="top-right" className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/70 backdrop-blur-md dark:backdrop-blur-lg flex flex-col gap-2 items-center p-2 rounded-lg ">
          <Button
            onDragStart={(e) => onDragStartNewNode(e, "form")}
            className="w-full gap-2 justify-start flex items-center"
            variant={"ghost"}
            draggable
          >
            <FormInput />
            Form
          </Button>
          <DropdownMenuSeparator />
          <Button
            onDragStart={(e) => onDragStartNewNode(e, "condition")}
            className="w-full gap-2 justify-start  flex items-center"
            variant={"ghost"}
            draggable
          >
            <Workflow />
            Conditional
          </Button>
          <DropdownMenuSeparator />
          <Button
            onDragStart={(e) => onDragStartNewNode(e, "approval")}
            className="w-full gap-2 flex justify-start  items-center"
            variant={"ghost"}
            draggable
          >
            <User />
            Approver
          </Button>
          <DropdownMenuSeparator />
          <Button
            onDragStart={(e) => onDragStartNewNode(e, "webhook")}
            className="w-full gap-2 flex justify-start  items-center"
            variant={"ghost"}
            draggable
          >
            <Webhook />
            Webhook
          </Button>
        </Panel>
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