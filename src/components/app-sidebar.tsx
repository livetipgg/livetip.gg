import * as React from "react";

import { NavMain } from "@/components/nav-main";
import icon from "@/assets/icon.png";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-1 h-11">
          <div className="flex aspect-square size-8   items-center justify-center rounded-lg  ">
            <img src={icon} alt="Logotipo" className="size-6" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-lg">LiveTip</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter className=" flex items-center justify-center">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
