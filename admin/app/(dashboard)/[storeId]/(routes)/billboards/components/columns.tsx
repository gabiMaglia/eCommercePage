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
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    accessorKey: "actions",
    cell: ({row}) => <CellAcction data={row.original}/>,
  },
]
