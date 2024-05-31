"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Headding } from "@/components/ui/headding";
import { Separator } from "@/components/ui/separator";

import { useRouter, useParams } from "next/navigation";
import {  UserColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface  UserClientProps {
  data: UserColumn[]
}

export const UserClient: React.FC<UserClientProps> = ({data}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Headding title={`Users ${data.length}`} description="Manage users for all the stores" />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Headding title="Api" description={"Api calls for Users"} />
      <Separator />
      <ApiList entityName="users" entityIdName="userId"/>
    </>
  );
};
