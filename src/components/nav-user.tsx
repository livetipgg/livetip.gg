"use client";

import { LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useRecoilValue } from "recoil";
import { authState } from "@/features/auth/states/atoms";
import { useAuthLogoutUseCase } from "@/features/auth/useCases/useAuthLogoutUseCase";
import { Link } from "react-router-dom";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useRecoilValue(authState);
  const { handleLogout } = useAuthLogoutUseCase();
  return (
    <SidebarMenu className="selector2">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user.photoUrl}
                  alt={user.username}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.username}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <CaretSortIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.photoUrl}
                    alt={user.username}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <Link
                  to={"/perfil"}
                  className="grid flex-1 text-left text-sm leading-tight"
                >
                  <span className="truncate font-semibold">
                    {user.username}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </Link>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-danger  " onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
