
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Truck, MapPin } from "lucide-react";

interface ResourceAllocationProps {
  resource: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ResourceAllocation = ({ resource, open, onOpenChange }: ResourceAllocationProps) => {
  const [allocation, setAllocation] = useState({
    units: "1",
    location: "",
    priority: "Medium",
    notes: "",
  });
  
  const handleChange = (field: string, value: string) => {
    setAllocation({
      ...allocation,
      [field]: value,
    });
  };
  
  const handleAllocate = () => {
    if (!allocation.location) {
      toast.error("Location is required");
      return;
    }
    
    if (parseInt(allocation.units) > resource.available) {
      toast.error(`Only ${resource.available} units available for allocation`);
      return;
    }
    
    toast.success(`Allocated ${allocation.units} ${resource.name} to ${allocation.location}`);
    onOpenChange(false);
    
    // Reset the form
    setAllocation({
      units: "1",
      location: "",
      priority: "Medium",
      notes: "",
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Allocate Resource</DialogTitle>
        </DialogHeader>
        
        {resource && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-primary" />
              <div className="text-xl font-semibold">{resource.name}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Type:</span> {resource.type}
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Available:</span> {resource.available} units
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Current Location:</span> {resource.location}
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Last Checked:</span> {new Date(resource.lastChecked).toLocaleDateString()}
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Number of Units</label>
                <Input 
                  type="number" 
                  min="1" 
                  max={resource.available.toString()} 
                  value={allocation.units}
                  onChange={(e) => handleChange("units", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum {resource.available} units available
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Enter deployment location" 
                    className="pl-9"
                    value={allocation.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Priority</label>
                <Select 
                  value={allocation.priority} 
                  onValueChange={(value) => handleChange("priority", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Notes</label>
                <Textarea 
                  placeholder="Additional details about this allocation..."
                  value={allocation.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAllocate}>
            Allocate Resource
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceAllocation;
