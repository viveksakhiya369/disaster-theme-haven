
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import AlertItem from "@/components/dashboard/AlertItem";
import { useState } from "react";
import { alertsData } from "@/data/mockData";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState(alertsData);
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

  return (
    <DashboardLayout>
      <Header 
        title="Alerts Management" 
        subtitle="Monitor and manage system alerts"
      />
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Active Alerts</h2>
          <div className="flex gap-2">
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
            {alerts.map((alert) => (
              <AlertItem 
                key={alert.id}
                id={alert.id}
                title={alert.title}
                description={alert.description}
                timestamp={alert.timestamp}
                severity={alert.severity as any}
                read={alert.read}
                onDismiss={handleDismissAlert}
                onView={handleViewAlert}
              />
            ))}
            {alerts.length === 0 && (
              <p className="text-center text-muted-foreground p-4">No active alerts</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AlertsPage;
