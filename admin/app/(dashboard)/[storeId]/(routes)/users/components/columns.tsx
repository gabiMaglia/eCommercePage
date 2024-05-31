"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAcction from "./cell-action";

export type UserColumn = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  isBanned: boolean;
  createdAt: string; 
  clerkId: string;
  address: any; 
  orders: any[]; 
  updatedAt: string; 
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    accessorKey: "isBanned",
    header: "is Banned",
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => <CellAcction data={row.original} />,
  },
];
