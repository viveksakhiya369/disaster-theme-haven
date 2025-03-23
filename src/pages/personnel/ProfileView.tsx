
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Clipboard, 
  Clock, 
  ArrowLeft, 
  Edit, 
  Shield, 
  Award
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const PersonnelProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  
  // Mock data for the example
  const personnel = {
    id: id,
    name: "Alex Johnson",
    role: "Senior Paramedic",
    department: "Medical",
    status: "Available",
    phone: "+1 (555) 123-4567",
    email: "alex.johnson@example.com",
    location: "Central Station",
    address: "123 Main St, Springfield",
    joinDate: "2018-05-12",
    lastActivity: "2023-06-12T08:30:00Z",
    certifications: ["Advanced Medical Care", "Hazardous Materials", "Search & Rescue"],
    skills: ["First Aid", "Emergency Response", "Critical Care"],
    currentAssignment: "None",
    shiftHours: "08:00 - 16:00",
    image: null,
    bio: "Alex has 10+ years of experience in emergency medical services, specializing in trauma care and disaster response."
  };

  const handleAssign = () => {
    toast({
      title: "Assignment Updated",
      description: "Alex Johnson has been assigned to Downtown Incident Response.",
    });
    setIsAssignDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <Header 
        title="Personnel Profile" 
        subtitle="View detailed personnel information"
      />
      
      <div className="mb-4 flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate("/personnel")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Personnel
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="col-span-1">
          <div className="glass p-6 rounded-xl flex flex-col items-center text-center">
            <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl font-medium mb-4">
              {personnel.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h2 className="text-xl font-bold">{personnel.name}</h2>
            <p className="text-muted-foreground">{personnel.role}</p>
            
            <div className="mt-2 flex items-center justify-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                personnel.status === 'Available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {personnel.status}
              </span>
            </div>
            
            <div className="mt-6 w-full flex flex-col gap-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-muted-foreground mr-3" />
                <span className="text-sm">{personnel.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-muted-foreground mr-3" />
                <span className="text-sm">{personnel.email}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-muted-foreground mr-3" />
                <span className="text-sm">{personnel.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 text-muted-foreground mr-3" />
                <span className="text-sm">{personnel.department}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-muted-foreground mr-3" />
                <span className="text-sm">Joined {new Date(personnel.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6 w-full">
              <Button className="flex-1 gap-2" onClick={() => setIsAssignDialogOpen(true)}>
                <Clipboard className="h-4 w-4" />
                Assign
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </div>
            
            <div className="flex gap-2 mt-3 w-full">
              <Button variant="outline" className="flex-1 gap-2" asChild>
                <a href={`tel:${personnel.phone.replace(/[^0-9]/g, '')}`}>
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              </Button>
              <Button variant="outline" className="flex-1 gap-2" asChild>
                <a href={`mailto:${personnel.email}`}>
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Personnel Overview</h3>
                <p className="text-muted-foreground mb-6">{personnel.bio}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Current Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-sm">Assignment:</span>
                          <span className="font-medium">{personnel.currentAssignment || "None"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-sm">Shift Hours:</span>
                          <span className="font-medium">{personnel.shiftHours}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-sm">Last Activity:</span>
                          <span className="font-medium">{new Date(personnel.lastActivity).toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {personnel.skills.map(skill => (
                          <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="assignments" className="mt-0">
              <div className="glass p-6 rounded-xl">
                <p className="text-center text-muted-foreground">No active assignments</p>
              </div>
            </TabsContent>
            
            <TabsContent value="certifications" className="mt-0">
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Certifications & Training</h3>
                
                <div className="space-y-4">
                  {personnel.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start gap-3 border-b last:border-0 pb-3 last:pb-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{cert}</h4>
                        <p className="text-sm text-muted-foreground">Valid until: Dec 2023</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <div className="glass p-6 rounded-xl">
                <p className="text-center text-muted-foreground">Assignment history will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Assign Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Personnel</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="incident">Incident</Label>
              <Input id="incident" defaultValue="Downtown Fire Incident" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Medical Support" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" defaultValue="8 hours" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAssign}>Confirm Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default PersonnelProfilePage;
