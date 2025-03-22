
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Search, Layers, Compass, Maximize, ZoomIn, ZoomOut, MapPin, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { alertsData } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import DisasterMap from "@/components/map/DisasterMap";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define the alert location type
interface AlertLocation {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  lat: number;
  lng: number;
  timestamp: Date;
}

const MapViewPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<AlertLocation | null>(null);
  const [alertLocations, setAlertLocations] = useState<AlertLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate fetching alert data with coordinates
  useEffect(() => {
    // In a real application, this would be fetched from an API
    // For demo purposes, adding coordinates to our existing alerts
    const locations: AlertLocation[] = [
      {
        id: "alert-1",
        title: "Flash Flood Warning",
        description: "Flash flooding reported in southern districts. Emergency response teams deployed.",
        severity: "critical",
        lat: 34.0522,
        lng: -118.2437,
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
      },
      {
        id: "alert-2",
        title: "Evacuation Notice",
        description: "Voluntary evacuation order issued for coastal areas due to approaching storm.",
        severity: "high",
        lat: 25.7617,
        lng: -80.1918,
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
      },
      {
        id: "alert-3",
        title: "Road Closure",
        description: "Highway 101 closed due to landslide. Use alternate routes.",
        severity: "medium",
        lat: 37.7749,
        lng: -122.4194,
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
      },
      {
        id: "alert-4",
        title: "Weather Advisory",
        description: "Thunderstorms expected in the evening. Stay indoors if possible.",
        severity: "low",
        lat: 40.7128,
        lng: -74.0060,
        timestamp: new Date(Date.now() - 1000 * 60 * 180),
      },
      {
        id: "alert-5",
        title: "Earthquake",
        description: "6.2 magnitude earthquake detected. Building inspections underway.",
        severity: "critical",
        lat: 35.6762,
        lng: 139.6503,
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: "alert-6",
        title: "Wildfire Alert",
        description: "Wildfire spreading in northern forest. Evacuation may be necessary.",
        severity: "high",
        lat: 48.8566,
        lng: 2.3522,
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
      },
      {
        id: "alert-7",
        title: "Tsunami Warning",
        description: "Tsunami warning issued for coastal areas. Move to higher ground immediately.",
        severity: "critical",
        lat: -33.8688,
        lng: 151.2093,
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
      },
    ];

    setAlertLocations(locations);
    setIsLoading(false);
  }, []);

  const handleMarkerClick = (alert: AlertLocation) => {
    setSelectedAlert(alert);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredAlerts = alertLocations.filter(alert => 
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <Header 
        title="Global Disaster Map" 
        subtitle="Real-time monitoring of disaster events worldwide"
      />
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-72">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search alerts..." 
              className="pl-8"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Layers className="h-4 w-4 mr-2" />
              Layers
            </Button>
            <Button variant="outline" size="sm">
              <Compass className="h-4 w-4 mr-2" />
              Navigate
            </Button>
            <Button variant="outline" size="sm">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <DisasterMap 
            alerts={filteredAlerts} 
            onMarkerClick={handleMarkerClick} 
            selectedAlert={selectedAlert}
          />
          
          {selectedAlert && (
            <div className="absolute left-4 top-4 w-72 z-10">
              <Alert className={cn(
                "shadow-lg border-l-4",
                selectedAlert.severity === "critical" && "border-l-destructive",
                selectedAlert.severity === "high" && "border-l-warning",
                selectedAlert.severity === "medium" && "border-l-info",
                selectedAlert.severity === "low" && "border-l-success"
              )}>
                <AlertTriangle className={cn(
                  "h-4 w-4",
                  selectedAlert.severity === "critical" && "text-destructive",
                  selectedAlert.severity === "high" && "text-warning",
                  selectedAlert.severity === "medium" && "text-info",
                  selectedAlert.severity === "low" && "text-success"
                )} />
                <AlertTitle className="font-semibold">{selectedAlert.title}</AlertTitle>
                <AlertDescription>
                  {selectedAlert.description}
                  <div className="mt-2 flex gap-2 items-center">
                    <Badge className={cn(
                      selectedAlert.severity === "critical" && "bg-destructive text-destructive-foreground",
                      selectedAlert.severity === "high" && "bg-warning text-warning-foreground",
                      selectedAlert.severity === "medium" && "bg-info text-info-foreground",
                      selectedAlert.severity === "low" && "bg-success text-success-foreground"
                    )}>
                      {selectedAlert.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {selectedAlert.timestamp.toLocaleString()}
                    </span>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Active Alerts</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {filteredAlerts.map(alert => (
              <div 
                key={alert.id} 
                className={cn(
                  "flex gap-3 items-start p-3 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-800/50 cursor-pointer transition",
                  selectedAlert?.id === alert.id && "bg-slate-100/70 dark:bg-slate-800/70"
                )}
                onClick={() => handleMarkerClick(alert)}
              >
                <MapPin className={cn(
                  "h-5 w-5 mt-0.5",
                  alert.severity === "critical" && "text-destructive",
                  alert.severity === "high" && "text-warning",
                  alert.severity === "medium" && "text-info",
                  alert.severity === "low" && "text-success"
                )} />
                <div>
                  <p className="font-medium">{alert.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{alert.description}</p>
                  <div className="flex gap-2 items-center mt-1">
                    <Badge className={cn(
                      "text-xs",
                      alert.severity === "critical" && "bg-destructive/10 text-destructive border-destructive/20",
                      alert.severity === "high" && "bg-warning/10 text-warning border-warning/20",
                      alert.severity === "medium" && "bg-info/10 text-info border-info/20",
                      alert.severity === "low" && "bg-success/10 text-success border-success/20"
                    )}>
                      {alert.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {alert.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {filteredAlerts.length === 0 && (
              <p className="text-center text-muted-foreground p-4">No alerts match your search</p>
            )}
          </div>
        </div>
        
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Response Status</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Teams Deployed</h4>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-red-100/50 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                  Fire Response
                </Badge>
                <Badge variant="outline" className="bg-blue-100/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                  Medical
                </Badge>
                <Badge variant="outline" className="bg-amber-100/50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400">
                  Search & Rescue
                </Badge>
                <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400">
                  Law Enforcement
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Alert Statistics</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded bg-red-100/30 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30">
                  <p className="text-xs text-muted-foreground">Critical</p>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-400">
                    {alertLocations.filter(a => a.severity === "critical").length}
                  </p>
                </div>
                <div className="p-3 rounded bg-orange-100/30 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/30">
                  <p className="text-xs text-muted-foreground">High</p>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                    {alertLocations.filter(a => a.severity === "high").length}
                  </p>
                </div>
                <div className="p-3 rounded bg-blue-100/30 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30">
                  <p className="text-xs text-muted-foreground">Medium</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    {alertLocations.filter(a => a.severity === "medium").length}
                  </p>
                </div>
                <div className="p-3 rounded bg-green-100/30 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30">
                  <p className="text-xs text-muted-foreground">Low</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {alertLocations.filter(a => a.severity === "low").length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapViewPage;
