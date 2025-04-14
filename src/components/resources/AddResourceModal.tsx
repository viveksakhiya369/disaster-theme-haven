
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddResourceModal = ({ isOpen, onClose }: AddResourceModalProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Resource Added",
      description: `${name} has been added to your resources`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Resource</DialogTitle>
          <DialogDescription>
            Add a new resource to your inventory
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Resource Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter resource name"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="type">Resource Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select resource type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vehicle">Vehicle</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
                <SelectItem value="aircraft">Aircraft</SelectItem>
                <SelectItem value="facility">Facility</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location">Storage Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="central">Central Station</SelectItem>
                <SelectItem value="northern">Northern Depot</SelectItem>
                <SelectItem value="medical">Medical Center</SelectItem>
                <SelectItem value="airport">Regional Airport</SelectItem>
                <SelectItem value="warehouse">Central Warehouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Resource
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddResourceModal;
