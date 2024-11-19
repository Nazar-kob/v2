import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { queryClientKeys } from "@/const/query-client";
import { toast } from "@/hooks/use-toast";
import { ISshKey, SshKey } from "./SshKey";
import { AddForm } from "./AddForm";
import { Accordion } from "@/components/ui/accordion";

interface SshKeysListProps {
  vmId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

async function getSshKeys(vmId: number) {
  const res = await fetch(`/api/vms/${vmId}/ssh-keys`);
  if (!res.ok) {
    throw new Error("Failed to fetch ssh keys");
  }
  return res.json();
}

export function SshKeysList({ vmId, open, setOpen }: SshKeysListProps) {
  const { data, isError, isLoading } = useQuery<ISshKey[]>({
    queryFn: () => getSshKeys(vmId),
    queryKey: [queryClientKeys.VirtualMachinesDetailSshKeys, vmId],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: open,
  });

  function closeModal() {
    setOpen(false);
  }

  React.useEffect(() => {
    if (isError) {
      toast({
        title: "An error occurred",
        description: "Failed to fetch VM",
        variant: "error",
      });
      closeModal();
    }
  }, [isError]);

  const isOpen = open && !isError && !isLoading;
  const hasSshKeys = data && data.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ssh Keys</DialogTitle>
        </DialogHeader>
        {!hasSshKeys && (
          <DialogDescription>
            No SSH keys are associated with this VM.
          </DialogDescription>
        )}

        <div className="grid gap-4 py-4">
          <Accordion type="single" collapsible className="w-full">
            {data?.map((sshKey: ISshKey) => (
              <SshKey key={sshKey.id} vmId={vmId} sshKey={sshKey} />
            ))}
          </Accordion>
        </div>
        <AddForm vmId={vmId} />
      </DialogContent>
    </Dialog>
  );
}
