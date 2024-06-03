"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, AlertCircle, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/models/alet-modal";
import { auth, useClerk } from "@clerk/nextjs";

interface CellActionProps {
  data: UserColumn;
}

const CellAcction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Api route copied to the clipboard");
  };

  const onDelete = async (id: string) => {
    try {
      setloading(true);
      await axios.delete(`/api/users/${id}`);
      router.refresh();
      toast.success("User Deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setloading(false);
      setOpen(false);
    }
  };

  const onToogle = async (id: string) => {
    try {
      setloading(true);
      await axios.patch(`/api/users/toggle`, {
        userToBan: id,
      });
      router.refresh();
      toast.success(`user ${!data.isBanned ? "Banned" : "Active"}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setloading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          onDelete(data.id);
        }}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              onCopy(data.id);
            }}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              onToogle(data.id);
            }}
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            Toogle Ban
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAcction;
