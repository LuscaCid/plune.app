import type { Flow } from "@/@types/Flow";
import { GenericTable } from "@/components/custom/GenericTable";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { useFlow } from "@/hooks/use-flow";
import { useSeo } from "@/hooks/use-seo";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useFlowColumns } from "@/hooks/use-flow-columns";

export function FlowModels() {
  useSeo({
    title: "Flows - models",
    description: "Aqui você pode visualizar, criar fluxos de trabalho e monitorá-los",
    ogDescription: "Aqui você pode visualizar, criar fluxos de trabalho e monitorá-los"
  })
  const flowQueryKey = useMemo(() => ["get-org-models-flows"], [])
  const { getOrganizationModelFlows } = useFlow();
  const { modelColumns } = useFlowColumns("/flows/diagram/models/");

  const { data, isLoading } = useQuery({
    queryFn: async () => getOrganizationModelFlows(),
    queryKey: flowQueryKey,
    refetchOnWindowFocus: false,
  });

  return (
    <ScreenWrapper>
      {!isLoading && data && (
        <GenericTable<Flow>
          searchFilterColumnInput={{ accssorKey: "name", placelholder: "Flow name..." }}
          data={data}
          manualPagination={true}
          columns={modelColumns}
        />
      )}
    </ScreenWrapper>
  )
}