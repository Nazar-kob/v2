import React, { Suspense } from "react";

import { CircleFadingPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddForm } from "./AddForm";
import { Loading } from "../Loading/Loading";

export function AddModal() {
  const [open, setOpen] = React.useState(false);

  function closeModal() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          Add <CircleFadingPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add server</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<Loading />}>
          {<AddForm closeModal={closeModal} />}
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
