
import { Button } from "@/components/ui/button";
import { Building, Mail, MapPin, Phone, Star, Edit, Trash2 } from "lucide-react";

interface ContactCardProps {
  contact: {
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
  onEdit: () => void;
  onDelete: () => void;
}

const ContactCard = ({ contact, onEdit, onDelete }: ContactCardProps) => {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Determine background color based on type
  const getBgColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'emergency services':
        return 'bg-red-100 text-red-800';
      case 'healthcare':
        return 'bg-blue-100 text-blue-800';
      case 'government':
        return 'bg-purple-100 text-purple-800';
      case 'ngo':
        return 'bg-green-100 text-green-800';
      case 'education':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm hover:shadow transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`h-12 w-12 rounded-full ${getBgColor(contact.type)} flex items-center justify-center font-medium text-lg`}>
            {getInitials(contact.name)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{contact.name}</h3>
              {contact.primary && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
            </div>
            <p className="text-sm text-muted-foreground">{contact.role || contact.contactPerson}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-1.5 mb-4">
        <div className="text-xs inline-block px-2 py-1 rounded-full font-medium capitalize" 
          style={{ 
            backgroundColor: getBgColor(contact.type).split(' ')[0], 
            color: getBgColor(contact.type).split(' ')[1] 
          }}>
          {contact.type}
        </div>
        
        {contact.organization && (
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm">{contact.organization}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
          <a href={`tel:${contact.phone}`} className="text-sm hover:underline">{contact.phone}</a>
        </div>
        
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
          <a href={`mailto:${contact.email}`} className="text-sm hover:underline">{contact.email}</a>
        </div>
        
        {contact.address && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm">{contact.address}</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex gap-2">
        <Button variant="outline" size="sm" className="w-1/2 justify-center">
          <Phone className="h-4 w-4 mr-2" />
          Call
        </Button>
        <Button variant="outline" size="sm" className="w-1/2 justify-center">
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>
      </div>
    </div>
  );
};

export default ContactCard;
