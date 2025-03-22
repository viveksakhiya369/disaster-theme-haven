
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full glass rounded-xl p-8 border border-border/40 text-center animate-in animate-fade-in">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-muted mb-6">
          <MapPin className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl mb-6">Location not found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved to another location.
        </p>
        <Button asChild className="gap-2">
          <a href="/">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Command Center</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
