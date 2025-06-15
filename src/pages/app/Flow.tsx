import type { FlowInstance } from "@/@types/Flow";
import { GenericSelectableTable } from "@/components/custom/GenericSelectableTable";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFlow } from "@/hooks/use-flow";
import { useSeo } from "@/hooks/use-seo";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, ArrowUpDown } from "lucide-react";
import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useNavigate } from "react-router-dom";
export function Flow() {
  const navigate = useNavigate();
  useSeo({
    title: "Flows automatizados",
    description: "Aqui você pode visualizar, criar fluxos de trabalho e monitorá-los",
    ogDescription: "Aqui você pode visualizar, criar fluxos de trabalho e monitorá-los"
  })
  const flowQueryKey = useMemo(() => ["get-organization-flows"], [])
  const { getOrganizationFlows } = useFlow();
  const columns: ColumnDef<FlowInstance>[] = useMemo(() => [
    {
      accessorKey : "id",
      header : () => <div>Flow data</div>,
      id: "id",
      cell: ({ row }) => (
        <Button onClick={() => navigate("/flows/diagram/"+row.getValue("id"))} size={"sm"} variant={"ghost"}>
          Go to flow<ArrowRight size={15} />
        </Button>
      )
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            variant={"ghost"}
          >
            Name
            <ArrowUpDown />
          </Button>
        )
      }
    },

    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            className="text-left"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            variant={"ghost"}
          >
            Created at
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-left">{formatDistanceToNow(new Date(row.getValue("createdAt")), { addSuffix: true })}</div>
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div>{row.getValue("description")}</div>
    },
    {
      
      accessorKey: "isPublished",
      header: "status",
      cell: ({ row }) => <Badge>{row.getValue("isPublished") == true ? "published" : "not published"}</Badge>
    },
  ] satisfies ColumnDef<FlowInstance>[], []);

  const { data, isLoading } = useQuery({
    queryFn: async () => getOrganizationFlows(),
    queryKey: flowQueryKey,
    refetchOnWindowFocus: false,
  });

  return (
    <ScreenWrapper>
      {!isLoading && data && (
        <GenericSelectableTable<FlowInstance>
          searchFilterColumnInput={{ accssorKey : "name", placelholder : "Flow name..."}}
          data={data}
          manualPagination={true}
          columns={columns}
        />
      )}
    </ScreenWrapper>
  )
}