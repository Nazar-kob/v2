import * as React from "react";
import { Server, Monitor } from "lucide-react";
import { VirtualMachines } from "../components/custom/VirtualMachines/VirtualMachines";

enum AppPanel {
  Servers = "Servers",
  VirtualMachines = "Virtual machines",
}

const sidebarItems = [
  {
    title: AppPanel.Servers,
    icon: Server,
  },
  {
    title: AppPanel.VirtualMachines,
    icon: Monitor,
  },
];

const panels = {
  [AppPanel.Servers]: <div>Servers</div>,
  [AppPanel.VirtualMachines]: <VirtualMachines />,
};

export { AppPanel, sidebarItems, panels };
