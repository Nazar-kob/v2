import React from "react";
import { Input } from "../../ui/input";

import { z } from "zod";
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
import { Checkbox } from "../../ui/checkbox";

const vmSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  ram: z.number().positive({ message: "Ram must be greater than 0" }),
  cpus: z.number().positive({ message: "CPUS must be greater than 0" }),
  active: z.boolean({ message: "Active is required" }),
  server_id: z.number({ message: "Server is required" }).positive(),
});
export type VmDetail = z.infer<typeof vmSchema>;

type EditFormProps = {
  id: number;
  closeModal: () => void;
  vm: VmDetail;
};

export function EditForm({ id, vm, closeModal }: EditFormProps) {
  const form = useForm<VmDetail>({
    resolver: zodResolver(vmSchema),
    defaultValues: {
      name: vm.name,
      ram: vm.ram,
      cpus: vm.cpus,
      active: vm.active,
      server_id: vm.server_id,
    },
  });

  const servers = useGetServices();

  const mutation = useMutation({
    mutationFn: async (newVm: VmDetail) => {
      const res = await fetch(`/api/vms/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVm),
      });
      if (!res.ok) {
        throw new Error("Failed to update VM");
      }
    },
    onSuccess: () => {
      toast({
        title: "VM updated successfully",
        description: "The VM has been updated successfully",
      });
      closeModal();
      queryClient.invalidateQueries({
        queryKey: [queryClientKeys.VirtualMachines],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: [queryClientKeys.VirtualMachinesDetail, id],
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
  const onSubmit: SubmitHandler<VmDetail> = (data) => {
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
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-4 items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="server_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Server</FormLabel>
              <Select
                onValueChange={() => field.onChange(Number(field.value))}
                defaultValue={field.value.toString()}
              >
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
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
