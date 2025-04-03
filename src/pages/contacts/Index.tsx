
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Download, Filter, Plus, Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import ContactCard from "@/components/contacts/ContactCard";
import ContactModal from "@/components/contacts/ContactModal";
import DeleteConfirmationDialog from "@/components/contacts/DeleteConfirmationDialog";
import { useToast } from "@/hooks/use-toast";

const ContactsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  
  // Mock contacts data
  const [contacts, setContacts] = useState([
    {
      id: "CON-001",
      name: "David Williams",
      role: "Director",
      type: "NGO",
      primary: true,
      phone: "+1 (555) 567-8901",
      email: "david.williams@example.com",
      address: "200 Charity Lane, Springfield",
      contactPerson: "David Williams",
      organization: "Red Cross Local Chapter"
    },
    {
      id: "CON-002",
      name: "John Smith",
      role: "Fire Chief",
      type: "Emergency Services",
      primary: true,
      phone: "+1 (555) 123-4567",
      email: "john.smith@example.com",
      address: "123 Main St, Springfield",
      contactPerson: "John Smith",
      organization: "Central Fire Department"
    },
    {
      id: "CON-003",
      name: "Karen Thompson",
      role: "Superintendent",
      type: "Education",
      primary: false,
      phone: "+1 (555) 678-9012",
      email: "karen.thompson@example.com",
      address: "300 Education Blvd, Springfield",
      contactPerson: "Karen Thompson",
      organization: "Springfield School District"
    },
    {
      id: "CON-004",
      name: "City Power & Utilities",
      role: "Manager",
      type: "Infrastructure",
      primary: false,
      phone: "+1 (555) 456-7890",
      email: "support@citypower.example.com",
      address: "101 Energy Lane, Industrial District",
      contactPerson: "Sarah Williams",
      organization: "City Utilities Department"
    },
    {
      id: "CON-005",
      name: "Michael Chen",
      role: "Captain",
      type: "Law Enforcement",
      primary: true,
      phone: "+1 (555) 345-6789",
      email: "michael.chen@example.com",
      address: "789 Justice Road, Civic Center",
      contactPerson: "Michael Chen",
      organization: "Police Headquarters"
    },
    {
      id: "CON-006",
      name: "City General Hospital",
      role: "Medical Director",
      type: "Healthcare",
      primary: true,
      phone: "+1 (555) 234-5678",
      email: "info@citygeneral.example.com",
      address: "456 Health Avenue, Midtown",
      contactPerson: "Dr. Emily Johnson",
      organization: "City General Hospital"
    }
  ]);

  // Handle contact operations
  const handleAddContact = (newContact: any) => {
    setContacts([...contacts, newContact]);
    toast({
      title: "Contact added",
      description: `${newContact.name} has been added to your contacts.`,
    });
  };

  const handleEditContact = (updatedContact: any) => {
    setContacts(contacts.map(contact => 
      contact.id === updatedContact.id ? updatedContact : contact
    ));
    toast({
      title: "Contact updated",
      description: `${updatedContact.name} has been updated successfully.`,
    });
  };

  const handleDeleteContact = () => {
    if (selectedContact) {
      setContacts(contacts.filter(contact => contact.id !== selectedContact.id));
      setIsDeleteDialogOpen(false);
      setSelectedContact(null);
      toast({
        title: "Contact deleted",
        description: `The contact has been removed from your directory.`,
        variant: "destructive",
      });
    }
  };

  // Filter contacts based on search and active tab
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "favorites") return matchesSearch && contact.primary;
    return matchesSearch && contact.type.toLowerCase().includes(activeTab.toLowerCase());
  });

  return (
    <DashboardLayout>
      <Header 
        title="Contacts Directory" 
        subtitle="Manage emergency and organizational contacts"
      />
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Contact Management</h2>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Contact
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={activeTab === "all" ? "default" : "outline"} 
            onClick={() => setActiveTab("all")}
            className="rounded-full"
          >
            All Contacts
          </Button>
          <Button 
            variant={activeTab === "emergency services" ? "default" : "outline"} 
            onClick={() => setActiveTab("emergency services")}
            className="rounded-full"
          >
            Emergency Services
          </Button>
          <Button 
            variant={activeTab === "healthcare" ? "default" : "outline"} 
            onClick={() => setActiveTab("healthcare")}
            className="rounded-full"
          >
            Healthcare
          </Button>
          <Button 
            variant={activeTab === "government" ? "default" : "outline"} 
            onClick={() => setActiveTab("government")}
            className="rounded-full"
          >
            Government
          </Button>
          <Button 
            variant={activeTab === "favorites" ? "default" : "outline"} 
            onClick={() => setActiveTab("favorites")}
            className="rounded-full gap-2"
          >
            <Star className="h-4 w-4" />
            Favorites
          </Button>
        </div>
        
        {/* Search and filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search contacts..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        
        {/* Contact cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map(contact => (
            <ContactCard 
              key={contact.id} 
              contact={contact}
              onEdit={() => {
                setSelectedContact(contact);
                setIsEditModalOpen(true);
              }}
              onDelete={() => {
                setSelectedContact(contact);
                setIsDeleteDialogOpen(true);
              }}
            />
          ))}
          
          {filteredContacts.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No contacts found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Modals */}
      <ContactModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddContact}
        mode="add"
      />
      
      {selectedContact && (
        <ContactModal 
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedContact(null);
          }}
          onSave={handleEditContact}
          contact={selectedContact}
          mode="edit"
        />
      )}
      
      {selectedContact && (
        <DeleteConfirmationDialog 
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setSelectedContact(null);
          }}
          onConfirm={handleDeleteContact}
          contactName={selectedContact.name}
        />
      )}
    </DashboardLayout>
  );
};

export default ContactsPage;
