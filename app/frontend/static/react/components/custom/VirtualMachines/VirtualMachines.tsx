import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useVirtualMachines } from "./hooks";

export function VirtualMachines() {
  const data = useVirtualMachines();

  console.log(data);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>CPUS</TableHead>
            <TableHead>RAM</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Server</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </div>
  );
}
