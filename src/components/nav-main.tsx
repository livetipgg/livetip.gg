/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { filteredMenuState } from "@/features/sidebar/states/menuState";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronRight, SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function NavMain() {
  const menuItems = useRecoilValue(filteredMenuState);
  const { state } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {menuItems.map((item) => {
          const [isOpen, setIsOpen] = useState(
            item.subItems &&
              item.subItems.some(
                (subItem) => subItem.to === window.location.pathname
              )
          );

          const handleToggle = () => setIsOpen((prev) => !prev);

          return (
            <Link to={item.to} key={item.label}>
              {item.subItems && (
                <Collapsible
                  className="group/collapsible"
                  asChild
                  open={isOpen}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      {state === "collapsed" ? (
                        <div>
                          {" "}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <SidebarMenuButton
                                tooltip={item.label}
                                onClick={handleToggle}
                                className={
                                  item.subItems.some(
                                    (subItem) =>
                                      subItem.to === window.location.pathname
                                  ) || isOpen
                                    ? "text-primary"
                                    : ""
                                }
                              >
                                {item.icon && <item.icon />}
                                <span>{item.label}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                              </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuLabel>
                                <span>{item.label}</span>
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {item.subItems.map((subItem) => (
                                <DropdownMenuItem>
                                  <Link to={subItem.to} className="w-full">
                                    <div className="flex items-center gap-2 w-full">
                                      <span>{subItem.label}</span>
                                      <SquareArrowOutUpRight className="w-4 h-4 ml-auto" />
                                    </div>
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ) : (
                        <SidebarMenuButton
                          tooltip={item.label}
                          onClick={handleToggle}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.label}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.label}>
                            <SidebarMenuSubButton
                              asChild
                              className={
                                subItem.to === window.location.pathname
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              <Link to={subItem.to}>
                                <span>{subItem.label}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}
              {!item.subItems && (
                <SidebarMenuItem
                  className={
                    item.to === window.location.pathname ? "text-primary" : ""
                  }
                >
                  <SidebarMenuButton tooltip={item.label}>
                    {item.icon && <item.icon />}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
