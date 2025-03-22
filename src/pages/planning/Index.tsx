
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Plus, Search, Calendar, Clock, MapPin, Users, CheckCircle, Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PlanningPage = () => {
  const mockEvents = [
    {
      id: "EVT-001",
      title: "Emergency Response Training",
      type: "Training",
      location: "Central Fire Station",
      date: "2023-06-15",
      startTime: "09:00",
      endTime: "15:00",
      participants: 24,
      status: "Upcoming"
    },
    {
      id: "EVT-002",
      title: "Flood Preparedness Drill",
      type: "Drill",
      location: "Riverside District",
      date: "2023-06-18",
      startTime: "10:00",
      endTime: "13:00",
      participants: 32,
      status: "Upcoming"
    },
    {
      id: "EVT-003",
      title: "Quarterly Resource Planning",
      type: "Meeting",
      location: "Operations Center",
      date: "2023-06-20",
      startTime: "14:00",
      endTime: "16:00",
      participants: 12,
      status: "Upcoming"
    },
    {
      id: "EVT-004",
      title: "First Aid Certification",
      type: "Training",
      location: "Medical Center",
      date: "2023-06-12",
      startTime: "09:00",
      endTime: "17:00",
      participants: 18,
      status: "Completed"
    },
    {
      id: "EVT-005",
      title: "Public Safety Coordination",
      type: "Meeting",
      location: "City Hall",
      date: "2023-06-08",
      startTime: "13:00",
      endTime: "15:00",
      participants: 15,
      status: "Completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming": return "bg-blue-500";
      case "In Progress": return "bg-orange-500";
      case "Completed": return "bg-green-500";
      case "Cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Training": return "bg-purple-100 text-purple-800";
      case "Drill": return "bg-orange-100 text-orange-800";
      case "Meeting": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <Header 
        title="Planning" 
        subtitle="Schedule and manage drills, training and events"
      />
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Event Calendar</h2>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </div>
        
        {/* Calendar Placeholder - In a real application, you'd integrate a full calendar component */}
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-xl h-72 flex items-center justify-center mb-6">
          <div className="text-center text-muted-foreground">
            <Calendar className="h-16 w-16 mx-auto mb-2 opacity-30" />
            <p className="text-lg">Interactive Calendar View</p>
            <p className="text-sm">(Calendar component would be implemented here)</p>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-4">
            <div className="p-6 rounded-xl glass transition-all duration-300 ease-in-out">
              <div className="flex justify-between mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search events..." 
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
                      <th className="pb-2 font-medium">Event</th>
                      <th className="pb-2 font-medium">Type</th>
                      <th className="pb-2 font-medium">Date & Time</th>
                      <th className="pb-2 font-medium">Location</th>
                      <th className="pb-2 font-medium">Participants</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockEvents.filter(event => event.status === "Upcoming").map((event) => (
                      <tr key={event.id} className="border-b hover:bg-accent/10">
                        <td className="py-3">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {event.id}
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`${getTypeColor(event.type)} text-xs font-medium py-1 px-2 rounded-full`}>
                            {event.type}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div>{event.date}</div>
                              <div className="text-xs text-muted-foreground">
                                {event.startTime} - {event.endTime}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{event.participants}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`${getStatusColor(event.status)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                              <Trash className="h-4 w-4" />
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
          
          <TabsContent value="completed" className="mt-4">
            <div className="p-6 rounded-xl glass">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 font-medium">Event</th>
                      <th className="pb-2 font-medium">Type</th>
                      <th className="pb-2 font-medium">Date & Time</th>
                      <th className="pb-2 font-medium">Location</th>
                      <th className="pb-2 font-medium">Participants</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockEvents.filter(event => event.status === "Completed").map((event) => (
                      <tr key={event.id} className="border-b hover:bg-accent/10">
                        <td className="py-3">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {event.id}
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`${getTypeColor(event.type)} text-xs font-medium py-1 px-2 rounded-full`}>
                            {event.type}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div>{event.date}</div>
                              <div className="text-xs text-muted-foreground">
                                {event.startTime} - {event.endTime}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{event.participants}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`${getStatusColor(event.status)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8">
                              Report
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
          
          <TabsContent value="all" className="mt-4">
            <div className="p-6 rounded-xl glass">
              <p className="text-center text-muted-foreground">Showing all events</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Today's Schedule</h3>
          <div className="space-y-3">
            <div className="flex gap-3 items-start border-b pb-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-800">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Staff Briefing</p>
                <p className="text-sm text-muted-foreground">08:30 - 09:00</p>
                <p className="text-xs text-muted-foreground">Operations Center</p>
              </div>
            </div>
            <div className="flex gap-3 items-start border-b pb-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-800">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Team Alpha Deployment</p>
                <p className="text-sm text-muted-foreground">09:30 - 12:00</p>
                <p className="text-xs text-muted-foreground">Downtown Area</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-purple-800">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Resource Distribution</p>
                <p className="text-sm text-muted-foreground">14:00 - 16:00</p>
                <p className="text-xs text-muted-foreground">Central Warehouse</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Upcoming Drills</h3>
          <div className="space-y-3">
            <div className="border-b pb-3">
              <div className="flex justify-between">
                <div className="font-medium">Flood Response Drill</div>
                <div className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">June 18</div>
              </div>
              <p className="text-sm text-muted-foreground">Riverside District</p>
              <p className="text-xs text-muted-foreground mt-1">32 participants</p>
            </div>
            <div className="border-b pb-3">
              <div className="flex justify-between">
                <div className="font-medium">Building Evacuation Drill</div>
                <div className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">June 25</div>
              </div>
              <p className="text-sm text-muted-foreground">City Hall Complex</p>
              <p className="text-xs text-muted-foreground mt-1">45 participants</p>
            </div>
            <div>
              <div className="flex justify-between">
                <div className="font-medium">Mass Casualty Exercise</div>
                <div className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">July 5</div>
              </div>
              <p className="text-sm text-muted-foreground">Convention Center</p>
              <p className="text-xs text-muted-foreground mt-1">60+ participants</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Planning Checklist</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium">Update resource inventory</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Completed</span>
                  <span>June 5</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium">Review emergency protocols</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Completed</span>
                  <span>June 8</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full border-2 border-primary mt-0.5"></div>
              <div className="flex-1">
                <p className="font-medium">Staff training certification renewal</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>In Progress</span>
                  <span>Due June 20</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full border-2 border-primary mt-0.5"></div>
              <div className="flex-1">
                <p className="font-medium">Equipment maintenance schedule</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Pending</span>
                  <span>Due June 25</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full border-2 border-primary mt-0.5"></div>
              <div className="flex-1">
                <p className="font-medium">Update emergency contact list</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Pending</span>
                  <span>Due June 30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlanningPage;
