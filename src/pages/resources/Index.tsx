import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Plus, Search, AlertTriangle, Check, Truck, Clipboard, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { resourceData } from "@/data/mockData";
import StatisticsCard from "@/components/dashboard/StatisticsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const ResourcesPage = () => {
  const mockResources = [
    {
      id: "RES-001",
      name: "Fire Trucks",
      type: "Vehicle",
      total: 10,
      available: 6,
      maintenance: 1,
      deployed: 3,
      lastChecked: "2023-06-10T14:30:00Z",
      location: "Central Station"
    },
    {
      id: "RES-002",
      name: "Ambulances",
      type: "Vehicle",
      total: 12,
      available: 8,
      maintenance: 0,
      deployed: 4,
      lastChecked: "2023-06-11T09:15:00Z",
      location: "Medical Center"
    },
    {
      id: "RES-003",
      name: "Police Cruisers",
      type: "Vehicle",
      total: 15,
      available: 7,
      maintenance: 2,
      deployed: 6,
      lastChecked: "2023-06-09T17:45:00Z",
      location: "Police Headquarters"
    },
    {
      id: "RES-004",
      name: "Water Tankers",
      type: "Vehicle",
      total: 5,
      available: 4,
      maintenance: 0,
      deployed: 1,
      lastChecked: "2023-06-10T20:30:00Z",
      location: "Northern Depot"
    },
    {
      id: "RES-005",
      name: "Helicopters",
      type: "Aircraft",
      total: 2,
      available: 1,
      maintenance: 1,
      deployed: 0,
      lastChecked: "2023-06-08T10:30:00Z",
      location: "Regional Airport"
    },
    {
      id: "RES-006",
      name: "Medical Supplies",
      type: "Equipment",
      total: 100,
      available: 75,
      maintenance: 0,
      deployed: 25,
      lastChecked: "2023-06-10T11:30:00Z",
      location: "Central Warehouse"
    }
  ];

  return (
    <DashboardLayout>
      <Header 
        title="Resources Management" 
        subtitle="Track and allocate emergency response resources"
      />
      
      <div className="mb-6">
        <StatisticsCard
          title="Resource Utilization"
          subtitle="Percentage of available resources"
          data={resourceData}
          color="rgba(245, 158, 11, 0.8)"
        />
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="vehicles" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="supplies">Supplies</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="aircraft">Aircraft</TabsTrigger>
            </TabsList>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Resource
            </Button>
          </div>
          
          <TabsContent value="vehicles" className="mt-0">
            <div className="p-6 rounded-xl glass transition-all duration-300 ease-in-out">
              <div className="flex justify-between mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search resources..." 
                    className="pl-8"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Filter</Button>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 font-medium">ID</th>
                      <th className="pb-2 font-medium">Name</th>
                      <th className="pb-2 font-medium">Type</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Location</th>
                      <th className="pb-2 font-medium">Last Checked</th>
                      <th className="pb-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockResources.filter(res => res.type === "Vehicle").map((resource) => (
                      <tr key={resource.id} className="border-b hover:bg-accent/10">
                        <td className="py-3 text-sm font-mono">{resource.id}</td>
                        <td className="py-3">
                          <div className="font-medium">{resource.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Total: {resource.total} units
                          </div>
                        </td>
                        <td className="py-3">{resource.type}</td>
                        <td className="py-3">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Available: {resource.available}</span>
                              <span>{Math.round((resource.available / resource.total) * 100)}%</span>
                            </div>
                            <Progress value={(resource.available / resource.total) * 100} className="h-2" />
                            <div className="flex gap-4 text-xs">
                              <span className="flex items-center gap-1">
                                <Truck className="h-3 w-3" /> 
                                Deployed: {resource.deployed}
                              </span>
                              <span className="flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" /> 
                                Maintenance: {resource.maintenance}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">{resource.location}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(resource.lastChecked).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8">
                              <Clipboard className="h-3.5 w-3.5 mr-1" />
                              Allocate
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8">
                              <Check className="h-3.5 w-3.5 mr-1" />
                              Check
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Other tabs would follow the same pattern */}
          <TabsContent value="equipment" className="mt-0">
            <div className="p-6 rounded-xl glass">
              <p className="text-center text-muted-foreground">Showing Equipment resources</p>
            </div>
          </TabsContent>
          <TabsContent value="supplies" className="mt-0">
            <div className="p-6 rounded-xl glass">
              <p className="text-center text-muted-foreground">Showing Supplies resources</p>
            </div>
          </TabsContent>
          <TabsContent value="facilities" className="mt-0">
            <div className="p-6 rounded-xl glass">
              <p className="text-center text-muted-foreground">Showing Facilities resources</p>
            </div>
          </TabsContent>
          <TabsContent value="aircraft" className="mt-0">
            <div className="p-6 rounded-xl glass">
              <p className="text-center text-muted-foreground">Showing Aircraft resources</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Resource Requests</h3>
          <div className="space-y-3">
            <div className="border-b pb-3">
              <div className="flex justify-between">
                <div className="font-medium">Fire Dept. Station 3</div>
                <div className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">Pending</div>
              </div>
              <p className="text-sm text-muted-foreground">Requesting 2 water tankers</p>
              <div className="text-xs text-muted-foreground mt-1">Requested 1 hour ago</div>
            </div>
            <div className="border-b pb-3">
              <div className="flex justify-between">
                <div className="font-medium">Medical Center</div>
                <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Approved</div>
              </div>
              <p className="text-sm text-muted-foreground">Medical supplies restocking</p>
              <div className="text-xs text-muted-foreground mt-1">Requested 3 hours ago</div>
            </div>
            <div>
              <div className="flex justify-between">
                <div className="font-medium">Police Tactical Unit</div>
                <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">In Progress</div>
              </div>
              <p className="text-sm text-muted-foreground">Requesting vehicle support</p>
              <div className="text-xs text-muted-foreground mt-1">Requested 5 hours ago</div>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Resource Allocation</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Downtown Area</span>
              <span className="font-medium">35%</span>
            </div>
            <Progress value={35} className="h-2" />
            <div className="flex justify-between items-center">
              <span>Highway 101 Incident</span>
              <span className="font-medium">25%</span>
            </div>
            <Progress value={25} className="h-2" />
            <div className="flex justify-between items-center">
              <span>Riverside District</span>
              <span className="font-medium">20%</span>
            </div>
            <Progress value={20} className="h-2" />
            <div className="flex justify-between items-center">
              <span>Northern Suburbs</span>
              <span className="font-medium">10%</span>
            </div>
            <Progress value={10} className="h-2" />
            <div className="flex justify-between items-center">
              <span>Reserve</span>
              <span className="font-medium">10%</span>
            </div>
            <Progress value={10} className="h-2" />
          </div>
        </div>
        
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Maintenance Schedule</h3>
          <div className="space-y-3">
            <div className="border-b pb-3">
              <div className="font-medium">Fire Truck #3</div>
              <p className="text-sm text-muted-foreground">Regular maintenance</p>
              <div className="text-xs text-muted-foreground mt-1">Scheduled for tomorrow</div>
            </div>
            <div className="border-b pb-3">
              <div className="font-medium">Helicopter #1</div>
              <p className="text-sm text-muted-foreground">Engine inspection</p>
              <div className="text-xs text-muted-foreground mt-1">Currently in progress</div>
            </div>
            <div className="border-b pb-3">
              <div className="font-medium">Ambulance #5</div>
              <p className="text-sm text-muted-foreground">Equipment check</p>
              <div className="text-xs text-muted-foreground mt-1">Scheduled for June 15</div>
            </div>
            <div>
              <div className="font-medium">Police Cruiser #8</div>
              <p className="text-sm text-muted-foreground">Transmission repair</p>
              <div className="text-xs text-muted-foreground mt-1">Scheduled for June 18</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResourcesPage;
