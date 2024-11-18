import * as React from "react";
import { Server, Monitor } from "lucide-react";
import { VmTablet } from "../components/custom/VmTablet/VmTablet";
import ServersTablet from "../components/custom/ServerTablet/ServersTablet";

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
  [AppPanel.Servers]: <ServersTablet />,
  [AppPanel.VirtualMachines]: <VmTablet />,
};

export { AppPanel, sidebarItems, panels };
