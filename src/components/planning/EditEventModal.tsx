
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    title: string;
    type: string;
    location: string;
    date: string;
    startTime: string;
    endTime: string;
    participants: number;
    status: string;
  };
}

const EditEventModal = ({ isOpen, onClose, event }: EditEventModalProps) => {
  const [title, setTitle] = useState(event.title);
  const [location, setLocation] = useState(event.location);
  const [status, setStatus] = useState(event.status);
  const [participants, setParticipants] = useState(event.participants.toString());

  const handleSubmit = () => {
    // Here you would typically call an API to update the event
    toast({
      title: "Event Updated",
      description: `${event.title} has been updated successfully`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Make changes to the event {event.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={event.date}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="startTime"
                  type="time"
                  value={event.startTime}
                  className="flex-1"
                />
                <span>-</span>
                <Input
                  id="endTime"
                  type="time"
                  value={event.endTime}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="participants">Participants</Label>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="participants"
                  type="number"
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventModal;
