"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAcction from "./cell-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type CategoryColumn = {
  id: string;
  name: string;
  image: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "image",
    header: "Imagen",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Group",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAcction data={row.original} />,
  },
];
