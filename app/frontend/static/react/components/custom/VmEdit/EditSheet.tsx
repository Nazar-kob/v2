"use client";

import * as React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/const/query-client";
import { EditForm } from "./EditForm";
import { VmDetail } from "./hooks-and-types";

export const getVmDetail = async (id: number): Promise<VmDetail> => {
  const res = await fetch(`/api/vms/${id}/`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch VM");
  }
  return res.json();
};

export function EditSheet({
  id,
  open,
  setIsOpen,
}: {
  id: number;
  open: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const { data, isError, isLoading } = useQuery<VmDetail, Error>({
    queryFn: () => getVmDetail(id),
    queryKey: [queryClientKeys.VirtualMachinesDetail, id],
    refetchOnWindowFocus: false,
    enabled: open,
    retry: false,
  });

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

  const isOpen = open && !isLoading && !isError && !!data;

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit</SheetTitle>
        </SheetHeader>
        {data && <EditForm id={id} vm={data} closeModal={closeModal} />}
      </SheetContent>
    </Sheet>
  );
}
