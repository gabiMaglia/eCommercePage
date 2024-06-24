"use client";

import * as z from "zod";
import { ContactData, Store } from "@prisma/client";
import { CheckIcon, Trash, CarrotIcon, ArrowBigDown } from "lucide-react";
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
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, countryList } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";

interface SettingsFormProps {
  initialData: Store & { contactData: ContactData | null };
}

const formSchema = z.object({
  name: z.string().min(1),
  phone: z.string().transform((val) => val.toString()),
  email: z.string().email(),
  country: z.string().min(1),
  aboutUs: z.string().min(1),
  state: z.string().min(1),
  address: z.string().min(1),
  number: z.string(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  mercadoLibre: z.string().optional(),
  shifts: z
    .array(
      z.object({
        openTime: z.string().min(1),
        closeTime: z.string().min(1),
      })
    )
    .min(1)
    .max(4),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const { contactData } = initialData;

  const defaultShifts = contactData?.storeHours
    ? contactData.storeHours.split(", ").map((shift) => {
        const [openTime, closeTime] = shift.split(" ");
        return { openTime, closeTime };
      })
    : [{ openTime: "", closeTime: "" }];

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      ...contactData,
      shifts: defaultShifts,
    },
  });

  const [shiftCount, setShiftCount] = useState(defaultShifts.length);

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setloading(true);
      const storeHours = data.shifts
        .map((shift) => `${shift.openTime} ${shift.closeTime}`)
        .join(", ");
      await axios.patch(`/api/stores/${params.storeId}`, {
        ...data,
        storeHours,
      });
      router.refresh();
      toast.success("Store Updated");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setloading(false);
    }
  };

  const onDelete = async () => {
    try {
      setloading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store Deleted");
    } catch (error) {
      toast.error("Make sure you removed all products and categories");
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
        <Headding title="Settings" description="Edit your data" />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid xl:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1">
            <span className="flex-col">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading}
                        placeholder="Phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={loading}
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            <span className="flex-col">
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        disabled={loading}
                        placeholder="Facebook"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        disabled={loading}
                        placeholder="Instagram"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mercadoLibre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mercado Libre</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        disabled={loading}
                        placeholder="Mercado Libre"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            <span className="flex flex-col gap-0 pt-2  relative max-h-[13.3rem] min-h-[13.3rem] overflow-scroll">
              <FormItem className="flex flex-col w-[100%]">
                <FormLabel className="pb-1">Number of Shifts</FormLabel>
                <FormControl>
                  <select
                    className="p-2 border rounded bg-inherit sticky top-0"
                    value={shiftCount}
                    onChange={(e) => setShiftCount(Number(e.target.value))}
                    disabled={loading}
                  >
                    {[1, 2, 3, 4].map((count) => (
                      <option
                        className=" bg-white border-opacity-0"
                        key={count}
                        value={count}
                      >
                        {count}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </FormItem>

              {Array.from({ length: shiftCount }).map((_, index) => (
                <div className="flex gap-3 w-100%" key={index}>
                  <FormField
                    control={form.control}
                    name={`shifts.${index}.openTime`}
                    render={({ field }) => (
                      <FormItem className="flex-col w-[100%]">
                        <FormLabel>Open Time {index + 1}</FormLabel>
                        <FormControl>
                          <Input
                            className="flex justify-center"
                            type="time"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`shifts.${index}.closeTime`}
                    render={({ field }) => (
                      <FormItem className="flex-col w-[100%]">
                        <FormLabel>Close Time {index + 1}</FormLabel>
                        <FormControl>
                          <Input
                            className="flex justify-center"
                            type="time"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </span>
          </div>

          <div className="flex flex-row">
            <span className="flex flex-col gap-3 w-[100%]">
              <FormField
                control={form.control}
                name="aboutUs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About the store</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        placeholder="Short Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="flex flex-row align-bottom justify-between gap-3 w-[100%]">
                <div className="w-[100%]">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="flex flex-col align-bottom">
                        <FormLabel className="mt-1 mb-2">Country</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  " flex-1 max-h-10 ",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? countryList.find(
                                      (country) => country === field.value
                                    )
                                  : "Select country"}
                                <ArrowBigDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search country..."
                                className="h-9"
                              />
                              <CommandEmpty>No country found.</CommandEmpty>
                              <CommandGroup>
                                {countryList.map((country) => (
                                  <CommandItem
                                    value={country}
                                    key={country}
                                    onSelect={() => {
                                      form.setValue("country", country);
                                    }}
                                  >
                                    {country}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        country === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="State"
                          // className="w-55"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number</FormLabel>
                      <FormControl>
                        <Input
                          type="string"
                          disabled={loading}
                          placeholder="Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </span>
            </span>
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/stores/${params.storeId}`}
        variant={"public"}
      />
      <ApiAlert
        title="GET_STORE_DATA_API_URL"
        description={`${origin}/api/stores/${params.storeId}`}
        variant={"public"}
      />
    </>
  );
};
