
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import EventCalendar from "@/components/planning/EventCalendar";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Filter,
  Plus,
  MoreHorizontal,
  Trash,
  Edit,
  Share,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock event data
const mockEvents = [
  {
    id: "1",
    title: "Emergency Response Drill",
    date: "2023-06-15",
    time: "09:00",
    duration: "2 hours",
    status: "upcoming",
    type: "drill",
    location: "HQ Training Facility",
    description: "Regular emergency response drill for all staff members",
    assignees: ["John Doe", "Sarah Smith"],
  },
  {
    id: "2",
    title: "Quarterly Budget Review",
    date: "2023-06-20",
    time: "14:00",
    duration: "1 hour",
    status: "upcoming",
    type: "meeting",
    location: "Conference Room A",
    description: "Review of quarterly budget allocation and resource planning",
    assignees: ["Admin User", "Finance Team"],
  },
  {
    id: "3",
    title: "Staff Training: New Protocol",
    date: "2023-06-10",
    time: "10:00",
    duration: "3 hours",
    status: "completed",
    type: "training",
    location: "Training Center",
    description: "Introduction to new emergency response protocol for all staff",
    assignees: ["Training Team", "All Staff"],
  },
  {
    id: "4",
    title: "Resource Allocation Meeting",
    date: "2023-06-05",
    time: "11:00",
    duration: "1.5 hours",
    status: "completed",
    type: "meeting",
    location: "Virtual (Zoom)",
    description: "Discussion about resource allocation for upcoming season",
    assignees: ["Resource Team", "Admin User"],
  },
  {
    id: "5",
    title: "Emergency Simulation Exercise",
    date: "2023-06-30",
    time: "09:30",
    duration: "4 hours",
    status: "upcoming",
    type: "drill",
    location: "Field Location Alpha",
    description: "Full-scale emergency simulation with all departments",
    assignees: ["Operations Team", "All Departments"],
  },
];

