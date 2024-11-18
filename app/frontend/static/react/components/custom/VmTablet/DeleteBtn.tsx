import React from "react";

import { DropdownMenuItem } from "../../ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../../../hooks/use-toast";
import { queryClient, queryClientKeys } from "../../../const/query-client";

export function DeleteBtn({ id }: { id: number }) {
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
      });
    },
  });

  const handleClick = () => {
    mutation.mutate(id);
  };

  return <DropdownMenuItem onClick={handleClick}>Delete</DropdownMenuItem>;
}
