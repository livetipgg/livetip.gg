import { useSidebar } from "./ui/sidebar";
import icon from "@/assets/icon_full.png";
import logotipo from "@/assets/logotipoOrange.svg";
export const SidebarDynamicLogo = () => {
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";
  console.log("isCollapsed", isCollapsed);
  if (isCollapsed && !isMobile) {
    return (
      <div className="flex items-center size-8">
        <img src={icon} alt="" className="w-[40px]" />
      </div>
    );
  }

  return (
    <div className="flex items-center p-2">
      <img src={logotipo} alt="" className="max-w-28" />
    </div>
  );
};
