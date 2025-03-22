
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
  Users 
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  hasAlert?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, label, active, hasAlert, onClick }: NavItemProps) => {
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
    >
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
    </Button>
  );
};

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: Home, label: "Dashboard", hasAlert: false },
    { icon: Bell, label: "Alerts", hasAlert: true },
    { icon: Activity, label: "Incidents", hasAlert: false },
    { icon: MapPin, label: "Map View", hasAlert: false },
    { icon: Users, label: "Personnel", hasAlert: false },
    { icon: Shield, label: "Resources", hasAlert: false },
    { icon: FileText, label: "Reports", hasAlert: false },
    { icon: Calendar, label: "Planning", hasAlert: false },
    { icon: Phone, label: "Contacts", hasAlert: false },
    { icon: Settings, label: "Settings", hasAlert: false },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-sidebar flex flex-col transition-all duration-300 ease-in-out border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-sidebar-foreground font-semibold text-xl">
            Disaster<span className="text-sidebar-primary">Ctrl</span>
          </h1>
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
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={collapsed ? "" : item.label}
            active={activeItem === item.label}
            hasAlert={!collapsed && item.hasAlert}
            onClick={() => setActiveItem(item.label)}
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
