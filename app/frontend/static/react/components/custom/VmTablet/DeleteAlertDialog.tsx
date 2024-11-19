import React from "react";

import { useMutation } from "@tanstack/react-query";
import { toast } from "../../../hooks/use-toast";
import { queryClient, queryClientKeys } from "../../../const/query-client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";

export function DeleteAlertDialog({
  id,
  open,
  setOpen,
}: {
  id: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const mutation = useMutation({
    mutationFn: (id: number) => {
      return fetch(`/api/vms/${id}/`, {
        method: "DELETE",
      });
    },
    onSuccess: async () => {
      toast({
        title: "VM deleted successfully",
        description: "The VM has been deleted successfully",
      });
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

  const handleClick = () => {
    mutation.mutate(id);
  };

  const onClickCancel = () => {
    setOpen(false);
  };

  const isLoading = mutation.isPending;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            virtual machine
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClickCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={handleClick}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
