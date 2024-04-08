"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAcction from "./cell-action";


export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  quantity: number;
  color: string[];
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Stock",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "color",
    header: "Color/s",
    cell: ({ row }) => {
      return row.original.color.map((color: string) => (
        <div
          key={Math.random()+Date.now()}
          className=" border-slate-700 py-2 inline-flex pl-1 pr-1 border-double "
        >
          <div
            style={{ backgroundColor: color }}
            className="w-5 h-5 rounded-full border-black border-2"
          />
        </div>
      ));
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => <CellAcction data={row.original} />,
  },
];
