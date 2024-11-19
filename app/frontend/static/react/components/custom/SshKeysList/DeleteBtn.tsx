import React from "react";
import { Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, queryClientKeys } from "../../../const/query-client";
import { toast } from "../../../hooks/use-toast";

type DeleteBtnProps = {
  vmId: number;
  sshKeyId: number;
};

async function deleteSshKey(vmId: number, sshKeyId: number) {
  const res = await fetch(`/api/vms/${vmId}/ssh-keys/${sshKeyId}/`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete key");
  }
}

const useMutationDeleteSshKey = ({ vmId, sshKeyId }: DeleteBtnProps) => {
  return useMutation({
    mutationFn: () => deleteSshKey(vmId, sshKeyId),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [queryClientKeys.VirtualMachinesDetailSshKeys, vmId],
      });
      toast({
        title: "Ssh Key deleted successfully",
        description: "The Ssh Key has been deleted successfully",
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
};

export const DeleteBtn = ({ vmId, sshKeyId }: DeleteBtnProps) => {
  const mutatation = useMutationDeleteSshKey({ vmId, sshKeyId });

  const onClick = () => {
    mutatation.mutate();
  };

  return <Trash2 color="red" onClick={onClick} />;
};
