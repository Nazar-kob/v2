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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useGetServices } from "../../../hooks/use-get-services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../../../hooks/use-toast";
import { queryClient, queryClientKeys } from "../../../const/query-client";

const vmSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  ram: z.number().min(1, { message: "Ram must be greater than 0" }),
  cpus: z.number().min(1, { message: "CPUS must be greater than 0" }),
  server_id: z.string(),
});
type VmType = z.infer<typeof vmSchema>;

export function AddForm({ closeModal }: { closeModal: () => void }) {
  const form = useForm<VmType>({
    resolver: zodResolver(vmSchema),
    defaultValues: {
      name: "",
      ram: 0,
      cpus: 0,
      server_id: "",
    },
  });

  const servers = useGetServices();

  const mutation = useMutation({
    mutationFn: async (newVm: VmType) => {
      const res = await fetch("/api/vms/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVm),
      });
      if (!res.ok) {
        throw new Error("Failed to create VM");
      }
    },
    onSuccess: async () => {
      form.reset();
      toast({
        title: "VM created successfully",
        description: "The VM has been created successfully",
      });
      closeModal();
      queryClient.invalidateQueries({
        queryKey: [queryClientKeys.VirtualMachines],
        refetchType: "active",
      });
    },
    onError: (error) => {
      toast({
        title: "An error occurred",
        description: error.message,
        variant: "error",
      });
    },
  });

  const isLoading = form.formState.isSubmitting || mutation.isPending;
  const onSubmit: SubmitHandler<VmType> = (data) => {
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
          name="ram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RAM</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="ram"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPUS</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="cpus"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="server_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Server</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select server" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {servers.map((server) => (
                    <SelectItem key={server.id} value={server.id.toString()}>
                      {server.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button disabled={isLoading} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
