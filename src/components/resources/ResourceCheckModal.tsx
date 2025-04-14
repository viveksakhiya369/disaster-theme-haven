
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ResourceCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: {
    id: string;
    name: string;
  };
}

const ResourceCheckModal = ({ isOpen, onClose, resource }: ResourceCheckModalProps) => {
  const [status, setStatus] = useState("operational");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Resource Check Completed",
      description: `${resource.name} has been marked as ${status}`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Resource Check</DialogTitle>
          <DialogDescription>
            Record maintenance check for {resource.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Current Status</Label>
            <RadioGroup value={status} onValueChange={setStatus}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="operational" id="operational" />
                <Label htmlFor="operational">Operational</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="maintenance" id="maintenance" />
                <Label htmlFor="maintenance">Needs Maintenance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="repair" id="repair" />
                <Label htmlFor="repair">Needs Repair</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="out-of-service" id="out-of-service" />
                <Label htmlFor="out-of-service">Out of Service</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter details about the resource condition"
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Submit Check
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceCheckModal;
