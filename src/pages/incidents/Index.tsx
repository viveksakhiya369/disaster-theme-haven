
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import StatisticsCard from "@/components/dashboard/StatisticsCard";
import { incidentData } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Filter, 
  ArrowUpDown, 
  AlertTriangle, 
  Clock, 
  MapPin,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import IncidentForm from "@/components/incidents/IncidentForm";
import IncidentDetails from "@/components/incidents/IncidentDetails";
import AssignResponders from "@/components/incidents/AssignResponders";

const IncidentsPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  const [incidents, setIncidents] = useState([
    {
      id: "INC-2023-001",
      title: "Building Fire - Downtown Area",
      type: "Fire",
      severity: "High",
      location: "123 Main St, Downtown",
      status: "Active",
      timestamp: "2023-06-10T14:30:00Z",
      responders: 12,
      description: "Three-story building with visible flames on second floor. Multiple reports of smoke inhalation."
    },
    {
      id: "INC-2023-002",
      title: "Flash Flooding - Riverside District",
      type: "Flood",
      severity: "Critical",
      location: "Riverside Park Area",
      status: "Active",
      timestamp: "2023-06-11T09:15:00Z",
      responders: 24,
      description: "Sudden rise in water levels following heavy rainfall. Evacuation in progress for low-lying areas."
    },
    {
      id: "INC-2023-003",
      title: "Traffic Accident - Highway 101",
      type: "Accident",
      severity: "Medium",
      location: "Highway 101, Mile 25",
      status: "Resolved",
      timestamp: "2023-06-09T17:45:00Z",
      responders: 6,
      description: "Multi-vehicle collision with injuries. Three vehicles involved, traffic diverted to alternate routes."
    },
    {
      id: "INC-2023-004",
      title: "Power Outage - North Suburb",
      type: "Infrastructure",
      severity: "Medium",
      location: "North Suburban District",
      status: "Monitoring",
      timestamp: "2023-06-10T20:30:00Z",
      responders: 8,
      description: "Widespread power outage affecting approximately 1,500 households. Repair crews dispatched."
    },
  ]);

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

  const handleCreateIncident = (values: any) => {
    const newIncident = {
      id: `INC-${new Date().getFullYear()}-${String(incidents.length + 1).padStart(3, '0')}`,
      title: values.title,
      type: values.type,
      severity: values.severity,
      location: values.location,
      status: "Active",
      timestamp: new Date().toISOString(),
      responders: 0,
      description: values.description || undefined
    };
    
    setIncidents([newIncident, ...incidents]);
  };

  const handleViewDetails = (incident: any) => {
    setSelectedIncident(incident);
    setDetailsModalOpen(true);
  };

  const handleAssign = (incident: any) => {
    setSelectedIncident(incident);
    setAssignModalOpen(true);
  };

  // Apply filters
  let filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || incident.type === typeFilter;
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Apply sorting
  filteredIncidents = [...filteredIncidents].sort((a, b) => {
    let compareA, compareB;
    
    switch (sortField) {
      case "severity":
        // Custom severity order: Critical > High > Medium > Low
        const severityOrder = { "Critical": 0, "High": 1, "Medium": 2, "Low": 3 };
        compareA = severityOrder[a.severity as keyof typeof severityOrder] ?? 4;
        compareB = severityOrder[b.severity as keyof typeof severityOrder] ?? 4;
        break;
      case "timestamp":
        compareA = new Date(a.timestamp).getTime();
        compareB = new Date(b.timestamp).getTime();
        break;
      case "responders":
        compareA = a.responders;
        compareB = b.responders;
        break;
      default:
        compareA = a[sortField as keyof typeof a] ?? "";
        compareB = b[sortField as keyof typeof b] ?? "";
    }
    
    const comparison = typeof compareA === "string" 
      ? compareA.localeCompare(compareB as string) 
      : (compareA as number) - (compareB as number);
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

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
          <Button className="gap-2" onClick={() => setCreateModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Create Incident
          </Button>
        </div>
        
        <div className="p-6 rounded-xl glass transition-all duration-300 ease-in-out">
          <div className="flex flex-wrap justify-between gap-3 mb-4">
            <div className="flex-1 max-w-xs relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search incidents..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Fire">Fire</SelectItem>
                  <SelectItem value="Flood">Flood</SelectItem>
                  <SelectItem value="Accident">Accident</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Monitoring">Monitoring</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={`${sortField}-${sortDirection}`} 
                onValueChange={(val) => {
                  const [field, direction] = val.split('-');
                  setSortField(field);
                  setSortDirection(direction as "asc" | "desc");
                }}
              >
                <SelectTrigger className="w-[150px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="timestamp-desc">Newest First</SelectItem>
                  <SelectItem value="timestamp-asc">Oldest First</SelectItem>
                  <SelectItem value="severity-desc">Highest Severity</SelectItem>
                  <SelectItem value="severity-asc">Lowest Severity</SelectItem>
                  <SelectItem value="responders-desc">Most Responders</SelectItem>
                  <SelectItem value="responders-asc">Least Responders</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                {filteredIncidents.map((incident) => (
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(incident)}
                        >
                          Details
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleAssign(incident)}
                        >
                          Assign
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredIncidents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No incidents found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <IncidentForm 
        open={createModalOpen} 
        onOpenChange={setCreateModalOpen} 
        onSubmit={handleCreateIncident} 
      />
      
      <IncidentDetails 
        incident={selectedIncident} 
        open={detailsModalOpen} 
        onOpenChange={setDetailsModalOpen} 
      />
      
      <AssignResponders 
        incidentId={selectedIncident?.id || ""} 
        open={assignModalOpen} 
        onOpenChange={setAssignModalOpen} 
      />
    </DashboardLayout>
  );
};

export default IncidentsPage;
