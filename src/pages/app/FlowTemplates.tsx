import type { Flow } from "@/@types/Flow";
import { GenericTable } from "@/components/custom/GenericTable";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { GetFlowReturn, useFlow } from "@/hooks/use-flow";
import { useSeo } from "@/hooks/use-seo";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useFlowColumns } from "@/hooks/use-flow-columns";
import { useUserStore } from "@/store/user";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlowDTO, SaveFlowDTO } from "@/lib/DTO/flow.dto";

export function FlowTemplates() {
  const [pageIndex, setPageIndex] = useState(1);
  useSeo({
    title: "Flows - templates",
    description: "Aqui você pode visualizar, criar fluxos de trabalho e monitorá-los",
    ogDescription: "Aqui você pode visualizar, criar fluxos de trabalho e monitorá-los"
  })
  const selectedOrganization = useUserStore((state) => state.selectedOrganization);
  const flowQueryKey = useMemo(() => ([
    "get-org-template-flows",
    selectedOrganization ? selectedOrganization.id : undefined,
    pageIndex
  ]), [selectedOrganization ? selectedOrganization.id : undefined, pageIndex]);

  const { getOrganizationTemplateFlows } = useFlow();

  // adicionar possibilidade de edição ao clicar no item dentro da listagem
  const { templateColumns } = useFlowColumns("/flows/diagram/template/");

  const { data: response, isLoading } = useQuery({
    queryFn: async () => await getOrganizationTemplateFlows({ page: pageIndex }) as GetFlowReturn,
    queryKey: flowQueryKey,
    refetchOnWindowFocus: false,
    enabled: selectedOrganization != undefined
  });

  const methods = useForm<SaveFlowDTO>({
    resolver: zodResolver(FlowDTO.saveFlowDTO),
    defaultValues: {}
  });

  return (
    <ScreenWrapper>
      {!isLoading && response && (
        <GenericTable<Flow>
          newItem={{
            dialog: (
              <Dialog>
                <DialogTrigger>
                  <Button variant={"outline"}>
                    <Plus size={15} />
                    New
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>
                    New Flow Template
                  </DialogTitle>
                  <DialogDescription>
                    Create an new or update someone existing here
                  </DialogDescription>
                  <FormProvider {...methods}>
                    <form action="">
                      <FormItem>

                      </FormItem>
                    </form>
                  </FormProvider>
                </DialogContent>
              </Dialog>
            )
          }}
          searchFilterColumnInput={{ accssorKey: "name", placelholder: "Flow name..." }}
          data={response.data}
          manualPagination={true}
          columns={templateColumns}
          pageIndex={pageIndex}
          setPageIndex={(page) => setPageIndex(page)}
          pageCount={response.count}
        />
      )}
    </ScreenWrapper>
  )
}