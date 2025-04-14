
import { 
  Activity, 
  Bell, 
  Calendar, 
  FileText, 
  Home, 
  MapPin, 
  Menu, 
  Phone, 
  Settings, 
  Shield, 
  Users,
  PackageCheck,
  BellRing
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
  hasAlert?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, label, to, active, hasAlert, onClick }: NavItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 pl-3 pr-3 relative group transition-all duration-300 ease-out",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
      onClick={onClick}
      asChild
    >
      <Link to={to}>
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5" />
          <span className="font-medium">{label}</span>
        </div>
        {hasAlert && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-destructive animate-pulse-gentle" />
        )}
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-0.5 bg-sidebar-primary scale-y-0 transition-transform origin-center duration-150 ease-out",
            active && "scale-y-100"
          )}
        />
      </Link>
    </Button>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Define route paths and their corresponding labels
  const pathToLabel: Record<string, string> = {
    "/": "Dashboard",
    "/dashboard": "Dashboard",
    "/alerts": "Alerts",
    "/incidents": "Incidents",
    "/map": "Map View",
    "/personnel": "Personnel",
    "/resources": "Resources",
    "/reports": "Reports",
    "/planning": "Planning",
    "/contacts": "Contacts",
    "/settings": "Settings",
    "/lending": "Lending",
    "/admin/alerts": "Send Alerts",
  };

  // Get active item based on current location
  const activeItem = pathToLabel[location.pathname] || "Dashboard";

  const mainNavItems = [
    { icon: Home, label: "Dashboard", to: "/dashboard", hasAlert: false },
    { icon: Bell, label: "Alerts", to: "/alerts", hasAlert: true },
    { icon: Activity, label: "Incidents", to: "/incidents", hasAlert: false },
    { icon: MapPin, label: "Map View", to: "/map", hasAlert: false },
    { icon: Users, label: "Personnel", to: "/personnel", hasAlert: false },
    { icon: Shield, label: "Resources", to: "/resources", hasAlert: false },
    { icon: PackageCheck, label: "Lending", to: "/lending", hasAlert: false },
    { icon: FileText, label: "Reports", to: "/reports", hasAlert: false },
    { icon: Calendar, label: "Planning", to: "/planning", hasAlert: false },
    { icon: Phone, label: "Contacts", to: "/contacts", hasAlert: false },
  ];
  
  const adminNavItems = [
    { icon: BellRing, label: "Send Alerts", to: "/admin/alerts", hasAlert: false },
    { icon: Settings, label: "Settings", to: "/settings", hasAlert: false },
  ];

  return (
    <div 
      className={cn(
        "h-screen fixed left-0 top-0 bottom-0 bg-sidebar flex flex-col transition-all duration-300 ease-in-out border-r border-sidebar-border overflow-hidden",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <Link to="/" className="text-sidebar-foreground font-semibold text-xl">
            Disaster<span className="text-sidebar-primary">Ctrl</span>
          </Link>
        )}
        <Button 
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent/60"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-2 space-y-1">
        {mainNavItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={collapsed ? "" : item.label}
            to={item.to}
            active={activeItem === item.label}
            hasAlert={!collapsed && item.hasAlert}
          />
        ))}
        
        {!collapsed && <div className="text-xs text-sidebar-foreground/60 px-3 py-2 mt-4">Administration</div>}
        
        {adminNavItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={collapsed ? "" : item.label}
            to={item.to}
            active={activeItem === item.label}
            hasAlert={!collapsed && item.hasAlert}
          />
        ))}
      </div>
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-medium">
              AD
            </div>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
              <p className="text-xs text-sidebar-foreground/60">Operations Center</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
