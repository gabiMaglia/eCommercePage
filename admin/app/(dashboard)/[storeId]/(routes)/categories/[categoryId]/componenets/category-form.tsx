"use client";

import * as z from "zod";
import { Billboard, Category } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
  image: z.string().min(1),
  promoImages: z.array(z.object({ url: z.string() })),
});
type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: any | null;
  billboards: Billboard[];
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);

  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData ? "Edit Category" : "Add a new Category";
  const toastMessage = initialData ? "Category Updated" : "Category Created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
      image: "",
      promoImages: [],
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setloading(true);
      if (initialData.name) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      toast.success(toastMessage);
      router.push(`/${params.storeId}/categories`);
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
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      toast.success("Category Deleted");
      router.push(`/${params.storeId}/categories`);
      router.refresh();
    } catch (error) {
      toast.error("Make sure you removed all products in this category first");
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
            name="promoImages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Promotional Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field?.value?.map((image) => image.url) || []}
                    disable={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange(
                        field.value.filter((current) => current.url !== url)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Category Image </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disable={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className=" grid xl:grid-cols-3 grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Group </FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Group"
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.length === 0 ? (
                        <SelectItem value="0" disabled>
                          No Billboards found
                        </SelectItem>
                      ) : (
                        billboards.map((billboard) => (
                          <SelectItem key={billboard.id} value={billboard.id}>
                            {billboard.label}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
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
