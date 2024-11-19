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
import { useMutation } from "@tanstack/react-query";
import { toast } from "../../../hooks/use-toast";
import { queryClient, queryClientKeys } from "../../../const/query-client";
import { Textarea } from "../../ui/textarea";

const sshKeySchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  public_key: z.string({ required_error: "Public key is required" }),
});
type SshKeyType = z.infer<typeof sshKeySchema>;

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

  const mutation = useMutation({
    mutationFn: async (newKey: SshKeyType) => {
      const res = await fetch(`/api/vms/${vmId}/ssh-keys/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newKey),
      });
      if (!res.ok) {
        throw new Error("Failed to create Key");
      }
    },
    onSuccess: async () => {
      form.reset();
      toast({
        title: "Ssh Key created successfully",
        description: "The Ssh Key has been created successfully",
      });
      queryClient.invalidateQueries({
        queryKey: [queryClientKeys.VirtualMachinesDetailSshKeys, vmId],
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
  const onSubmit: SubmitHandler<SshKeyType> = (data) => {
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
