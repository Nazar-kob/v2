import React from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { ActionsBtn } from "./ActionsBtn";
import { VirtualMachine } from "./hooks-and-types";

export function VmRaw({
  id,
  name,
  cpus,
  ram,
  active,
  server_name,
}: VirtualMachine) {
  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{cpus}</TableCell>
      <TableCell>{ram}</TableCell>
      <TableCell>
        {active ? (
          <div className="h-4 w-4 rounded-full bg-green-500 text-white flex items-center justify-center opacity-50"></div>
        ) : (
          <div className="h-4 w-4 rounded-full bg-red-500 text-white flex items-center justify-center"></div>
        )}
      </TableCell>
      <TableCell>{server_name}</TableCell>
      <TableCell className="text-center">
        <ActionsBtn id={id} />
      </TableCell>
    </TableRow>
  );
}
