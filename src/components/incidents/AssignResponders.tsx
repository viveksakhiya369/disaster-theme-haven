
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { toast } from "sonner";

interface Person {
  id: string;
  name: string;
  role: string;
  department: string;
  status: string;
}

interface AssignRespondersProps {
  incidentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AssignResponders = ({ incidentId, open, onOpenChange }: AssignRespondersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResponders, setSelectedResponders] = useState<string[]>([]);
  
  // Mock available personnel data
  const availablePersonnel: Person[] = [
    {
      id: "EMP-001",
      name: "John Smith",
      role: "Fire Chief",
      department: "Fire Department",
      status: "Available"
    },
    {
      id: "EMP-002",
      name: "Emily Johnson",
      role: "Medical Director",
      department: "Emergency Medical Services",
      status: "Available"
    },
    {
      id: "EMP-004",
      name: "Sarah Williams",
      role: "Logistics Coordinator",
      department: "Operations Center",
      status: "Available"
    },
    {
      id: "EMP-005",
      name: "David Rodriguez",
      role: "Communications Officer",
      department: "Operations Center",
      status: "Available"
    },
    {
      id: "EMP-006",
      name: "Lisa Brown",
      role: "Police Officer",
      department: "Police Department",
      status: "Available"
    },
  ];

  const filteredPersonnel = availablePersonnel.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleResponder = (id: string) => {
    setSelectedResponders(prev => 
      prev.includes(id) 
        ? prev.filter(r => r !== id) 
        : [...prev, id]
    );
  };

  const handleAssign = () => {
    toast.success(`Assigned ${selectedResponders.length} responders to incident ${incidentId}`);
    setSelectedResponders([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Responders to Incident {incidentId}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search personnel..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="border rounded-md">
            <div className="p-2 bg-muted/50 border-b flex items-center justify-between">
              <span className="text-sm font-medium">Available Personnel</span>
              <span className="text-xs text-muted-foreground">{filteredPersonnel.length} found</span>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {filteredPersonnel.length > 0 ? (
                filteredPersonnel.map(person => (
                  <div 
                    key={person.id} 
                    className="flex items-center p-3 border-b last:border-b-0 hover:bg-accent/10"
                  >
                    <Checkbox 
                      id={person.id} 
                      checked={selectedResponders.includes(person.id)}
                      onCheckedChange={() => handleToggleResponder(person.id)}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <label 
                        htmlFor={person.id} 
                        className="flex flex-col cursor-pointer text-sm"
                      >
                        <span className="font-medium">{person.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {person.role} • {person.department}
                        </span>
                      </label>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No personnel found matching your search
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2" />
            <span>
              <span className="font-medium">{selectedResponders.length}</span> responders selected
            </span>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAssign}
            disabled={selectedResponders.length === 0}
          >
            Assign Responders
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignResponders;
