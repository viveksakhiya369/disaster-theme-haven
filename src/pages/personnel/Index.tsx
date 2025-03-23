import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, ArrowUpDown, PhoneCall, Mail, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PersonnelForm from "@/components/personnel/PersonnelForm";
import { toast } from "sonner";

const PersonnelPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [activeTab, setActiveTab] = useState("all");
  
  const [personnel, setPersonnel] = useState([
    {
      id: "EMP-001",
      name: "John Smith",
      role: "Fire Chief",
      department: "Fire Department",
      status: "Available",
      experience: "15 years",
      contact: "+1 (555) 123-4567",
      email: "john.smith@example.com",
      certifications: ["Advanced Firefighting", "Emergency Response", "Command Leadership"]
    },
    {
      id: "EMP-002",
      name: "Emily Johnson",
      role: "Medical Director",
      department: "Emergency Medical Services",
      status: "On Duty",
      experience: "12 years",
      contact: "+1 (555) 234-5678",
      email: "emily.johnson@example.com",
      certifications: ["Emergency Medicine", "Trauma Care", "Medical Command"]
    },
    {
      id: "EMP-003",
      name: "Michael Chen",
      role: "Police Captain",
      department: "Police Department",
      status: "On Leave",
      experience: "18 years",
      contact: "+1 (555) 345-6789",
      email: "michael.chen@example.com",
      certifications: ["Crisis Management", "Public Safety", "Tactical Response"]
    },
    {
      id: "EMP-004",
      name: "Sarah Williams",
      role: "Logistics Coordinator",
      department: "Operations Center",
      status: "Available",
      experience: "7 years",
      contact: "+1 (555) 456-7890",
      email: "sarah.williams@example.com",
      certifications: ["Supply Chain Management", "Resource Allocation", "Disaster Logistics"]
    },
    {
      id: "EMP-005",
      name: "David Rodriguez",
      role: "Communications Officer",
      department: "Operations Center",
      status: "On Duty",
      experience: "9 years",
      contact: "+1 (555) 567-8901",
      email: "david.rodriguez@example.com",
      certifications: ["Emergency Communications", "Public Relations", "Crisis Communications"]
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-500";
      case "On Duty": return "bg-blue-500";
      case "On Leave": return "bg-yellow-500";
      case "Unavailable": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleAddPersonnel = (values: any) => {
    const newPersonnel = {
      id: `EMP-${String(personnel.length + 6).padStart(3, '0')}`,
      name: values.name,
      role: values.role,
      department: values.department,
      status: values.status,
      experience: values.experience,
      contact: values.contact,
      email: values.email,
      certifications: values.certifications ? values.certifications.split(",").map((c: string) => c.trim()) : []
    };
    
    setPersonnel([...personnel, newPersonnel]);
  };

  const handleCallPerson = (person: any) => {
    toast.info(`Calling ${person.name} at ${person.contact}`);
  };

  const handleEmailPerson = (person: any) => {
    toast.info(`Composing email to ${person.name} at ${person.email}`);
  };

  let filteredPersonnel = personnel.filter(person => {
    const matchesSearch = 
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || person.status === statusFilter;
    const matchesDepartment = 
      activeTab === "all" || 
      (activeTab === "fire" && person.department === "Fire Department") ||
      (activeTab === "medical" && person.department === "Emergency Medical Services") ||
      (activeTab === "police" && person.department === "Police Department") ||
      (activeTab === "operations" && person.department === "Operations Center");
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  filteredPersonnel = [...filteredPersonnel].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a] || "";
    const bValue = b[sortField as keyof typeof b] || "";
    
    let comparison = 0;
    if (typeof aValue === "string" && typeof bValue === "string") {
      comparison = aValue.localeCompare(bValue);
    } else {
      comparison = (aValue as any) > (bValue as any) ? 1 : -1;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <DashboardLayout>
      <Header 
        title="Personnel Management" 
        subtitle="Manage emergency responders and staff"
      />
      
      <div className="mb-6">
        <Tabs 
          defaultValue="all" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Personnel</TabsTrigger>
              <TabsTrigger value="fire">Fire Dept.</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="police">Police</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
            </TabsList>
            <Button className="gap-2" onClick={() => setCreateModalOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Personnel
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="p-6 rounded-xl glass transition-all duration-300 ease-in-out">
              <div className="flex flex-wrap justify-between gap-3 mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search personnel..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select 
                    value={statusFilter} 
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-[150px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="On Duty">On Duty</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                      <SelectItem value="Unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={`${sortField}-${sortDirection}`} 
                    onValueChange={(val) => {
                      const [field, direction] = val.split('-');
                      setSortField(field);
                      setSortDirection(direction as "asc" | "desc");
                    }}
                  >
                    <SelectTrigger className="w-[150px]">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name-asc">Name A-Z</SelectItem>
                      <SelectItem value="name-desc">Name Z-A</SelectItem>
                      <SelectItem value="department-asc">Department A-Z</SelectItem>
                      <SelectItem value="department-desc">Department Z-A</SelectItem>
                      <SelectItem value="experience-desc">Most Experienced</SelectItem>
                      <SelectItem value="experience-asc">Least Experienced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 font-medium">ID</th>
                      <th className="pb-2 font-medium">Name</th>
                      <th className="pb-2 font-medium">Department</th>
                      <th className="pb-2 font-medium">Role</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Experience</th>
                      <th className="pb-2 font-medium">Contact</th>
                      <th className="pb-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPersonnel.map((person) => (
                      <tr key={person.id} className="border-b hover:bg-accent/10">
                        <td className="py-3 text-sm font-mono">{person.id}</td>
                        <td className="py-3">
                          <div className="font-medium">{person.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {person.email}
                          </div>
                        </td>
                        <td className="py-3">{person.department}</td>
                        <td className="py-3">{person.role}</td>
                        <td className="py-3">
                          <span className={`${getStatusColor(person.status)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                            {person.status}
                          </span>
                        </td>
                        <td className="py-3">{person.experience}</td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7"
                              onClick={() => handleCallPerson(person)}
                            >
                              <PhoneCall className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7"
                              onClick={() => handleEmailPerson(person)}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">View Profile</Button>
                            <Button variant="ghost" size="sm">Assign</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredPersonnel.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No personnel found matching your criteria
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fire" className="mt-0">
            <div className="p-6 rounded-xl glass">
              {filteredPersonnel.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-2 font-medium">ID</th>
                        <th className="pb-2 font-medium">Name</th>
                        <th className="pb-2 font-medium">Role</th>
                        <th className="pb-2 font-medium">Status</th>
                        <th className="pb-2 font-medium">Experience</th>
                        <th className="pb-2 font-medium">Contact</th>
                        <th className="pb-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPersonnel.map((person) => (
                        <tr key={person.id} className="border-b hover:bg-accent/10">
                          <td className="py-3 text-sm font-mono">{person.id}</td>
                          <td className="py-3">
                            <div className="font-medium">{person.name}</div>
                            <div className="text-xs text-muted-foreground">{person.email}</div>
                          </td>
                          <td className="py-3">{person.role}</td>
                          <td className="py-3">
                            <span className={`${getStatusColor(person.status)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                              {person.status}
                            </span>
                          </td>
                          <td className="py-3">{person.experience}</td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCallPerson(person)}>
                                <PhoneCall className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEmailPerson(person)}>
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">View Profile</Button>
                              <Button variant="ghost" size="sm">Assign</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No Fire Department personnel found</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="medical" className="mt-0">
            <div className="p-6 rounded-xl glass">
              {filteredPersonnel.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-2 font-medium">ID</th>
                        <th className="pb-2 font-medium">Name</th>
                        <th className="pb-2 font-medium">Role</th>
                        <th className="pb-2 font-medium">Status</th>
                        <th className="pb-2 font-medium">Experience</th>
                        <th className="pb-2 font-medium">Contact</th>
                        <th className="pb-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPersonnel.map((person) => (
                        <tr key={person.id} className="border-b hover:bg-accent/10">
                          <td className="py-3 text-sm font-mono">{person.id}</td>
                          <td className="py-3">
                            <div className="font-medium">{person.name}</div>
                            <div className="text-xs text-muted-foreground">{person.email}</div>
                          </td>
                          <td className="py-3">{person.role}</td>
                          <td className="py-3">
                            <span className={`${getStatusColor(person.status)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                              {person.status}
                            </span>
                          </td>
                          <td className="py-3">{person.experience}</td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCallPerson(person)}>
                                <PhoneCall className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEmailPerson(person)}>
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">View Profile</Button>
                              <Button variant="ghost" size="sm">Assign</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No Medical personnel found</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="police" className="mt-0">
            <div className="p-6 rounded-xl glass">
              {filteredPersonnel.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-2 font-medium">ID</th>
                        <th className="pb-2 font-medium">Name</th>
                        <th className="pb-2 font-medium">Role</th>
                        <th className="pb-2 font-medium">Status</th>
                        <th className="pb-2 font-medium">Experience</th>
                        <th className="pb-2 font-medium">Contact</th>
                        <th className="pb-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPersonnel.map((person) => (
                        <tr key={person.id} className="border-b hover:bg-accent/10">
                          <td className="py-3 text-sm font-mono">{person.id}</td>
                          <td className="py-3">
                            <div className="font-medium">{person.name}</div>
                            <div className="text-xs text-muted-foreground">{person.email}</div>
                          </td>
                          <td className="py-3">{person.role}</td>
                          <td className="py-3">
                            <span className={`${getStatusColor(person.status)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                              {person.status}
                            </span>
                          </td>
                          <td className="py-3">{person.experience}</td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCallPerson(person)}>
                                <PhoneCall className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEmailPerson(person)}>
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">View Profile</Button>
                              <Button variant="ghost" size="sm">Assign</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No Police personnel found</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="operations" className="mt-0">
            <div className="p-6 rounded-xl glass">
              {filteredPersonnel.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-2 font-medium">ID</th>
                        <th className="pb-2 font-medium">Name</th>
                        <th className="pb-2 font-medium">Role</th>
                        <th className="pb-2 font-medium">Status</th>
                        <th className="pb-2 font-medium">Experience</th>
                        <th className="pb-2 font-medium">Contact</th>
                        <th className="pb-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPersonnel.map((person) => (
                        <tr key={person.id} className="border-b hover:bg-accent/10">
                          <td className="py-3 text-sm font-mono">{person.id}</td>
                          <td className="py-3">
                            <div className="font-medium">{person.name}</div>
                            <div className="text-xs text-muted-foreground">{person.email}</div>
                          </td>
                          <td className="py-3">{person.role}</td>
                          <td className="py-3">
                            <span className={`${getStatusColor(person.status)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                              {person.status}
                            </span>
                          </td>
                          <td className="py-3">{person.experience}</td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCallPerson(person)}>
                                <PhoneCall className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEmailPerson(person)}>
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">View Profile</Button>
                              <Button variant="ghost" size="sm">Assign</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No Operations personnel found</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Department Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Fire Department</span>
              <span className="font-medium">24 personnel</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Emergency Medical</span>
              <span className="font-medium">18 personnel</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Police Department</span>
              <span className="font-medium">32 personnel</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Operations Center</span>
              <span className="font-medium">15 personnel</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Availability</h3>
          <div className="space-y-3">
            <div className="flex gap-3 items-center">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span>Available</span>
              <span className="ml-auto font-medium">42%</span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span>On Duty</span>
              <span className="ml-auto font-medium">35%</span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <span>On Leave</span>
              <span className="ml-auto font-medium">15%</span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span>Unavailable</span>
              <span className="ml-auto font-medium">8%</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded-full flex items-center gap-1">
              <Shield className="h-3 w-3" /> Emergency Response
            </div>
            <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded-full flex items-center gap-1">
              <Shield className="h-3 w-3" /> Firefighting
            </div>
            <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded-full flex items-center gap-1">
              <Shield className="h-3 w-3" /> First Aid
            </div>
            <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded-full flex items-center gap-1">
              <Shield className="h-3 w-3" /> Crisis Management
            </div>
            <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded-full flex items-center gap-1">
              <Shield className="h-3 w-3" /> Communications
            </div>
            <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded-full flex items-center gap-1">
              <Shield className="h-3 w-3" /> Logistics
            </div>
            <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded-full flex items-center gap-1">
              <Shield className="h-3 w-3" /> Medical Care
            </div>
            <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded-full flex items-center gap-1">
              <Shield className="h-3 w-3" /> Leadership
            </div>
          </div>
        </div>
      </div>

      <PersonnelForm 
        open={createModalOpen} 
        onOpenChange={setCreateModalOpen} 
        onSubmit={handleAddPersonnel} 
      />
    </DashboardLayout>
  );
};

export default PersonnelPage;
