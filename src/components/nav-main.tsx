"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { filteredMenuState } from "@/features/sidebar/states/menuState";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

export function NavMain() {
  const menuItems = useRecoilValue(filteredMenuState);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {menuItems.map((item) => (
          <Link to={item.to}>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.label}>
                {item.icon && <item.icon />}
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
