import React from "react";
import { Input } from "../../ui/input";

import { z } from "zod"; // Add new import
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "../../ui/dialog";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

import { useGetServices } from "../../../hooks/get-services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../../../hooks/use-toast";
import { queryClient, queryClientKeys } from "../../../const/query-client";

const serverSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  region: z.string({ required_error: "Region is required" }),
});
type ServerType = z.infer<typeof serverSchema>;

export function AddForm({ closeModal }: { closeModal: () => void }) {
  const form = useForm<ServerType>({
    resolver: zodResolver(serverSchema),
    defaultValues: {
      name: "",
      region: "",
    },
  });

  const servers = useGetServices();

  const mutation = useMutation({
    mutationFn: async (serverValue: ServerType) => {
      const res = await fetch("/api/servers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serverValue),
      });
      if (!res.ok) {
        throw new Error("Error creating server");
      }
      return res.json();
    },
    onSuccess: async () => {
      form.reset();
      toast({
        title: "Server created successfully",
        description: "The Server has been created successfully",
      });
      closeModal();
      queryClient.invalidateQueries({
        queryKey: [queryClientKeys.Servers],
        refetchType: "active",
      });
    },
    onError: (error) => {
      toast({
        title: "An error occurred",
        description: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<ServerType> = (data) => {
    mutation.mutate(data);
  };

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
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
