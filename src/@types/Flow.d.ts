import type { Form } from "./Form";

export type FlowNodeStatus = "pending" | "completed" | "failed" | "skipped"

export type FlowNodeType = "start" | "form" | "approval" | "webhook" | "end" | "condition";

type ConditionOperator = "equals" | "not_equals" | "contains" | "greater_than" | "less_than";

interface ConditionRule {
  fieldName: string;
  operator: ConditionOperator;
  value: string | number | boolean;
  targetNodeId: string;
}
export interface FlownNodeData {
  label: string;
  description?: string;
  organizationId: string
  rules?: ConditionRule[];// se type === 'condition'
  status: FlowNodeStatus;
  createdBy: string
  form?: Form;        // se type === 'form'
  approvers?: string[];   // se type === 'approval'
  webhookUrl?: string;    // se type === 'webhook'
}

export interface FlowNode {
  id: string;               // UUID, compatível com React Flow
  type: FlowNodeType;
  position: { x: number; y: number };
  data: FlownNodeData;
}


export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
}

export interface Flow {
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
