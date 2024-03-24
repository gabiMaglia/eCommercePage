"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Headding } from "@/components/ui/headding";
import { Separator } from "@/components/ui/separator";

import { useRouter, useParams } from "next/navigation";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Headding
        title={`Orders ${data.length}`}
        description="Manage orders for you store"
      />

      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};
