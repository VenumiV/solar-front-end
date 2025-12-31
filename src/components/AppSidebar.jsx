import { ChartLine, LayoutDashboard, TriangleAlert, Receipt } from "lucide-react";
import { Link } from "react-router";
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
import { useLocation } from "react-router";
import { cn } from "@/lib/utils";
import solarLogo from "@/assets/images/solar-logo.svg";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard className="w-8 h-8" size={32} />,
  },
  {
    title: "Anomalies",
    url: "/dashboard/anomalies",
    icon: <TriangleAlert className="w-8 h-8" size={32} />,
  },
  {
    title: "Invoices",
    url: "/dashboard/invoices",
    icon: <Receipt className="w-8 h-8" size={32} />,
  },
 
];


  const SideBarTab = ({ item }) => {
    let location = useLocation();
    let isActive = location.pathname === item.url || location.pathname.startsWith(item.url + "/");
  
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
  
export function AppSidebar() {
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
                SolarFlux
              </span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4 space-y-1">
              {items.map((item) => (
                <SideBarTab key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}