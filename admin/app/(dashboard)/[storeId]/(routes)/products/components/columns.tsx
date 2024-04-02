"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAcction from "./cell-action";
import { Color } from "@prisma/client";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  quantity: number;
  // color: [];
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
  // {
  //   accessorKey: "color",
  //   header: "Color",
  //   cell: ({ row }) => {
  //     row.original.color.map((color: Color) => (
  //       <div key={color.id} className="flex items-center gap-x-2">
  //         {color.name}
  //         <div
  //           className="h-6 w-6 rounded-full border"
  //           style={{ backgroundColor: color.value }}
  //         />
  //       </div>
  //     ));
  //   },
  // },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => <CellAcction data={row.original} />,
  },
];
