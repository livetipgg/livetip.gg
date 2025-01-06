import * as React from "react";

import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Link } from "react-router-dom";
import { NavBalance } from "./nav-balance";
import { SidebarDynamicLogo } from "./sidebar-dynamic-logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="selector1">
      <SidebarHeader>
        <Link to="/" className="flex items-center">
          <SidebarDynamicLogo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavBalance />

        <NavMain />
      </SidebarContent>
      <SidebarFooter className=" flex items-center justify-center">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
