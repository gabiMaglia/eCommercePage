"use client";

import * as z from "zod";
import { Brand, Category, Color, Image, Product } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Headding } from "@/components/ui/headding";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
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

import ImageUpload from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  colors: z.array(
    z.object({
      value: z.string(),
      stock: z.string(),
    })
  ),
  price: z.coerce.number().min(1),
  stock: z.coerce.number(),
  categoryId: z.string().min(1),
  brandId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});
type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;

  categories: Category[];
  stock:  number;
  colors: Color[];
  brand: Brand[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  colors,
  brand,
}) => {
  const params = useParams();
  const router = useRouter();

  const [colorArr, setColors] = useState(() =>
    initialData ? colors.map((color) => color.value) : ["#ffffff"]
  );
  const [stockPerColorArr, setStockPerColors] = useState(() =>
    initialData ? colors.map((color) => Number(color.stock)) : [0]
  );
  const [totalStock, setTotalStock] = useState(() =>
    initialData
      ?  stockPerColorArr.reduce((stock, acc) => {
        return (Number(acc) + Number(stock));
      })
      : 0
  );

  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);

  const title = initialData ? "Edit Products" : "Create Products";
  const description = initialData ? "Edit Products" : "Add a new Products";
  const toastMessage = initialData ? "Products Updated" : "Products Created";
  const action = initialData ? "Save changes" : "Create";



  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
          stock: Number(totalStock),
          colors: colors.map((color) => ({
            value: color.value,
            stock: color.stock,
          })),
        }
      : {
          name: "",
          images: [],
          colors: [],
          stock: 0,
          price: 0,
          categoryId: "",
          brandId: "",
          isFeatured: false,
          isArchived: false,
        },
  });
  const onSubmit = async (data: ProductFormValues) => {
    const colorsData = colorArr.map((color: string, index: number) => ({
      value: color,
      stock: (stockPerColorArr[index]).toString(),
    }));
    data = { ...data, colors: colorsData };

    try {
      setloading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      toast.success(toastMessage);
      router.push(`/${params.storeId}/products`);
      router.refresh();
    } catch (error) {
      console.log({ error: error });

      toast.error("Something went wrong");
    } finally {
      setloading(false);
    }
  };
  const onDelete = async () => {
    try {
      setloading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      toast.success("Products Deleted");
      router.push(`/${params.storeId}/products`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setloading(false);
      setOpen(false);
    }
  };

  const handleAddColor = (): void => {
    setColors([...colorArr, "#ffffff"]);
    setStockPerColors([...stockPerColorArr, 0]);
  };
  const handleRemoveColor = (): void => {
    colorArr.pop();
    setColors([...colorArr]);
    stockPerColorArr.pop();
    setStockPerColors([...stockPerColorArr]);
  };

  const handleChangeColor = (color: string, index: number): void => {
    const newColors = [...colorArr];
    newColors[index] = color;
    setColors(newColors);
  };
  const handleChangeStock = (newStockValue: string, index: number): void => {
    const updatedStockPerColorArr = [...stockPerColorArr];
    updatedStockPerColorArr[index] = Number(newStockValue);
    setStockPerColors(updatedStockPerColorArr);

    const newTotalStock = updatedStockPerColorArr.reduce((acc, curr) => acc + Number(curr), 0);
    setTotalStock(newTotalStock);

    form.setValue('stock', newTotalStock);
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
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disable={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      placeholder="Product Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Price </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Stock </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={true}
                      placeholder="0"
                      {...field}

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Colors </FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {colorArr.map((color: string, index: number) => (
                        <div
                          key={color}
                          className="flex flex-col items-center gap-2"
                        >
                          <input
                            type="color"
                            value={color}
                            onChange={(e) =>
                              handleChangeColor(e.target.value, index)
                            }
                            className="w-6 h-6  border-slate-950 rounded-full cursor-pointer"
                          />
                          <Input
                            type="number"
                            value={stockPerColorArr[index]}
                            onChange={(e) =>
                              handleChangeStock(e.target.value, index)
                            }
                            className="w-20 border-slate-450 rounded"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleAddColor}
                        className="w-2 h-7 grid content-center text-white rounded"
                        type="button"
                      >
                        +
                      </Button>
                      <Button
                        onClick={handleRemoveColor}
                        className="w-2 h-7 grid content-center text-white rounded"
                        type="button"
                      >
                        -
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Category </FormLabel>
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
                          placeholder="Select a Category"
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Brand </FormLabel>
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
                          placeholder="Select a Brand"
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brand.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This Prouct will apear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This Prouct will not apear anywhere in the store
                    </FormDescription>
                  </div>
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
