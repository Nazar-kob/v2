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
import { queryClient, queryClientKeys } from "@/const/query-client";
import { Textarea } from "@/components/ui/textarea";
import { sshKeySchema, SshKeyType, useCreateSshKey } from "./hooks-and-types";

interface PropsAddForm {
  vmId: number;
}

export function AddForm({ vmId }: PropsAddForm) {
  const form = useForm<SshKeyType>({
    resolver: zodResolver(sshKeySchema),
    defaultValues: {
      name: "",
      public_key: "",
    },
  });

  const mutation = useCreateSshKey();

  function success() {
    form.reset();
    queryClient.invalidateQueries({
      queryKey: [queryClientKeys.VirtualMachinesDetailSshKeys, vmId],
      refetchType: "active",
    });
  }

  const isLoading = form.formState.isSubmitting || mutation.isPending;
  const onSubmit: SubmitHandler<SshKeyType> = (data) => {
    mutation.mutate({ ...data, vmId: vmId }, { onSuccess: success });
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
          name="public_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Public key</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your publick key here"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button className="w-full" disabled={isLoading} type="submit">
            Add
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
