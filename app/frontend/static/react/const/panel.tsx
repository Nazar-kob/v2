import * as React from "react";
import { Server, Monitor } from "lucide-react";
import { VmTablet } from "../components/custom/VmTablet/VmTablet";

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
  [AppPanel.VirtualMachines]: <VmTablet />,
};

export { AppPanel, sidebarItems, panels };
