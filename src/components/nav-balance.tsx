import { PiggyBank } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { BalancePreview } from "@/features/balance/presentations/components/balance-preview";

export const NavBalance = () => {
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  const isCollapsed = state === "collapsed";
  if (!isCollapsed)
    return (
      <SidebarGroup>
        <BalancePreview />
      </SidebarGroup>
    );

  return (
    <SidebarGroup>
      <SidebarMenu className="selector2">
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg">
                <Button
                  className="flex items-center flex-col text-xs"
                  size="icon"
                >
                  <PiggyBank size={18} />
                </Button>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
              className="w-[250px]"
            >
              <BalancePreview />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};
