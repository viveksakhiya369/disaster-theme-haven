
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building, Mail, MapPin, Phone, Shield, User, Calendar, Briefcase } from "lucide-react";

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
          <DialogTitle className="text-xl">{person.name}</DialogTitle>
          <DialogDescription>Personnel ID: {person.id}</DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-semibold">
              {person.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold">{person.name}</h2>
              <p className="text-muted-foreground">{person.role}</p>
              <div className="mt-2">
                <span className={`${getStatusColor(person.status)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                  {person.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b py-4">
            <div className="flex items-start gap-3">
              <Building className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                <p className="font-medium">{person.department}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                <p className="font-medium">{person.role}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Experience</h3>
                <p className="font-medium">{person.experience}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <p className="font-medium">{person.status}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${person.contact}`} className="hover:underline">{person.contact}</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${person.email}`} className="hover:underline">{person.email}</a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Certifications</h3>
            <div className="flex flex-wrap gap-2">
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
          <Button>Contact Personnel</Button>
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
