
import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertLocation {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  lat: number;
  lng: number;
  timestamp: Date;
}

interface DisasterMapProps {
  alerts: AlertLocation[];
  onMarkerClick: (alert: AlertLocation) => void;
  selectedAlert: AlertLocation | null;
}

const DisasterMap: React.FC<DisasterMapProps> = ({ alerts, onMarkerClick, selectedAlert }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // In a real application, you would use a proper map library like Mapbox, Leaflet, or Google Maps
  // For this example, we'll create a simplified map visualization
  
  useEffect(() => {
    // Simulate loading time for the map
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to calculate marker position on the map
  const getMarkerPosition = (lat: number, lng: number) => {
    // This is a very simplified conversion just for demo purposes
    // In a real application, you would use proper geo projections
    const x = ((lng + 180) / 360) * 100; // Convert longitude to percentage
    const y = ((90 - lat) / 180) * 100;  // Convert latitude to percentage
    
    return { x, y };
  };

  const severityColorMap = {
    critical: "text-destructive animate-pulse",
    high: "text-warning",
    medium: "text-info",
    low: "text-success",
  };

  // Animation for selected marker
  const animationClass = "animate-bounce";

  return (
    <div className="w-full h-[70vh] rounded-xl overflow-hidden relative bg-zinc-100 dark:bg-zinc-800">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Loading map...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Simple map background - in a real app, this would be replaced with an actual map component */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop')] 
                          dark:bg-[url('https://images.unsplash.com/photo-1502189562704-87e622a34c85?q=80&w=1920&auto=format&fit=crop')] 
                          bg-cover bg-center opacity-80 dark:opacity-50" />
          
          {/* Render alert markers */}
          {alerts.map((alert) => {
            const position = getMarkerPosition(alert.lat, alert.lng);
            return (
              <button
                key={alert.id}
                className={cn(
                  "absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 z-10",
                  selectedAlert?.id === alert.id && animationClass
                )}
                style={{ 
                  left: `${position.x}%`, 
                  top: `${position.y}%`,
                }}
                onClick={() => onMarkerClick(alert)}
                aria-label={`Alert: ${alert.title}`}
              >
                <div className="relative">
                  <AlertTriangle className={cn("h-6 w-6", severityColorMap[alert.severity])} />
                  <div className={cn(
                    "w-12 h-12 rounded-full absolute -top-3 -left-3 -z-10 opacity-20",
                    alert.severity === "critical" && "bg-destructive",
                    alert.severity === "high" && "bg-warning",
                    alert.severity === "medium" && "bg-info",
                    alert.severity === "low" && "bg-success"
                  )} />
                </div>
              </button>
            );
          })}
          
          {/* Map controls and legend from the existing code */}
          <div className="absolute right-4 bottom-4 flex flex-col gap-2">
            <button className="bg-background/80 backdrop-blur-sm h-8 w-8 rounded-full shadow-lg flex items-center justify-center">
              <ZoomIn className="h-4 w-4" />
            </button>
            <button className="bg-background/80 backdrop-blur-sm h-8 w-8 rounded-full shadow-lg flex items-center justify-center">
              <ZoomOut className="h-4 w-4" />
            </button>
          </div>
          
          {/* Legend */}
          <div className="absolute left-4 bottom-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg">
            <h4 className="text-sm font-medium mb-2">Legend</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span>Critical Alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span>High Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-info" />
                <span>Medium Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-success" />
                <span>Low Priority</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Add missing imported icons
const ZoomIn = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
    <line x1="11" x2="11" y1="8" y2="14" />
    <line x1="8" x2="14" y1="11" y2="11" />
  </svg>
);

const ZoomOut = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
    <line x1="8" x2="14" y1="11" y2="11" />
  </svg>
);

export default DisasterMap;
