import { useCallback } from 'react';
import { useStore, getSmoothStepPath, type EdgeProps, BaseEdge } from 'reactflow';
import "../../lib/animations.css";
import { getEdgeParams } from '@/lib/edgeParams';

/**
 * @author Lucas Cid <lucasfelipaaa@gmail.com>
 * @summary Tipo de edge que vai mapear os nós proximos e vai redirecionar a qual handler realizar conexao
 * @created 29/06/2024
 */
export function FloatingEdge({ id, source, target, markerEnd, style, selected } : EdgeProps) {
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
  <>
        <BaseEdge markerEnd={markerEnd} path={edgePath} />
        <path
            id={id}
            className={`react-flow__edge-path hover:stroke-[5] stroke-[4] stroke-transition  ${selected ? "stroke-orange-600 stroke-[6]" : "stroke-zinc-400"} `}
            d={edgePath}
            strokeWidth={5}
            markerEnd={markerEnd}
            style={style}
        />
  </>   
    
  );
}