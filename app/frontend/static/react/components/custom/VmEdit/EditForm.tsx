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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetServices } from "@/hooks/use-get-services";
import { queryClient, queryClientKeys } from "@/const/query-client";
import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateVm, VmDetail, vmSchemaDetail } from "./hooks-and-types";

type EditFormProps = {
  id: number;
  closeModal: () => void;
  vm: VmDetail;
};

export function EditForm({ id, vm, closeModal }: EditFormProps) {
  const form = useForm<VmDetail>({
    resolver: zodResolver(vmSchemaDetail),
    defaultValues: {
      name: vm.name,
      ram: vm.ram,
      cpus: vm.cpus,
      active: vm.active,
      server_id: vm.server_id.toString(),
    },
  });

  const servers = useGetServices();

  const mutation = useUpdateVm();

  const success = () => {
    closeModal();
    queryClient.invalidateQueries({
      queryKey: [queryClientKeys.VirtualMachines],
      refetchType: "active",
    });
    queryClient.invalidateQueries({
      queryKey: [queryClientKeys.VirtualMachinesDetail, id],
    });
  };

  const isLoading = form.formState.isSubmitting || mutation.isPending;
  const onSubmit: SubmitHandler<VmDetail> = (data) => {
    mutation.mutate({ ...data, id }, { onSuccess: success });
  };

  const isDirty = form.formState.isDirty;

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
          <Button disabled={isLoading || !isDirty} type="submit">
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
