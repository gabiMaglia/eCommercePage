"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAcction from "./cell-action"


export type BillboardColumn = {
  id: string
  label: string
  createdAt: string

}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Email",
  },
  {
    accessorKey: "actions",
    cell: ({row}) => <CellAcction data={row.original}/>,
  },
]
