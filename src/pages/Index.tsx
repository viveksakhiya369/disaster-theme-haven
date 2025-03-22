
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import StatusCard from "@/components/dashboard/StatusCard";
import AlertItem from "@/components/dashboard/AlertItem";
import StatisticsCard from "@/components/dashboard/StatisticsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import { alertsData, incidentData, responseTimeData, resourceData } from "@/data/mockData";
import { Activity, Clock, Shield, Users } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [alerts, setAlerts] = useState(alertsData);

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

  return (
    <DashboardLayout>
      <Header 
        title="Disaster Management Dashboard" 
        subtitle="Overview of current situations and resources"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 animate-slide-up">
        <StatusCard 
          title="Active Incidents"
          value="24"
          icon={<Activity className="h-5 w-5" />}
          variant="danger"
          trend={{ value: 12, isUpward: true }}
        />
        <StatusCard 
          title="Response Teams"
          value="18"
          icon={<Users className="h-5 w-5" />}
          variant="info"
          trend={{ value: 3, isUpward: true }}
        />
        <StatusCard 
          title="Avg. Response Time"
          value="18 min"
          icon={<Clock className="h-5 w-5" />}
          variant="success"
          trend={{ value: 5, isUpward: false }}
        />
        <StatusCard 
          title="Available Resources"
          value="68%"
          icon={<Shield className="h-5 w-5" />}
          variant="warning"
          trend={{ value: 8, isUpward: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 animate-slide-up" style={{ animationDelay: "50ms" }}>
        <div className="lg:col-span-2">
          <StatisticsCard
            title="Incident Trend"
            subtitle="Daily incidents over the past week"
            data={incidentData}
            color="rgba(220, 38, 38, 0.8)"
          />
        </div>
        <div>
          <StatisticsCard
            title="Response Time"
            subtitle="Average response time (minutes)"
            data={responseTimeData}
            color="rgba(37, 99, 235, 0.8)"
          />
        </div>
      </div>
      
      <div className="mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
        <QuickActions />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: "150ms" }}>
        <div className="lg:col-span-2">
          <div className="p-6 rounded-xl glass transition-all duration-300 ease-in-out">
            <h3 className="text-lg font-medium mb-4">Recent Alerts</h3>
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
        <div>
          <StatisticsCard
            title="Resource Utilization"
            subtitle="Percentage of available resources"
            data={resourceData}
            color="rgba(245, 158, 11, 0.8)"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
