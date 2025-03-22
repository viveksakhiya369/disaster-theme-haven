import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Plus, Search, Building, Phone, Mail, MapPin, Star, PhoneCall, Send, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContactsPage = () => {
  const mockContacts = [
    {
      id: "CON-001",
      name: "Central Fire Department",
      type: "Emergency Service",
      primary: true,
      phone: "+1 (555) 123-4567",
      email: "fire.central@example.com",
      address: "123 Main Street, Downtown",
      contactPerson: "Chief John Smith"
    },
    {
      id: "CON-002",
      name: "City General Hospital",
      type: "Medical Facility",
      primary: true,
      phone: "+1 (555) 234-5678",
      email: "info@citygeneral.example.com",
      address: "456 Health Avenue, Midtown",
      contactPerson: "Dr. Emily Johnson"
    },
    {
      id: "CON-003",
      name: "Police Headquarters",
      type: "Law Enforcement",
      primary: true,
      phone: "+1 (555) 345-6789",
      email: "police.hq@example.com",
      address: "789 Justice Road, Civic Center",
      contactPerson: "Captain Michael Chen"
    },
    {
      id: "CON-004",
      name: "City Power & Utilities",
      type: "Infrastructure",
      primary: false,
      phone: "+1 (555) 456-7890",
      email: "support@citypower.example.com",
      address: "101 Energy Lane, Industrial District",
      contactPerson: "Sarah Williams"
    },
    {
      id: "CON-005",
      name: "Red Cross Local Chapter",
      type: "NGO",
      primary: false,
      phone: "+1 (555) 567-8901",
      email: "redcross.local@example.com",
      address: "202 Helper Street, Downtown",
      contactPerson: "David Rodriguez"
    },
    {
      id: "CON-006",
      name: "Coast Guard Station",
      type: "Emergency Service",
      primary: false,
      phone: "+1 (555) 678-9012",
      email: "coastguard.station@example.com",
      address: "303 Harbor Drive, Waterfront",
      contactPerson: "Lieutenant Lisa Thompson"
    }
  ];

  return (
    <DashboardLayout>
      <Header 
        title="Contacts Directory" 
        subtitle="Access emergency services and critical contacts"
      />
      
      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Contacts</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Services</TabsTrigger>
              <TabsTrigger value="medical">Medical Facilities</TabsTrigger>
              <TabsTrigger value="government">Government</TabsTrigger>
              <TabsTrigger value="utilities">Utilities</TabsTrigger>
            </TabsList>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Contact
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="p-6 rounded-xl glass transition-all duration-300 ease-in-out">
              <div className="flex justify-between mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search contacts..." 
                    className="pl-8"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Filter</Button>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 font-medium">Name</th>
                      <th className="pb-2 font-medium">Type</th>
                      <th className="pb-2 font-medium">Contact Person</th>
                      <th className="pb-2 font-medium">Phone</th>
                      <th className="pb-2 font-medium">Email</th>
                      <th className="pb-2 font-medium">Address</th>
                      <th className="pb-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockContacts.map((contact) => (
                      <tr key={contact.id} className="border-b hover:bg-accent/10">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            {contact.primary && (
                              <Star className="h-4 w-4 text-amber-500" />
                            )}
                            <div>
                              <div className="font-medium">{contact.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {contact.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">{contact.type}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{contact.contactPerson}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{contact.phone}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{contact.email}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="max-w-[150px] truncate" title={contact.address}>
                              {contact.address}
                            </span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <PhoneCall className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Other tabs would follow the same pattern */}
          <TabsContent value="emergency" className="mt-0">
            <div className="p-6 rounded-xl glass">
              <p className="text-center text-muted-foreground">Showing Emergency Services contacts</p>
            </div>
          </TabsContent>
          <TabsContent value="medical" className="mt-0">
            <div className="p-6 rounded-xl glass">
              <p className="text-center text-muted-foreground">Showing Medical Facilities contacts</p>
            </div>
          </TabsContent>
          <TabsContent value="government" className="mt-0">
            <div className="p-6 rounded-xl glass">
              <p className="text-center text-muted-foreground">Showing Government contacts</p>
            </div>
          </TabsContent>
          <TabsContent value="utilities" className="mt-0">
            <div className="p-6 rounded-xl glass">
              <p className="text-center text-muted-foreground">Showing Utilities contacts</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl glass">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-800">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium">Emergency Hotlines</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Emergency Services (911)</span>
                  <Button variant="ghost" size="sm" className="h-8">
                    <PhoneCall className="h-3.5 w-3.5 mr-1" />
                    Call
                  </Button>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Fire Department Direct</span>
                  <Button variant="ghost" size="sm" className="h-8">
                    <PhoneCall className="h-3.5 w-3.5 mr-1" />
                    Call
                  </Button>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Medical Emergency</span>
                  <Button variant="ghost" size="sm" className="h-8">
                    <PhoneCall className="h-3.5 w-3.5 mr-1" />
                    Call
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Poison Control</span>
                  <Button variant="ghost" size="sm" className="h-8">
                    <PhoneCall className="h-3.5 w-3.5 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-xl glass">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-800">
                  <Building className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium">Government Agencies</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span>City Emergency Management</span>
                  <Button variant="ghost" size="sm" className="h-8">
                    <PhoneCall className="h-3.5 w-3.5 mr-1" />
                    Call
                  </Button>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>County Sheriff's Office</span>
                  <Button variant="ghost" size="sm" className="h-8">
                    <PhoneCall className="h-3.5 w-3.5 mr-1" />
                    Call
                  </Button>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>State Emergency Services</span>
                  <Button variant="ghost" size="sm" className="h-8">
                    <PhoneCall className="h-3.5 w-3.5 mr-1" />
                    Call
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Federal Emergency Agency</span>
                  <Button variant="ghost" size="sm" className="h-8">
                    <PhoneCall className="h-3.5 w-3.5 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Recent Contacts</h3>
          <div className="space-y-4">
            <div className="flex gap-3 items-start border-b pb-3">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-800 font-medium">
                FD
              </div>
              <div>
                <p className="font-medium">Central Fire Department</p>
                <p className="text-sm text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 inline mr-1" />
                  {mockContacts[0].phone}
                </p>
                <p className="text-xs text-muted-foreground">Called 2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-3 items-start border-b pb-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
                PD
              </div>
              <div>
                <p className="font-medium">Police Headquarters</p>
                <p className="text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 inline mr-1" />
                  {mockContacts[2].email}
                </p>
                <p className="text-xs text-muted-foreground">Emailed yesterday</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium">
                H
              </div>
              <div>
                <p className="font-medium">City General Hospital</p>
                <p className="text-sm text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 inline mr-1" />
                  {mockContacts[1].phone}
                </p>
                <p className="text-xs text-muted-foreground">Called 3 days ago</p>
              </div>
            </div>
            <div className="pt-2 border-t mt-4">
              <Button variant="outline" className="w-full">View All Call History</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactsPage;
