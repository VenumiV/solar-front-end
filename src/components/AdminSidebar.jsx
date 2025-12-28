import { Settings, Zap, TriangleAlert } from "lucide-react";
import { Link, useLocation } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import solarLogo from "@/assets/images/solar-logo.svg";
import { cn } from "@/lib/utils";

// Menu items for admin navigation.
const items = [
  {
    title: "Solar Units",
    url: "/admin/solar-units",
    icon: <Zap className="w-8 h-8" size={32} />,
  },
  {
    title: "Anomalies",
    url: "/admin/anomalies",
    icon: <TriangleAlert className="w-8 h-8" size={32} />,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: <Settings className="w-8 h-8" size={32} />,
  },
];

const AdminSideBarTab = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === item.url || location.pathname.startsWith(item.url + "/");

  return (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton 
        asChild 
        isActive={isActive}
        className="transition-all duration-200 hover:bg-accent/50"
      >
        <Link
          to={item.url}
          className="flex items-center gap-3"
        >
          <span className={cn(
            "transition-transform duration-200",
            isActive && "scale-110"
          )}>
            {item.icon}
          </span>
          <span className="font-medium">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function AdminSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src={solarLogo}
                alt="SolarFlux Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                SolarFlux Admin
              </span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4 space-y-1">
              {items.map((item) => (
                <AdminSideBarTab key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}