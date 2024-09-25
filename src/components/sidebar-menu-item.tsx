import { Link, useLocation } from "react-router-dom";

interface MenuItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const SidebarMenuItem: React.FC<MenuItemProps> = ({
  to,
  icon: Icon,
  label,
}) => {
  const { pathname } = useLocation();
  const isActive = pathname.includes(to);
  return (
    <Link
      to={to}
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`flex items-center gap-3 rounded-lg px-3 py-4 transition-all ${
        isActive ? "text-secondary" : "text-foreground hover:opacity-75"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
};

export default SidebarMenuItem;
