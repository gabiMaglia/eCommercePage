"use client";

import * as z from "zod";
import { Billboard } from "@prisma/client";
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
// import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});
type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
  initialData: Billboard | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  // const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);

  const title = initialData ? "Edit Category group" : "Create Category group";
  const description = initialData ? "Edit Category group" : "Add a new Group of categories";
  const toastMessage = initialData ? "Category group Updated" : "Category group Created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setloading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
      }else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
      toast.success(toastMessage);
      router.push(`/${params.storeId}/billboards`)
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
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
      toast.success("Billboard Deleted");
      router.push(`/${params.storeId}/billboards`);
      router.refresh();
    } catch (error) {
      toast.error("Make sure you removed all billboards in this categories");
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Background Image </FormLabel>
                <FormControl>
                 <ImageUpload 
                  value={field.value ? [field.value] : []}
                  disable={loading}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange('') }
                 />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Label </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Group label"
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
