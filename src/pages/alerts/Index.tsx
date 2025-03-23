
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import AlertItem from "@/components/dashboard/AlertItem";
import { useState } from "react";
import { alertsData } from "@/data/mockData";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Filter, Users, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState(alertsData);
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [selectedAlert, setSelectedAlert] = useState<typeof alertsData[0] | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: "",
    description: "",
    severity: "medium",
    affectedAreas: "",
    population: "",
    reliefMeasures: "",
    lat: "",
    lng: "",
  });
  
  const navigate = useNavigate();

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast.success("Alert dismissed");
  };

  const handleViewAlert = (id: string) => {
    const alert = alerts.find(a => a.id === id);
    if (alert) {
      setSelectedAlert(alert);
      setAlerts(alerts.map(a => 
        a.id === id ? { ...a, read: true } : a
      ));
    }
  };

  const handleViewOnMap = () => {
    navigate("/map");
    toast.info("Viewing alerts on global map");
  };
  
  const handleCreateAlert = () => {
    const alertToAdd = {
      id: Date.now().toString(),
      title: newAlert.title,
      description: newAlert.description,
      timestamp: new Date(),
      severity: newAlert.severity as any,
      read: false,
      affectedAreas: newAlert.affectedAreas.split(',').map(area => area.trim()),
      population: parseInt(newAlert.population) || 0,
      reliefMeasures: newAlert.reliefMeasures.split('\n').filter(measure => measure.trim()),
      lat: parseFloat(newAlert.lat) || null,
      lng: parseFloat(newAlert.lng) || null,
    };
    
    setAlerts([alertToAdd, ...alerts]);
    setNewAlert({
      title: "",
      description: "",
      severity: "medium",
      affectedAreas: "",
      population: "",
      reliefMeasures: "",
      lat: "",
      lng: "",
    });
    setShowCreateDialog(false);
    toast.success("Alert created successfully");
  };

  const filteredAlerts = alerts.filter(alert => 
    severityFilter === "all" ? true : alert.severity === severityFilter
  );

  const totalAffectedPopulation = filteredAlerts.reduce(
    (sum, alert) => sum + (alert.population || 0), 
    0
  );

  const severityColorMap = {
    critical: "text-destructive",
    high: "text-warning",
    medium: "text-info",
    low: "text-success",
  };

  return (
    <DashboardLayout>
      <Header 
        title="Alerts Management" 
        subtitle="Monitor and manage system alerts"
      />
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Active Alerts</h2>
            {totalAffectedPopulation > 0 && (
              <Badge variant="outline" className="text-muted-foreground bg-background">
                <Users className="h-3 w-3 mr-1" />
                {totalAffectedPopulation.toLocaleString()} affected
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select 
                value={severityFilter} 
                onValueChange={setSeverityFilter}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Alerts</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={handleViewOnMap}
            >
              <MapPin className="h-4 w-4" />
              View on Map
            </Button>
            <Button 
              className="gap-2"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus className="h-4 w-4" />
              Create Alert
            </Button>
          </div>
        </div>
        
        <div className="p-6 rounded-xl glass transition-all duration-300 ease-in-out">
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <AlertItem 
                key={alert.id}
                id={alert.id}
                title={alert.title}
                description={alert.description}
                timestamp={alert.timestamp}
                severity={alert.severity as any}
                read={alert.read}
                affectedAreas={alert.affectedAreas}
                population={alert.population}
                reliefMeasures={alert.reliefMeasures}
                onDismiss={handleDismissAlert}
                onView={handleViewAlert}
              />
            ))}
            {filteredAlerts.length === 0 && (
              <p className="text-center text-muted-foreground p-4">No active alerts</p>
            )}
          </div>
        </div>
      </div>

      {/* Alert Detail Dialog */}
      <Dialog open={!!selectedAlert} onOpenChange={(open) => !open && setSelectedAlert(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedAlert && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <DialogTitle>{selectedAlert.title}</DialogTitle>
                  <Badge className={`${
                    selectedAlert.severity === "critical" ? "bg-destructive text-destructive-foreground" :
                    selectedAlert.severity === "high" ? "bg-warning text-warning-foreground" :
                    selectedAlert.severity === "medium" ? "bg-info text-info-foreground" :
                    "bg-success text-success-foreground"
                  }`}>
                    {selectedAlert.severity}
                  </Badge>
                </div>
                <DialogDescription>
                  <span className={severityColorMap[selectedAlert.severity as keyof typeof severityColorMap]}>
                    Reported {formatDistanceToNow(selectedAlert.timestamp, { addSuffix: true })}
                  </span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm mb-4">{selectedAlert.description}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Affected Areas</h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedAlert.affectedAreas?.map((area, index) => (
                      <Badge key={index} variant="outline" className="bg-background">
                        {area}
                      </Badge>
                    ))}
                  </div>
                  {selectedAlert.population && (
                    <p className="text-sm text-muted-foreground">
                      <Users className="h-3 w-3 inline mr-1" />
                      Estimated population affected: <span className="font-medium">{selectedAlert.population.toLocaleString()}</span>
                    </p>
                  )}
                </div>
                
                {selectedAlert.reliefMeasures && selectedAlert.reliefMeasures.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Relief Measures</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {selectedAlert.reliefMeasures.map((measure, index) => (
                        <li key={index}>{measure}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedAlert.lat && selectedAlert.lng && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    Location: {selectedAlert.lat.toFixed(4)}, {selectedAlert.lng.toFixed(4)}
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="ml-2"
                      onClick={() => {
                        setSelectedAlert(null);
                        navigate("/map");
                      }}
                    >
                      View on map
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Create Alert Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Alert</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new emergency alert
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="alert-title">Alert Title</Label>
              <Input 
                id="alert-title" 
                value={newAlert.title}
                onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                placeholder="Brief title for the alert"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alert-description">Description</Label>
              <Textarea 
                id="alert-description" 
                value={newAlert.description}
                onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                placeholder="Detailed description of the alert"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alert-severity">Severity Level</Label>
              <Select 
                value={newAlert.severity} 
                onValueChange={(value) => setNewAlert({...newAlert, severity: value})}
              >
                <SelectTrigger id="alert-severity">
                  <SelectValue placeholder="Select severity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alert-areas">Affected Areas</Label>
              <Input 
                id="alert-areas" 
                value={newAlert.affectedAreas}
                onChange={(e) => setNewAlert({...newAlert, affectedAreas: e.target.value})}
                placeholder="Comma-separated list of areas"
              />
              <p className="text-xs text-muted-foreground">Separate multiple areas with commas</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alert-population">Affected Population</Label>
              <Input 
                id="alert-population" 
                type="number"
                value={newAlert.population}
                onChange={(e) => setNewAlert({...newAlert, population: e.target.value})}
                placeholder="Estimated number of people affected"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alert-lat">Latitude</Label>
                <Input 
                  id="alert-lat" 
                  type="text"
                  value={newAlert.lat}
                  onChange={(e) => setNewAlert({...newAlert, lat: e.target.value})}
                  placeholder="e.g. 37.7749"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alert-lng">Longitude</Label>
                <Input 
                  id="alert-lng" 
                  type="text"
                  value={newAlert.lng}
                  onChange={(e) => setNewAlert({...newAlert, lng: e.target.value})}
                  placeholder="e.g. -122.4194"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alert-relief">Relief Measures</Label>
              <Textarea 
                id="alert-relief" 
                value={newAlert.reliefMeasures}
                onChange={(e) => setNewAlert({...newAlert, reliefMeasures: e.target.value})}
                placeholder="Enter each relief measure on a new line"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">Enter each measure on a new line</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateAlert}>Create Alert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AlertsPage;
