
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Building, Mail, MapPin, Phone, User } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: any) => void;
  contact?: {
    id: string;
    name: string;
    type: string;
    primary: boolean;
    phone: string;
    email: string;
    address: string;
    contactPerson: string;
    organization?: string;
    role?: string;
  };
  mode: 'add' | 'edit';
}

const ContactModal = ({ isOpen, onClose, onSave, contact, mode }: ContactModalProps) => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const updatedContact = {
      id: contact?.id || `CON-${Math.floor(Math.random() * 1000)}`,
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      primary: formData.get('primary') === 'on',
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      address: formData.get('address') as string,
      contactPerson: formData.get('contactPerson') as string,
      organization: formData.get('organization') as string,
      role: formData.get('role') as string,
    };
    
    onSave(updatedContact);
    toast({
      title: `Contact ${mode === 'add' ? 'added' : 'updated'} successfully`,
      description: `${updatedContact.name} has been ${mode === 'add' ? 'added to' : 'updated in'} your contacts.`,
    });
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Contact' : 'Edit Contact'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? 'Add a new contact to your directory.' : 'Make changes to the contact information.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="name" 
                  name="name" 
                  defaultValue={contact?.name || ''} 
                  className="pl-8" 
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input 
                id="type" 
                name="type" 
                defaultValue={contact?.type || ''} 
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <div className="relative">
                <Building className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="organization" 
                  name="organization" 
                  defaultValue={contact?.organization || ''} 
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role/Position</Label>
              <Input 
                id="role" 
                name="role" 
                defaultValue={contact?.role || ''}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input 
              id="contactPerson" 
              name="contactPerson" 
              defaultValue={contact?.contactPerson || ''}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                id="phone" 
                name="phone" 
                defaultValue={contact?.phone || ''} 
                className="pl-8" 
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                id="email" 
                name="email" 
                defaultValue={contact?.email || ''} 
                className="pl-8" 
                type="email" 
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                id="address" 
                name="address" 
                defaultValue={contact?.address || ''} 
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="primary"
              name="primary"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              defaultChecked={contact?.primary || false}
            />
            <Label htmlFor="primary" className="text-sm font-normal">Mark as primary contact</Label>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Add Contact' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