const PlanningPage = () => {
  const [events, setEvents] = useState(mockEvents);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    type: "meeting",
    description: "",
    assignees: "",
  });
  
  const handleCreateEvent = () => {
    const eventToAdd = {
      id: Date.now().toString(),
      ...newEvent,
      status: "upcoming",
      assignees: newEvent.assignees.split(',').map(a => a.trim()),
    };
    
    setEvents([...events, eventToAdd]);
    setNewEvent({
      title: "",
      date: "",
      time: "",
      duration: "",
      location: "",
      type: "meeting",
      description: "",
      assignees: "",
    });
    setShowCreateDialog(false);
    toast.success("Event created successfully");
  };
  
  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    toast.success("Event deleted successfully");
  };
  
  const filteredEvents = events.filter(event => {
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesType = typeFilter === "all" || event.type === typeFilter;
    return matchesStatus && matchesType;
  });
  
  const groupedEvents = {
    upcoming: filteredEvents.filter(event => event.status === "upcoming"),
    completed: filteredEvents.filter(event => event.status === "completed"),
  };
  
  return (
    <DashboardLayout>
      <Header 
        title="Planning & Scheduling" 
        subtitle="Manage events, drills, and meetings"
      />
      
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Select 
              value={typeFilter} 
              onValueChange={setTypeFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Event Type</SelectLabel>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="drill">Drill</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Add details for the new event, drill, or meeting
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input 
                    id="event-title" 
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Enter event title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select 
                    value={newEvent.type} 
                    onValueChange={(value) => setNewEvent({...newEvent, type: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="drill">Drill</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-date">Date</Label>
                  <Input 
                    id="event-date" 
                    type="date" 
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-time">Time</Label>
                  <Input 
                    id="event-time" 
                    type="time" 
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-duration">Duration</Label>
                  <Input 
                    id="event-duration" 
                    placeholder="e.g. 2 hours" 
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-location">Location</Label>
                  <Input 
                    id="event-location" 
                    placeholder="Enter location" 
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-assignees">Assignees</Label>
                <Input 
                  id="event-assignees" 
                  placeholder="Enter names, separated by commas" 
                  value={newEvent.assignees}
                  onChange={(e) => setNewEvent({...newEvent, assignees: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea 
                  id="event-description" 
                  placeholder="Enter event details" 
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={handleCreateEvent}>Create Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <EventCalendar />
        </div>
        <div>
          <div className="p-6 rounded-xl glass space-y-4">
            <h3 className="text-lg font-medium mb-2">Upcoming Events</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {groupedEvents.upcoming.length > 0 ? (
                groupedEvents.upcoming.map((event) => (
                  <div key={event.id} className="p-3 rounded-lg border bg-card">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {event.date} at {event.time} ({event.duration})
                        </p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{event.title}</DialogTitle>
                            <DialogDescription>
                              Event details and actions
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-semibold">Date & Time</h4>
                                <p className="text-sm">{event.date} at {event.time} ({event.duration})</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-semibold">Location</h4>
                                <p className="text-sm">{event.location}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-semibold">Description</h4>
                                <p className="text-sm">{event.description}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-semibold">Assignees</h4>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {event.assignees.map((assignee, index) => (
                                    <Badge key={index} variant="outline">{assignee}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter className="flex justify-between items-center">
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-1" 
                                onClick={() => handleDeleteEvent(event.id)}
                              >
                                <Trash className="h-3.5 w-3.5" />
                                Delete
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-1"
                              >
                                <Edit className="h-3.5 w-3.5" />
                                Edit
                              </Button>
                            </div>
                            <Button>Close</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant={event.type === 'drill' ? 'destructive' : event.type === 'training' ? 'default' : 'secondary'}>
                        {event.type}
                      </Badge>
                      <Badge variant="outline">{event.location}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No upcoming events</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="w-full mb-4 grid grid-cols-2">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="completed">Completed Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <div className="p-6 rounded-xl glass">
              <div className="divide-y">
                {groupedEvents.upcoming.length > 0 ? (
                  groupedEvents.upcoming.map((event) => (
                    <div key={event.id} className="py-4 flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${
                          event.type === 'drill' ? 'bg-destructive/10 text-destructive' : 
                          event.type === 'training' ? 'bg-primary/10 text-primary' : 
                          'bg-secondary/80 text-secondary-foreground'
                        }`}>
                          {event.type === 'drill' ? <AlertCircle className="h-5 w-5" /> : 
                           event.type === 'training' ? <HelpCircle className="h-5 w-5" /> : 
                           <Calendar className="h-5 w-5" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{event.date} at {event.time}</span>
                            <span>•</span>
                            <span>{event.location}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {event.assignees.slice(0, 2).map((assignee, index) => (
                              <Badge key={index} variant="outline" className="text-xs">{assignee}</Badge>
                            ))}
                            {event.assignees.length > 2 && (
                              <Badge variant="outline" className="text-xs">+{event.assignees.length - 2} more</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48" align="end">
                            <div className="space-y-1">
                              <Button variant="ghost" className="w-full justify-start gap-2 h-8">
                                <Edit className="h-4 w-4" />
                                <span>Edit</span>
                              </Button>
                              <Button variant="ghost" className="w-full justify-start gap-2 h-8">
                                <CheckCircle className="h-4 w-4" />
                                <span>Mark Complete</span>
                              </Button>
                              <Button variant="ghost" className="w-full justify-start gap-2 h-8">
                                <Share className="h-4 w-4" />
                                <span>Share</span>
                              </Button>
                              <Button variant="ghost" className="w-full justify-start gap-2 h-8">
                                <FileText className="h-4 w-4" />
                                <span>Export</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                className="w-full justify-start gap-2 h-8 text-destructive hover:text-destructive" 
                                onClick={() => handleDeleteEvent(event.id)}
                              >
                                <Trash className="h-4 w-4" />
                                <span>Delete</span>
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No upcoming events</p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="p-6 rounded-xl glass">
              <div className="divide-y">
                {groupedEvents.completed.length > 0 ? (
                  groupedEvents.completed.map((event) => (
                    <div key={event.id} className="py-4 flex items-center justify-between opacity-75">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-muted">
                          <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{event.date} at {event.time}</span>
                            <span>•</span>
                            <span>{event.location}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {event.assignees.slice(0, 2).map((assignee, index) => (
                              <Badge key={index} variant="outline" className="text-xs">{assignee}</Badge>
                            ))}
                            {event.assignees.length > 2 && (
                              <Badge variant="outline" className="text-xs">+{event.assignees.length - 2} more</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No completed events</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PlanningPage;
