
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bell, Eye, X } from "lucide-react";
import { useState } from "react";

interface AlertItemProps {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  severity: "critical" | "high" | "medium" | "low";
  read?: boolean;
  onDismiss?: (id: string) => void;
  onView?: (id: string) => void;
}

const AlertItem = ({
  id,
  title,
  description,
  timestamp,
  severity,
  read = false,
  onDismiss,
  onView,
}: AlertItemProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const severityMap = {
    critical: {
      color: "bg-destructive text-destructive-foreground",
      border: "border-destructive/20",
      icon: <Bell className="h-5 w-5 text-destructive" />,
    },
    high: {
      color: "bg-warning text-warning-foreground",
      border: "border-warning/20",
      icon: <Bell className="h-5 w-5 text-warning" />,
    },
    medium: {
      color: "bg-info text-info-foreground",
      border: "border-info/20", 
      icon: <Bell className="h-5 w-5 text-info" />,
    },
    low: {
      color: "bg-success text-success-foreground",
      border: "border-success/20",
      icon: <Bell className="h-5 w-5 text-success" />,
    },
  };

  return (
    <div 
      className={cn(
        "p-4 rounded-lg glass transition-all duration-200 ease-in-out border",
        severityMap[severity].border,
        read ? "opacity-80" : "",
        isHovering ? "scale-[1.01]" : ""
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {severityMap[severity].icon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className={cn("font-medium", !read && "font-semibold")}>{title}</h3>
                <Badge className={severityMap[severity].color}>
                  {severity}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
            <p className="text-xs text-muted-foreground whitespace-nowrap">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </p>
          </div>
          
          <div className={cn(
            "flex items-center gap-2 mt-3 transition-opacity",
            isHovering ? "opacity-100" : "opacity-0"
          )}>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => onView?.(id)}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>View</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDismiss?.(id)}
            >
              <X className="h-3.5 w-3.5" />
              <span>Dismiss</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertItem;
