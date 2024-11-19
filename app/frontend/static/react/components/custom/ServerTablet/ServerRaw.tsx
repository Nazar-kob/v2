import React from "react";

import { TableCell, TableRow } from "../../ui/table";
import { IServer } from "../../../hooks/use-get-services";

export function ServerRaw({ name, region }: IServer) {
  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{region}</TableCell>
    </TableRow>
  );
}
