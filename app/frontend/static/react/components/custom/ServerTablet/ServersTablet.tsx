import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { ServerRaw } from "./ServerRaw";
import { AddModal } from "./AddModal";
import { useGetServices } from "../../../hooks/get-services";

export function ServersTablet() {
  const data = useGetServices();

  return (
    <div>
      <div className="flex flex-row justify-end">
        <AddModal />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Region</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((vm) => (
            <ServerRaw key={vm.id} {...vm} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ServersTablet;
