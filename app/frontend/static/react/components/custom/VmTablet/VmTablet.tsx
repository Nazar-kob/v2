import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VmRaw } from "./VmRaw";
import { AddModal } from "./AddModal";
import { queryClientKeys } from "../../../const/query-client";

interface VirtualMachine {
  id: number;
  name: string;
  cpus: number;
  ram: number;
  active: boolean;
  server_name: string;
}

async function getVirtualMachine(): Promise<VirtualMachine[]> {
  const res = await fetch("/api/vms");
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  return res.json();
}

export function VmTablet() {
  const { data } = useSuspenseQuery<VirtualMachine[]>({
    queryKey: [queryClientKeys.VirtualMachines],
    queryFn: getVirtualMachine,
  });

  return (
    <div>
      <div className="flex flex-row justify-end">
        <AddModal />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>CPUS</TableHead>
            <TableHead>RAM</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Server</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((vm) => (
            <VmRaw key={vm.id} {...vm} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default VmTablet;
