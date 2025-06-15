export type FlowNodeStatus = "pending" | "completed" | "failed" | "skipped"

export type FlowNodeType = "start" | "form" | "approval" | "webhook" | "end" | "condition";

type ConditionOperator = "equals" | "not_equals" | "contains" | "greater_than" | "less_than";

interface ConditionRule {
  fieldName: string;
  operator: ConditionOperator;
  value: string | number | boolean;
  targetNodeId: string;
}

export interface FlowNode {
  id: string;               // UUID, compatível com React Flow
  type: FlowNodeType;
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
    organizationId: string
    rules?: ConditionRule[];
    status: FlowNodeStatus;
    createdBy: string
    formId?: string;        // se type === 'form'
    approvers?: string[];   // se type === 'approval'
    webhookUrl?: string;    // se type === 'webhook'
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
}

export interface FlowInstance {
  id: string;
  name: string;
  description?: string;
  currentStage: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  createdBy: string; // userId
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
