import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search, 
  Download, 
  Phone, 
  Mail, 
  Globe, 
  User, 
  Building, 
  Filter, 
  Edit, 
  Trash, 
  Copy,
  Star,
  ArrowUpDown,
  Users,
  MapPin
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const ContactsPage = () => {
  const { toast } = useToast();
  const [addContactOpen, setAddContactOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sorting, setSorting] = useState({ field: "name", direction: "asc" });
  
  const mockContacts = [
    {
      id: "C001",
      name: "John Smith",
      role: "Fire Chief",
      organization: "Central Fire Department",
      category: "Emergency Services",
      phone: "+1 (555) 123-4567",
      email: "john.smith@example.com",
      address: "123 Main St, Springfield",
      notes: "Primary contact for city fire response",
      favorite: true
    },
    {
      id: "C002",
      name: "Sarah Johnson",
      role: "Emergency Medical Director",
      organization: "City Hospital",
      category: "Healthcare",
      phone: "+1 (555) 234-5678",
      email: "sarah.johnson@example.com",
      address: "456 Oak Ave, Springfield",
      notes: "Coordinates emergency medical response",
      favorite: true
    },
    {
      id: "C003",
      name: "Michael Chen",
      role: "Police Captain",
      organization: "Springfield Police Department",
      category: "Law Enforcement",
      phone: "+1 (555) 345-6789",
      email: "michael.chen@example.com",
      address: "789 Elm St, Springfield",
      notes: "Handles police emergency coordination",
      favorite: false
    },
    {
      id: "C004",
      name: "Lisa Rodriguez",
      role: "City Manager",
      organization: "City Administration",
      category: "Government",
      phone: "+1 (555) 456-7890",
      email: "lisa.rodriguez@example.com",
      address: "100 City Hall Plaza, Springfield",
      notes: "Key decision maker for city resources",
      favorite: false
    },
    {
      id: "C005",
      name: "David Williams",
      role: "Director",
      organization: "Red Cross Local Chapter",
      category: "NGO",
      phone: "+1 (555) 567-8901",
      email: "david.williams@example.com",
      address: "200 Charity Lane, Springfield",
      notes: "Coordinates disaster relief efforts",
      favorite: true
    },
    {
      id: "C006",
      name: "Karen Thompson",
      role: "Superintendent",
      organization: "Springfield School District",
      category: "Education",
      phone: "+1 (555) 678-9012",
      email: "karen.thompson@example.com",
      address: "300 Education Blvd, Springfield",
      notes: "Contact for school emergency plans",
      favorite: false
    }
  ];
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Emergency Services": return "bg-red-100 text-red-800";
      case "Healthcare": return "bg-blue-100 text-blue-800";
      case "Law Enforcement": return "bg-indigo-100 text-indigo-800";
      case "Government": return "bg-purple-100 text-purple-800";
      case "NGO": return "bg-green-100 text-green-800";
      case "Education": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const handleAddContact = () => {
    toast({
      title: "Contact Added",
      description: "New contact has been added to your directory."
    });
    setAddContactOpen(false);
  };
  
  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast({
      title: "Email Copied",
      description: "Contact email has been copied to clipboard."
    });
  };
  
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast({
      title: "Phone Number Copied",
      description: "Contact phone number has been copied to clipboard."
    });
  };
  
  const handleExportContacts = () => {
    toast({
      title: "Contacts Exported",
      description: "Contact list has been exported to CSV."
    });
  };
  
  const handleToggleFavorite = (id: string) => {
    toast({
      title: "Favorite Updated",
      description: "Contact favorite status has been updated."
    });
  };
  
  const handleSort = (field: string) => {
    const newDirection = 
      sorting.field === field 
        ? (sorting.direction === "asc" ? "desc" : "asc") 
        : "asc";
    
    setSorting({ field, direction: newDirection });
    
    toast({
      title: "Contacts Sorted",
      description: `Sorted by ${field} (${newDirection === "asc" ? "A-Z" : "Z-A"})`
    });
  };
  
  const filteredContacts = mockContacts
    .filter(contact => {
      if (activeCategory !== "all" && contact.category !== activeCategory) {
        return false;
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          contact.name.toLowerCase().includes(query) ||
          contact.organization.toLowerCase().includes(query) ||
          contact.role.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query) ||
          contact.phone.includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      const field = sorting.field;
      const direction = sorting.direction === "asc" ? 1 : -1;
      
      // @ts-ignore
      if (a[field] < b[field]) return -1 * direction;
      // @ts-ignore
      if (a[field] > b[field]) return 1 * direction;
      return 0;
    });

  return (
    <DashboardLayout>
      <Header 
        title="Contacts Directory" 
        subtitle="Manage emergency and organizational contacts"
      />
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Contact Management</h2>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleExportContacts}>
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2" onClick={() => setAddContactOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Contact
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger 
              value="all" 
              onClick={() => setActiveCategory("all")}
            >
              All Contacts
            </TabsTrigger>
            <TabsTrigger 
              value="emergency" 
              onClick={() => setActiveCategory("Emergency Services")}
            >
              Emergency Services
            </TabsTrigger>
            <TabsTrigger 
              value="government" 
              onClick={() => setActiveCategory("Government")}
            >
              Government
            </TabsTrigger>
            <TabsTrigger 
              value="healthcare" 
              onClick={() => setActiveCategory("Healthcare")}
            >
              Healthcare
            </TabsTrigger>
            <TabsTrigger 
              value="favorites" 
              onClick={() => setActiveCategory("favorites")}
            >
              Favorites
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="p-6 rounded-xl glass transition-all duration-300 ease-in-out">
              <div className="flex justify-between mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search contacts..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setActiveCategory("all")}>
                        All Categories
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setActiveCategory("Emergency Services")}>
                        Emergency Services
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setActiveCategory("Healthcare")}>
                        Healthcare
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setActiveCategory("Law Enforcement")}>
                        Law Enforcement
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setActiveCategory("Government")}>
                        Government
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setActiveCategory("NGO")}>
                        NGO
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setActiveCategory("Education")}>
                        Education
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <ArrowUpDown className="h-4 w-4" />
                        Sort
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleSort("name")}>
                        Name {sorting.field === "name" && (sorting.direction === "asc" ? "(A-Z)" : "(Z-A)")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSort("organization")}>
                        Organization {sorting.field === "organization" && (sorting.direction === "asc" ? "(A-Z)" : "(Z-A)")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSort("category")}>
                        Category {sorting.field === "category" && (sorting.direction === "asc" ? "(A-Z)" : "(Z-A)")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContacts.map(contact => (
                  <div key={contact.id} className="border rounded-lg p-4 hover:border-primary/50 transition-colors relative">
                    <button 
                      className="absolute top-3 right-3 text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => handleToggleFavorite(contact.id)}
                    >
                      <Star className={`h-5 w-5 ${contact.favorite ? "fill-amber-400 text-amber-400" : ""}`} />
                    </button>
                    
                    <div className="flex items-center mb-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-medium mr-3">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.role}</p>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(contact.category)}`}>
                        {contact.category}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <Building className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">{contact.organization}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div className="flex items-center gap-1">
                          <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="text-sm hover:underline">{contact.phone}</a>
                          <button 
                            className="text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => handleCopyPhone(contact.phone)}
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div className="flex items-center gap-1">
                          <a href={`mailto:${contact.email}`} className="text-sm hover:underline">{contact.email}</a>
                          <button 
                            className="text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => handleCopyEmail(contact.email)}
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">{contact.address}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Contact
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="h-4 w-4 mr-2" />
                            Delete Contact
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="emergency" className="mt-4">
            <div className="p-6 rounded-xl glass">
              <h3 className="text-lg font-medium mb-4">Emergency Services Contacts</h3>
            </div>
          </TabsContent>
          <TabsContent value="government" className="mt-4">
            <div className="p-6 rounded-xl glass">
              <h3 className="text-lg font-medium mb-4">Government Contacts</h3>
            </div>
          </TabsContent>
          <TabsContent value="healthcare" className="mt-4">
            <div className="p-6 rounded-xl glass">
              <h3 className="text-lg font-medium mb-4">Healthcare Contacts</h3>
            </div>
          </TabsContent>
          <TabsContent value="favorites" className="mt-4">
            <div className="p-6 rounded-xl glass">
              <h3 className="text-lg font-medium mb-4">Favorite Contacts</h3>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={addContactOpen} onOpenChange={setAddContactOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
            <DialogDescription>
              Enter the details for the new contact below
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Smith" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role / Title</Label>
                <Input id="role" placeholder="Emergency Coordinator" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="organization">Organization</Label>
                <Input id="organization" placeholder="Springfield Fire Department" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency Services</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="law">Law Enforcement</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="ngo">NGO</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john.smith@example.com" />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Main St, Springfield" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Additional information about this contact..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddContactOpen(false)}>Cancel</Button>
            <Button onClick={handleAddContact}>Add Contact</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-4 rounded-xl">
          <h3 className="text-lg font-medium mb-3">Quick Categories</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between border rounded-md p-3 hover:border-primary/50 hover:bg-accent/20 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-800">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Emergency Services</p>
                  <p className="text-xs text-muted-foreground">Fire, Police, Ambulance</p>
                </div>
              </div>
              <div className="text-sm font-medium">4</div>
            </div>
            
            <div className="flex items-center justify-between border rounded-md p-3 hover:border-primary/50 hover:bg-accent/20 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
                  <Building className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Government Officials</p>
                  <p className="text-xs text-muted-foreground">City, County, State</p>
                </div>
              </div>
              <div className="text-sm font-medium">5</div>
            </div>
            
            <div className="flex items-center justify-between border rounded-md p-3 hover:border-primary/50 hover:bg-accent/20 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">External Organizations</p>
                  <p className="text-xs text-muted-foreground">NGOs, Support Services</p>
                </div>
              </div>
              <div className="text-sm font-medium">8</div>
            </div>
            
            <div className="flex items-center justify-between border rounded-md p-3 hover:border-primary/50 hover:bg-accent/20 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Internal Personnel</p>
                  <p className="text-xs text-muted-foreground">Staff, Management, Teams</p>
                </div>
              </div>
              <div className="text-sm font-medium">15</div>
            </div>
          </div>
        </div>
        
        <div className="col-span-2 glass p-4 rounded-xl">
          <h3 className="text-lg font-medium mb-3">Emergency Contact Procedures</h3>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <h4 className="font-medium mb-1">Emergency Response Chain</h4>
              <p className="text-sm text-muted-foreground">
                In case of emergency, follow the designated contact chain starting with the incident commander. 
                Ensure all communications are logged in the system.
              </p>
            </div>
            
            <div className="border-b pb-3">
              <h4 className="font-medium mb-1">Escalation Protocol</h4>
              <p className="text-sm text-muted-foreground">
                If primary contacts are unavailable, escalate to secondary contacts after 10 minutes. 
                Further escalation to external agencies requires authorization.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Communication Systems</h4>
              <p className="text-sm text-muted-foreground">
                Primary: Radio Communications. Secondary: Mobile Phones. Tertiary: Satellite Phones.
                Ensure all contacts have updated information for all three systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactsPage;
