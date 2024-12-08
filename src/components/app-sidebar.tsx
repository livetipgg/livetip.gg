import * as React from "react";

import { NavMain } from "@/components/nav-main";
import icon from "@/assets/icon.svg";
import logotipo_white from "@/assets/logotipo_white.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Link } from "react-router-dom";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props} className="selector1">
      <SidebarHeader>
        {state !== "collapsed" ? (
          <Link to="/" className="flex items-center">
            <div className="flex  items-center h-11  rounded-lg    ">
              <img src={logotipo_white} alt="logo" className="w-32" />
            </div>
          </Link>
        ) : (
          <Link to="/" className="flex items-center">
            <div className="flex  items-center size-8 aspect-square  rounded-lg    ">
              <img src={icon} alt="logo" />
            </div>
          </Link>
        )}
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
