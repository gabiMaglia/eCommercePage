"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Headding } from "@/components/ui/headding";
import { Separator } from "@/components/ui/separator";

import { useRouter, useParams } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface  ProductClientProps {
  data: ProductColumn[]
}

export const ProductClient: React.FC<ProductClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
      <div className="flex items-center justify-between">
        <Headding title={`Products ${data.length}`} description="Manage products for you store" />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className=" mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Headding title="Api" description={"Api calls for Billboards"} />
      <Separator />
      <ApiList entityName="products" entityIdName="prorductId"/>
    </>
  );
};
