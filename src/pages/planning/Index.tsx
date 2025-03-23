
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Plus, Search, Calendar, Clock, MapPin, Users, CheckCircle, Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCalendar from "@/components/planning/EventCalendar";
import { useState } from "react";
import { 
  Dialog,
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const PlanningPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("upcoming");
  
  // Mock events for calendar
  const calendarEvents = [
    {
      id: "evt-001",
      title: "Emergency Response Training",
      date: new Date("2023-06-15"),
      type: "Training" as const
    },
    {
      id: "evt-002",
      title: "Flood Preparedness Drill",
      date: new Date("2023-06-18"),
      type: "Drill" as const
    },
    {
      id: "evt-003",
      title: "Quarterly Resource Planning",
      date: new Date("2023-06-20"),
      type: "Meeting" as const
    }
  ];
  
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
  
  const handleCreateEvent = () => {
    toast({
      title: "Event Created",
      description: "New event has been added to the calendar."
    });
    setCreateEventOpen(false);
  };
  
  const handleEditEvent = (eventId: string) => {
    toast({
      title: "Event Updated",
      description: `Event ${eventId} has been updated.`
    });
  };
  
  const handleDeleteEvent = (eventId: string) => {
    toast({
      title: "Event Deleted",
      description: `Event ${eventId} has been deleted.`
    });
  };
  
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === "all" || event.status.toLowerCase() === activeFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <Header 
        title="Planning" 
        subtitle="Schedule and manage drills, training and events"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <EventCalendar events={calendarEvents} />
        </div>
        
        <div className="glass p-4 rounded-xl">
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
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Event Management</h2>
          <Button className="gap-2" onClick={() => setCreateEventOpen(true)}>
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger 
              value="upcoming" 
              onClick={() => setActiveFilter("upcoming")}
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              onClick={() => setActiveFilter("completed")}
            >
              Completed
            </TabsTrigger>
            <TabsTrigger 
              value="all" 
              onClick={() => setActiveFilter("all")}
            >
              All Events
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-4">
            <div className="p-6 rounded-xl glass transition-all duration-300 ease-in-out">
              <div className="flex justify-between mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search events..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                    {filteredEvents.filter(event => event.status === "Upcoming").map((event) => (
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
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Event</DialogTitle>
                                  <DialogDescription>
                                    Update the details for {event.title}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="eventTitle">Event Title</Label>
                                    <Input id="eventTitle" defaultValue={event.title} />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="eventDate">Date</Label>
                                      <Input id="eventDate" type="date" defaultValue={event.date} />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="eventType">Type</Label>
                                      <Select defaultValue={event.type}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Training">Training</SelectItem>
                                          <SelectItem value="Drill">Drill</SelectItem>
                                          <SelectItem value="Meeting">Meeting</SelectItem>
                                          <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="startTime">Start Time</Label>
                                      <Input id="startTime" type="time" defaultValue={event.startTime} />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="endTime">End Time</Label>
                                      <Input id="endTime" type="time" defaultValue={event.endTime} />
                                    </div>
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" defaultValue={event.location} />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="participants">Participants</Label>
                                    <Input id="participants" type="number" defaultValue={event.participants.toString()} />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" placeholder="Event details..." />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline">Cancel</Button>
                                  <Button onClick={() => handleEditEvent(event.id)}>Save Changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Event</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to delete this event? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline">Cancel</Button>
                                  <Button variant="destructive" onClick={() => handleDeleteEvent(event.id)}>Delete Event</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
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
                    {filteredEvents.filter(event => event.status === "Completed").map((event) => (
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
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 font-medium">Event</th>
                      <th className="pb-2 font-medium">Type</th>
                      <th className="pb-2 font-medium">Date & Time</th>
                      <th className="pb-2 font-medium">Location</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event) => (
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
                          <span className={`${getStatusColor(event.status)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
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
        </Tabs>
      </div>
      
      {/* Create Event Dialog */}
      <Dialog open={createEventOpen} onOpenChange={setCreateEventOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Add a new event to your planning calendar
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-event-title">Event Title</Label>
              <Input id="new-event-title" placeholder="Enter event title" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="new-event-date">Date</Label>
                <Input id="new-event-date" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-event-type">Type</Label>
                <Select defaultValue="training">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="drill">Drill</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="new-start-time">Start Time</Label>
                <Input id="new-start-time" type="time" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-end-time">End Time</Label>
                <Input id="new-end-time" type="time" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-location">Location</Label>
              <Input id="new-location" placeholder="Event location" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-participants">Expected Participants</Label>
              <Input id="new-participants" type="number" placeholder="Number of participants" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-description">Description</Label>
              <Textarea id="new-description" placeholder="Event details and objectives..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateEventOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateEvent}>Create Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        
        <div className="col-span-2 p-4 rounded-xl glass">
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
      </div>
    </DashboardLayout>
  );
};

export default PlanningPage;
