import { useMemo } from "react";

export function useSharedQueryKeys() {
  const flowInstanceQueryKey = useMemo(() => ["get-org-instance-flows"], []);
  const flowModelQueryKey = useMemo(() => ["get-org-instance-flows"], []);

  return {
    flowInstanceQueryKey,
    flowModelQueryKey
  }
}