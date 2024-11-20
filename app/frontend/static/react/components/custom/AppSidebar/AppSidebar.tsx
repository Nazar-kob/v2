import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { AppPanel, sidebarItems } from "@/const/panel";

export function AppSidebar({
  children,
  panelName,
  onClickItem,
}: {
  children: React.ReactNode;
  panelName: string;
  onClickItem: (panel: AppPanel) => void;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="flex justify-between p-2">
              <img
                src="https://dash.v2cloud.com/static/frontend/images/v2.png?v=0.10.43-6"
                alt="logo"
                className="w-12 h-12 p-2"
              />
              <span className="text-lg font-bold">V2 Cloud</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    onClick={() => onClickItem(item.title)}
                  >
                    <SidebarMenuButton
                      asChild
                      variant={item.title === panelName ? "outline" : "default"}
                    >
                      <div>
                        <item.icon />
                        <span>{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="p-4 w-full">{children}</div>
    </SidebarProvider>
  );
}
