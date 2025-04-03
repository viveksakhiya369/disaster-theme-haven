
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: {
    id: string;
    name: string;
    role: string;
    department: string;
    status: string;
    experience: string;
    contact: string;
    email: string;
    certifications: string[];
  };
}

const ProfileModal = ({ isOpen, onClose, person }: ProfileModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{person.name}</DialogTitle>
          <DialogDescription>Personnel ID: {person.id}</DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
              <p>{person.department}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
              <p>{person.role}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
            <div className="mt-1">
              <span className={`${getStatusColor(person.status)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                {person.status}
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
            <p>{person.contact}</p>
            <p className="text-sm">{person.email}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Experience</h3>
            <p>{person.experience}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Certifications</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {person.certifications.map((cert, index) => (
                <div key={index} className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded-full flex items-center gap-1">
                  <Shield className="h-3 w-3" /> {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Helper function from the original page
const getStatusColor = (status: string) => {
  switch (status) {
    case "Available": return "bg-green-500";
    case "On Duty": return "bg-blue-500";
    case "On Leave": return "bg-yellow-500";
    case "Unavailable": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

export default ProfileModal;
