import type { Form } from "@/@types/Form";
import { GenericTable } from "@/components/custom/GenericTable";
import { DynamicFlowForm } from "@/components/DynamicFlowForm";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { api } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ArrowRight, ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";

export function Forms() {
  const [isOpen, setIsOpen] = useState(false);
  const [detailedForm, setdetailedForm] = useState<Form>();
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await api.get("/forms");
      return response.data as Form[]
    },
    queryKey: ['get-org-forms']
  });
  const columns: ColumnDef<Form>[] = useMemo(() => [
    {
      accessorKey: "id",
      header: () => <div></div>,
      cell: () => <div></div>
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          className="px-1 flex justify-between"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant={"ghost"}
        >
          Name
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Button
          variant={"outline"}
          onClick={() => {
            const formFound = data?.find((form) => form.id == row.getValue("id"))
            if (formFound) {
              console.log(formFound);
              setIsOpen(true);
              setdetailedForm(formFound);
            }
          }}
        >
          Go <ArrowRight size={20} />
          {row.getValue("name")}
        </Button>
      )
    },
    {
      accessorKey: "createdAt",
      header: () => <div>Created at</div>,
      cell: ({ row }) => <div>{formatDistanceToNow(row.getValue("createdAt"), { addSuffix: true })}</div>
    },
    {
      accessorKey: "createdBy",
      header: () => <div>Created by</div>,
      cell: ({ row }) => <div>{row.getValue("createdBy")}</div>
    },
    {
      accessorKey: "fields",
      header: ({ column }) => (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant={"ghost"}
        >
          Fields
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div>{(row.getValue("fields") as []).length}</div>
    }
  ] satisfies ColumnDef<Form>[], [])

  return (
    <ScreenWrapper>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="">
          <DialogTitle>
            Formulario
          </DialogTitle>
          <DialogDescription>
            Edite, adicione ou remova campos e suas ordens para o flow
          </DialogDescription>
          <DynamicFlowForm form={detailedForm}/>
        </DialogContent>
      </Dialog>
      {!isLoading && data && (
        <GenericTable<Form>
          selectable={false}
          searchFilterColumnInput={{ accssorKey: "name", placelholder: "Flow name..." }}
          data={data}
          manualPagination={true}
          columns={columns}
        />
      )}
    </ScreenWrapper>
  );
}