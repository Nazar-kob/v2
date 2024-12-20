import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { EditSheet } from "../VmEdit/EditSheet";
import { SshKeysList } from "../SshKeysList/SshKeysList";

export function ActionsBtn({ id }: { id: number }) {
  const [openEdit, setOpenEdit] = React.useState(false);

  const [openConfirm, setOpenConfirm] = React.useState(false);

  const [openSshKeys, setOpenSshKeys] = React.useState(false);

  const onClickEdit = () => {
    setOpenEdit(true);
  };

  const onClickDelete = () => {
    setOpenConfirm(true);
  };

  const onClickSshKeys = () => {
    setOpenSshKeys(true);
  };

  return (
    <>
      <SshKeysList vmId={id} open={openSshKeys} setOpen={setOpenSshKeys} />
      <DeleteAlertDialog id={id} open={openConfirm} setOpen={setOpenConfirm} />
      <EditSheet id={id} open={openEdit} setIsOpen={setOpenEdit} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onClickEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={onClickDelete}>Delete</DropdownMenuItem>
          <DropdownMenuItem onClick={onClickSshKeys}>SsH keys</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
