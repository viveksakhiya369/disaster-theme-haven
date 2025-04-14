
import { useState } from "react";
import { 
  Bell, 
  LogOut,
  Settings,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    
    // Redirect to login page after logout
    window.location.href = "/auth/login";
  };

  return (
    <div className="sticky top-0 z-50 flex justify-end items-center p-4 border-b bg-background">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/alerts">
            <Bell className="h-5 w-5" />
          </Link>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-2 flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-xs">
                AD
              </div>
              <span className="hidden md:inline">Admin User</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings/profile" className="cursor-pointer flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
