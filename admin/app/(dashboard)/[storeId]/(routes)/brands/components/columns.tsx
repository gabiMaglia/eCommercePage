"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAcction from "./cell-action"


export type BrandColumn = {
  id: string
  name: string
  createdAt: string

}

export const columns: ColumnDef<BrandColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "date",
  },
  {
    accessorKey: "actions",
    cell: ({row}) => <CellAcction data={row.original}/>,
  },
]
