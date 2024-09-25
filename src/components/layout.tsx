import { BellIcon, Menu, PanelLeftClose } from "lucide-react";
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
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ModeToggle } from "@/components/mode-toggle";
import SidebarMenuItem from "@/components/sidebar-menu-item";
import MenuItemWithSubitems from "@/components/sidebar-menu-items-with-subitems";
import { useRecoilValue } from "recoil";
import { menuState } from "@/features/sidebar/states/menuState";
import { useState } from "react";
interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const menuItems = useRecoilValue(menuState);
  const [showSaldo, setShowSaldo] = useState(false);

  const user = {
    name: "Eduardo Moresco",
    email: "eduardomorescoiost@gmail.com",
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block  relative">
        <div className="flex h-full max-h-screen flex-col gap-2  sticky top-0 z-10">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              Logotipo
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
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 6 sticky top-0 z-10 backdrop-blur-xl">
          <div className="   flex-col hidden md:flex">
            <span className="text-xs font-semibold">Saldo:</span>
            <button
              onClick={() => setShowSaldo(!showSaldo)}
              className="text-lg"
            >
              {showSaldo ? (
                "R$ 1.000,00"
              ) : (
                <span className="text-lg blur-sm">R$ 1.000,00</span>
              )}
            </button>
          </div>
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
            <SheetContent side="left" className="flex flex-col">
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
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer w-8 h-8">
                <AvatarImage src="https://medisa.licdn.com/dms/image/v2/D4D03AQHgw4V53tPTwA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720038175146?e=1730937600&v=beta&t=MJItfILSRnIwLOsdBQbnTnAuN4fP8c5PdfoUrmV6J7A" />
                <AvatarFallback>EM</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div>
                  <span>{user.name}</span>
                  <span className="text-muted-foreground block text-sm font-normal">
                    {user.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configurações do perfil</DropdownMenuItem>
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-auto h-full w-full relative lg:p-6 p-4">
          {/* <DynamicBreadcrumbs /> */}

          {children}
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
