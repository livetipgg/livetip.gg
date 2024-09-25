import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocation } from "react-router-dom";
import SidebarMenuItem from "./sidebar-menu-item";
import { useState } from "react";

interface MenuItemWithSubitemsProps {
  icon: React.ElementType;
  label: string;
  subitems: Array<{ to: string; label: string; icon: React.ElementType }>;
}

const MenuItemWithSubitems: React.FC<MenuItemWithSubitemsProps> = ({
  icon: Icon,
  label,
  subitems,
}) => {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname.includes(path);
  const [open, setOpen] = useState(false);
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger
          onClick={() => setOpen(!open)}
          className={`py-0 hover:no-underline ${
            isActive("/financeiro")
              ? "text-secondary"
              : "text-foreground hover:opacity-75"
          }`}
        >
          <div className="flex items-center gap-3 rounded-lg px-3 py-4 transition-all">
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="py-0 pl-8">
          {subitems.map((item) => (
            <SidebarMenuItem
              to={item.to}
              icon={item.icon}
              label={item.label}
              key={item.label}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MenuItemWithSubitems;
