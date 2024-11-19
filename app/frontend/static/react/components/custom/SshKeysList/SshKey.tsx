import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { DeleteBtn } from "./DeleteBtn";

export interface ISshKey {
  id: number;
  name: string;
  public_key: string;
}

export function SshKey({ vmId, sshKey }: { sshKey: ISshKey; vmId: number }) {
  return (
    <AccordionItem value={`item-${sshKey.id}`}>
      <AccordionTrigger>{sshKey.name}</AccordionTrigger>
      <AccordionContent className="flex justify-between">
        <pre className="text-xs">{sshKey.public_key}</pre>
        <DeleteBtn vmId={vmId} sshKeyId={sshKey.id} />
      </AccordionContent>
    </AccordionItem>
  );
}
