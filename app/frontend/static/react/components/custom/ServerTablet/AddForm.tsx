import React from "react";
import { Input } from "@/components/ui/input";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { serverSchema, ServerType, useCreateServer } from "./hooks-and-types";

export function AddForm({ closeModal }: { closeModal: () => void }) {
  const form = useForm<ServerType>({
    resolver: zodResolver(serverSchema),
    defaultValues: {
      name: "",
      region: "",
    },
  });

  const mutation = useCreateServer();

  function success() {
    form.reset();
    closeModal();
  }

  const onSubmit: SubmitHandler<ServerType> = (data) => {
    mutation.mutate(data, { onSuccess: success });
  };

  const isLoading = form.formState.isSubmitting || mutation.isPending;

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Input placeholder="region" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
