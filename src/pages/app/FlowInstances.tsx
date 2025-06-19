import type { Flow } from "@/@types/Flow";
import { GenericTable } from "@/components/custom/GenericTable";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { useFlow } from "@/hooks/use-flow";
import { useSeo } from "@/hooks/use-seo";
import { useQuery } from "@tanstack/react-query";
import { useFlowColumns } from "@/hooks/use-flow-columns";
import { useSharedQueryKeys } from "@/hooks/use-shared-querykeys";

export function FlowInstances() {
  useSeo({
    title: "Flows - instances",
    description: "Visualizar flows executados pelos colaboradores",
    ogDescription: "Aqui você pode visualizar, criar fluxos de trabalho e monitorá-los"
  })
  const { flowInstanceQueryKey } = useSharedQueryKeys();  
  const { instanceColumns } = useFlowColumns("/flows/diagram/instances/");
  const { getOrganizationInstancesFlows } = useFlow();

  const { data, isLoading } = useQuery({
    queryFn: async () => getOrganizationInstancesFlows(),
    queryKey: flowInstanceQueryKey,
    refetchOnWindowFocus: false,
  });

  return (
    <ScreenWrapper>
      {!isLoading && data && (
        <GenericTable<Flow>
          searchFilterColumnInput={{ accssorKey : "name", placelholder : "Flow name..."}}
          data={data}
          manualPagination={true}
          columns={instanceColumns}
        />
      )}
    </ScreenWrapper>
  )
}