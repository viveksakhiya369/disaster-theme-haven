
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bell, Eye, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface AlertItemProps {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  severity: "critical" | "high" | "medium" | "low";
  read?: boolean;
  affectedAreas?: string[];
  population?: number;
  reliefMeasures?: string[];
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
  affectedAreas = [],
  population,
  reliefMeasures = [],
  onDismiss,
  onView,
}: AlertItemProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
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
          
          {/* Details expansion section */}
          {(affectedAreas.length > 0 || reliefMeasures.length > 0) && (
            <div className="mt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-auto text-xs text-muted-foreground flex items-center gap-1"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-3 w-3" />
                    <span>Hide details</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3" />
                    <span>Show details</span>
                  </>
                )}
              </Button>
              
              {isExpanded && (
                <div className="mt-3 space-y-3 text-sm border-t pt-3 border-muted">
                  {affectedAreas.length > 0 && (
                    <div>
                      <h4 className="font-medium text-xs uppercase text-muted-foreground mb-1">Affected Areas</h4>
                      <div className="flex flex-wrap gap-1">
                        {affectedAreas.map((area, index) => (
                          <Badge key={index} variant="outline" className="bg-background">
                            {area}
                          </Badge>
                        ))}
                      </div>
                      {population && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Est. population affected: <span className="font-semibold">{population.toLocaleString()}</span>
                        </p>
                      )}
                    </div>
                  )}
                  
                  {reliefMeasures.length > 0 && (
                    <div>
                      <h4 className="font-medium text-xs uppercase text-muted-foreground mb-1">Relief Measures</h4>
                      <ul className="list-disc pl-4 space-y-1 text-xs">
                        {reliefMeasures.map((measure, index) => (
                          <li key={index}>{measure}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
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
