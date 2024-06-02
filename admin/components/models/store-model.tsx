"use client";
import * as z from "zod";
import axios from 'axios'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { useStoreModal } from "@/hooks/use-store-modules";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignOutButton } from "@clerk/nextjs";


const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/stores', values);
      if(response) window.location.assign(`/${response.data.id}`);
      
      toast.success("Store created")
    } catch (error) {
      toast.error("Something went wrong")
    }finally {
      setLoading(false)
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new Store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Folk"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />

              <div className="pt-6 space-x-2 flex gap-3 items-center justify-end">
                <Button
                  variant="outline"
                  disabled={loading}
                  type="button" 
                  onClick={storeModal.onClose}
                  >
                <SignOutButton />
                 
                </Button>
                <Button
                  variant="outline"
                  disabled={loading}
                  onClick={storeModal.onClose}
                  >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
