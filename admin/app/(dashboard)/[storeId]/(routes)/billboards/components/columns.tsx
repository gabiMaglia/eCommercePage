"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAcction from "./cell-action"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export type BillboardColumn = {
  id: string
  label: string
  createdAt: string
  imageUrl: string

}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "image",
    header: "Imagen",
    cell: ({ row }) => {
     
     
     return <Avatar>
        <AvatarImage src={row.original.imageUrl} />
        <AvatarFallback>BB</AvatarFallback>
      </Avatar>
    },
  },
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
