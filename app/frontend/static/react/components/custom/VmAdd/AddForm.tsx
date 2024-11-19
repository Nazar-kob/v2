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
import { useCreateVm, vmSchema, VmType } from "./hooks-and-types";

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

  const mutation = useCreateVm();

  const success = () => {
    form.reset();
    closeModal();
  };

  const isLoading = form.formState.isSubmitting || mutation.isPending;
  const onSubmit: SubmitHandler<VmType> = (data) => {
    mutation.mutate(data, { onSuccess: success });
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
