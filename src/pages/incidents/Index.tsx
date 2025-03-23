
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import StatisticsCard from "@/components/dashboard/StatisticsCard";
import { incidentData } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus, Filter, ArrowUpDown, AlertTriangle, Clock, MapPin } from "lucide-react";

const IncidentsPage = () => {
  const mockIncidents = [
    {
      id: "INC-2023-001",
      title: "Building Fire - Downtown Area",
      type: "Fire",
      severity: "High",
      location: "123 Main St, Downtown",
      status: "Active",
      timestamp: "2023-06-10T14:30:00Z",
      responders: 12
    },
    {
      id: "INC-2023-002",
      title: "Flash Flooding - Riverside District",
      type: "Flood",
      severity: "Critical",
      location: "Riverside Park Area",
      status: "Active",
      timestamp: "2023-06-11T09:15:00Z",
      responders: 24
    },
    {
      id: "INC-2023-003",
      title: "Traffic Accident - Highway 101",
      type: "Accident",
      severity: "Medium",
      location: "Highway 101, Mile 25",
      status: "Resolved",
      timestamp: "2023-06-09T17:45:00Z",
      responders: 6
    },
    {
      id: "INC-2023-004",
      title: "Power Outage - North Suburb",
      type: "Infrastructure",
      severity: "Medium",
      location: "North Suburban District",
      status: "Monitoring",
      timestamp: "2023-06-10T20:30:00Z",
      responders: 8
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-500";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-red-500";
      case "Monitoring": return "bg-orange-500";
      case "Resolved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <DashboardLayout>
      <Header 
        title="Incidents Management" 
        subtitle="Track and respond to ongoing incidents"
      />
      
      <div className="mb-6">
        <StatisticsCard
          title="Incident Trend"
          subtitle="Daily incidents over the past week"
          data={incidentData}
          color="rgba(220, 38, 38, 0.8)"
        />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Active Incidents</h2>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Incident
          </Button>
        </div>
        
        <div className="p-6 rounded-xl glass transition-all duration-300 ease-in-out">
          <div className="flex justify-between mb-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Sort
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2 font-medium">ID</th>
                  <th className="pb-2 font-medium">Incident</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Severity</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Location</th>
                  <th className="pb-2 font-medium">Team</th>
                  <th className="pb-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockIncidents.map((incident) => (
                  <tr key={incident.id} className="border-b hover:bg-accent/10">
                    <td className="py-3 text-sm font-mono">{incident.id}</td>
                    <td className="py-3">
                      <div className="font-medium">{incident.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(incident.timestamp).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        {incident.type}
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`${getSeverityColor(incident.severity)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                        {incident.severity}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`${getStatusColor(incident.status)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                        {incident.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="max-w-[150px] truncate" title={incident.location}>
                          {incident.location}
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded-full">
                          {incident.responders} Responders
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Details</Button>
                        <Button variant="ghost" size="sm">Assign</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IncidentsPage;
