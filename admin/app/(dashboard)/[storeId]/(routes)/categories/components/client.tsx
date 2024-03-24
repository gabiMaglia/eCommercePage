"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Headding } from "@/components/ui/headding";
import { Separator } from "@/components/ui/separator";

import { useRouter, useParams } from "next/navigation";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface  CategoryClientProps {
  data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
      <div className="flex items-center justify-between">
        <Headding title={`Categories ${data.length}`} description="Manage categories for you store" />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className=" mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Headding title="Api" description={"Api calls for categories"} />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoriesId"/>
    </>
  );
};
