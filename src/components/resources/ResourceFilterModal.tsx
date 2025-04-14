
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface ResourceFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResourceFilterModal = ({ isOpen, onClose }: ResourceFilterModalProps) => {
  const [resourceType, setResourceType] = useState("all");
  const [location, setLocation] = useState("all");
  const [availability, setAvailability] = useState([0, 100]);
  const { toast } = useToast();

  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Resource list has been filtered",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Resources</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="resourceType">Resource Type</Label>
            <Select value={resourceType} onValueChange={setResourceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select resource type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="vehicle">Vehicles</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
                <SelectItem value="aircraft">Aircraft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="central">Central Station</SelectItem>
                <SelectItem value="northern">Northern Depot</SelectItem>
                <SelectItem value="medical">Medical Center</SelectItem>
                <SelectItem value="airport">Regional Airport</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Availability (%): {availability[0]} - {availability[1]}</Label>
            <Slider
              defaultValue={[0, 100]}
              max={100}
              step={1}
              value={availability}
              onValueChange={setAvailability}
              className="mt-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input id="search" placeholder="Search by name or ID" />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceFilterModal;
