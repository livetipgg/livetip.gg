import { useLocation, useParams } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { renderRouteLabel } from "@/helpers/renderRouteLabel";
import { getCurrentRouteLabel } from "@/helpers/getCurrentRouteLabel";
import { Title } from "./title";
import { ModeToggle } from "./mode-toggle";
interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const location = useLocation();
  console.log("Location", location);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-card-custom border-b">
          <div className="flex items-center justify-between flex-1 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <span className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:text-sm text-lg font-bold">
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
