import type { Flow } from "@/@types/Flow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ArrowRight, ArrowUpDown } from "lucide-react";
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

export function useFlowColumns(url: string) {
  const navigate = useNavigate();
  const modelColumns = useMemo(() => [
    {
      accessorKey : "id",
      header : () => <div>Flow data</div>,
      id: "id",
      cell: ({ row }) => (
        <Button onClick={() => navigate(url+row.getValue("id"))} size={"sm"} variant={"ghost"}>
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
  ] satisfies ColumnDef<Flow>[], [navigate, url]);
  const instanceColumns = useMemo(() => [
    {
      accessorKey : "id",
      header : () => <div>Flow data</div>,
      id: "id",
      cell: ({ row }) => (
        <Button onClick={() => navigate(url+row.getValue("id"))} size={"sm"} variant={"ghost"}>
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
      accessorKey: "createdBy",
      header: ({ column }) => {
        return (
          <Button
            className="text-left"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            variant={"ghost"}
          >
            Created By
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-left">{row.getValue("createdBy")}</div>
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
  ] satisfies ColumnDef<Flow>[], [navigate, url]);

  return {
    instanceColumns,
    modelColumns
  }
}