import { Menu, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ModeToggle } from "@/components/mode-toggle";
import SidebarMenuItem from "@/components/sidebar-menu-item";
import MenuItemWithSubitems from "@/components/sidebar-menu-items-with-subitems";
import { useRecoilValue } from "recoil";
import { menuState } from "@/features/sidebar/states/menuState";
import { useAuthLogoutUseCase } from "@/features/auth/useCases/useAuthLogoutUseCase";
import {
  BalanceMobilePreview,
  BalancePreview,
} from "../features/balance/presentations/components/balance-preview";
import { authState } from "@/features/auth/states/atoms";
import { Logotipo } from "./logotipo";
interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const menuItems = useRecoilValue(menuState);
  const { handleLogout } = useAuthLogoutUseCase();
  const { user } = useRecoilValue(authState);
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card-custom md:block  relative">
        <div className="flex h-full max-h-screen flex-col gap-2  sticky top-0 z-10">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Logotipo classname="w-[100px]" />
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {menuItems.map((item) =>
                item.subItems ? (
                  <MenuItemWithSubitems
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    subitems={item.subItems.map((subitem) => ({
                      to: subitem.to,
                      label: subitem.label,
                      icon: subitem.icon,
                    }))}
                  />
                ) : (
                  <SidebarMenuItem
                    key={item.label}
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                  />
                )
              )}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card-custom px-4 lg:h-[60px] lg:px-6 6 sticky top-0 z-10 backdrop-blur-xl">
          <BalancePreview />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col justify-between">
              <nav className="grid gap-2 text-lg font-medium">
                {menuItems.map((item) =>
                  item.subItems ? (
                    <MenuItemWithSubitems
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      subitems={item.subItems.map((subitem) => ({
                        to: subitem.to,
                        label: subitem.label,
                        icon: subitem.icon,
                      }))}
                    />
                  ) : (
                    <SidebarMenuItem
                      key={item.label}
                      to={item.to}
                      icon={item.icon}
                      label={item.label}
                    />
                  )
                )}
              </nav>
              <BalanceMobilePreview />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer w-8 h-8 ">
                <AvatarImage src={user.avatar_url} className="object-cover" />
                <AvatarFallback>
                  <UserRound className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div>
                  <span>{user.username}</span>
                  <span className="text-muted-foreground block text-sm font-normal">
                    {user.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/perfil")}>
                Configurações do perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-auto h-full w-full relative lg:p-6 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
