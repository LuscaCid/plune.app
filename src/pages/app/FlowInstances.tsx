import type { Flow } from "@/@types/Flow";
import { GenericSelectableTable } from "@/components/custom/GenericSelectableTable";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { useFlow } from "@/hooks/use-flow";
import { useSeo } from "@/hooks/use-seo";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useFlowColumns } from "@/hooks/use-flow-columns";

export function FlowInstances() {
  useSeo({
    title: "Flows - instances",
    description: "Visualizar flows executados pelos colaboradores",
    ogDescription: "Aqui você pode visualizar, criar fluxos de trabalho e monitorá-los"
  })
  const flowQueryKey = useMemo(() => ["get-org-instance-flows"], []);
  
  const { getOrganizationInstancesFlows } = useFlow();
  const { instanceColumns } = useFlowColumns("/flows/diagram/instances/");

  const { data, isLoading } = useQuery({
    queryFn: async () => getOrganizationInstancesFlows(),
    queryKey: flowQueryKey,
    refetchOnWindowFocus: false,
  });

  return (
    <ScreenWrapper>
      {!isLoading && data && (
        <GenericSelectableTable<Flow>
          searchFilterColumnInput={{ accssorKey : "name", placelholder : "Flow name..."}}
          data={data}
          manualPagination={true}
          columns={instanceColumns}
        />
      )}
    </ScreenWrapper>
  )
}