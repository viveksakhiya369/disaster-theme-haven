
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="fixed left-0 top-0 h-screen z-40">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64 relative">
        <div className="absolute top-4 right-6 flex items-center gap-2 z-50">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  AD
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin User</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/auth/login" className="cursor-pointer flex items-center gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <main className="overflow-y-auto py-6 px-6">
          <div className="container max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
