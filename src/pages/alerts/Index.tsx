
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import AlertItem from "@/components/dashboard/AlertItem";
import { useState } from "react";
import { alertsData } from "@/data/mockData";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Filter, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState(alertsData);
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const navigate = useNavigate();

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast.success("Alert dismissed");
  };

  const handleViewAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
    toast.info("Opening alert details");
  };

  const handleViewOnMap = () => {
    navigate("/map");
    toast.info("Viewing alerts on global map");
  };

  const filteredAlerts = alerts.filter(alert => 
    severityFilter === "all" ? true : alert.severity === severityFilter
  );

  const totalAffectedPopulation = filteredAlerts.reduce(
    (sum, alert) => sum + (alert.population || 0), 
    0
  );

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
            <Button className="gap-2">
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
    </DashboardLayout>
  );
};

export default AlertsPage;
