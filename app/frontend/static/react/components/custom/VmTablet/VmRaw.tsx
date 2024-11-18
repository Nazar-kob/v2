import React from "react";

import { TableCell, TableRow } from "../../ui/table";
import { VirtualMachine } from "./types";
import { ActionsBtn } from "./ActionsBtn";

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
          <div className="h-4 w-4 rounded-full bg-red-500 text-white flex items-center justify-center"></div>
        ) : (
          <div className="h-4 w-4 rounded-full bg-green-500 text-white flex items-center justify-center opacity-50"></div>
        )}
      </TableCell>
      <TableCell>{server_name}</TableCell>
      <TableCell className="text-center">
        <ActionsBtn id={id} />
      </TableCell>
    </TableRow>
  );
}
