import * as React from "react";

import { NavMain } from "@/components/nav-main";
import iconPng from "@/assets/icon.png";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Link } from "react-router-dom";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="selector1">
      <SidebarHeader>
        <Link to="/" className="flex items-center">
          <div className="flex  items-center size-8 aspect-square  rounded-lg    ">
            <img src={iconPng} alt="logo" />
          </div>
          <span className="ml-2 text-primary font-bold text-2xl">LiveTip</span>
        </Link>
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
