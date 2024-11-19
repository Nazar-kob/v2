import React from "react";
import { Trash2 } from "lucide-react";
import { useDeleteSshKey } from "./hooks-and-types";
import { queryClient, queryClientKeys } from "@/const/query-client";

type DeleteBtnProps = {
  vmId: number;
  sshKeyId: number;
};

export const DeleteBtn = ({ vmId, sshKeyId }: DeleteBtnProps) => {
  const mutatation = useDeleteSshKey();

  const success = () => {
    queryClient.invalidateQueries({
      queryKey: [queryClientKeys.VirtualMachinesDetailSshKeys, vmId],
      refetchType: "active",
    });
  };

  const onClick = () => {
    mutatation.mutate({ vmId, sshKeyId }, { onSuccess: success });
  };

  return <Trash2 color="red" onClick={onClick} />;
};
