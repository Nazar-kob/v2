import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { EditSheet } from "./EditSheet";

export function ActionsBtn({ id }: { id: number }) {
  const [openEdit, setOpenEdit] = React.useState(false);

  const [openConfirm, setOpenConfirm] = React.useState(false);

  const onClickEdit = () => {
    setOpenEdit(true);
  };

  const onClickDelete = () => {
    setOpenConfirm(true);
  };

  return (
    <>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
