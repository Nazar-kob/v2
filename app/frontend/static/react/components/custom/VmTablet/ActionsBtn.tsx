import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button";
import { DeleteBtn } from "./DeleteBtn";

export function ActionsBtn({ id }: { id: number }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DeleteBtn id={id} />
        <DropdownMenuItem>SSH Keys</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
