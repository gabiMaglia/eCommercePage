"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Headding } from "@/components/ui/headding";
import { Separator } from "@/components/ui/separator";

import { useRouter, useParams } from "next/navigation";
import { BrandColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface  BrandCLientProps {
  data: BrandColumn[]
}

export const BrandClient: React.FC<BrandCLientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
      <div className="flex items-center justify-between">
        <Headding title={`Brands ${data.length}`} description="Manage product brands for you store" />
        <Button onClick={() => router.push(`/${params.storeId}/brands/new`)}>
          <Plus className=" mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Headding title="Api" description={"Api calls for Brands"} />
      <Separator />
      <ApiList entityName="brands" entityIdName="brandId"/>
    </>
  );
};
