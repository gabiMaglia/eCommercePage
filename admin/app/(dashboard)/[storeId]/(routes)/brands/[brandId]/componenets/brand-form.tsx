"use client";

import * as z from "zod";
import { Brand } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Headding } from "@/components/ui/headding";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/models/alet-modal";

const formSchema = z.object({
  name: z.string().min(1),
});
type BrandFormValues = z.infer<typeof formSchema>;

interface BrandFormProps {
  initialData: Brand | null;
}

export const BrandForm: React.FC<BrandFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();


  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);

  const title = initialData ? "Edit Brand" : "Create Brand";
  const description = initialData ? "Edit Brand" : "Add a new Brand";
  const toastMessage = initialData ? "Brand Updated" : "Brand Created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit = async (data: BrandFormValues) => {
    try {
      setloading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/brands/${params.brandId}`, data);
      }else {
        await axios.post(`/api/${params.storeId}/brands`, data);
      }
      toast.success(toastMessage);
      router.push(`/${params.storeId}/brands`)
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setloading(false);
    }
  };
  const onDelete = async () => {
    try {
      setloading(true);
      await axios.delete(`/api/${params.storeId}/brands/${params.brandId}`);
      toast.success("Brand Deleted");
      router.push(`/${params.storeId}/brands`);
      router.refresh();
    } catch (error) {
      toast.error("Make sure you removed all products of this brand");
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
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Headding title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className=" grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Brand name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>

    </>
  );
};
