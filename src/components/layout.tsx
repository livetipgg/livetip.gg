import { useLocation } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { getCurrentRouteLabel } from "@/helpers/getCurrentRouteLabel";
import { ModeToggle } from "./mode-toggle";
interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0   sticky top-0 z-10 backdrop-blur-xl  items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-card-custom border-b">
          <div className="flex items-center justify-between flex-1 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <span
                className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:text-sm text-xl font-bold 
           
                "
              >
                {getCurrentRouteLabel(location.pathname)}
              </span>
            </div>
            <ModeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-auto h-full w-full relative lg:p-6 p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
