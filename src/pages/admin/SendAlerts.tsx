
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, SendHorizontal, Users } from "lucide-react";

const SendAlertsPage = () => {
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const [sendEmail, setSendEmail] = useState(true);
  const [sendNotification, setSendNotification] = useState(true);
  const [recipients, setRecipients] = useState("all");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Alert Sent",
      description: `Your alert has been sent to ${recipients === "all" ? "all users" : "selected users"}`,
    });
    
    // Clear form after sending
    setAlertTitle("");
    setAlertMessage("");
  };

  return (
    <DashboardLayout>
      <Header 
        title="Send Alerts" 
        subtitle="Send notifications and emails to system users"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="p-6 rounded-xl glass space-y-6">
            <div className="space-y-2">
              <Label htmlFor="alertTitle">Alert Title</Label>
              <Input
                id="alertTitle"
                value={alertTitle}
                onChange={(e) => setAlertTitle(e.target.value)}
                placeholder="Enter alert title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alertMessage">Alert Message</Label>
              <Textarea
                id="alertMessage"
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
                placeholder="Enter alert message"
                rows={5}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alertType">Alert Type</Label>
                <Select value={alertType} onValueChange={setAlertType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Information</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="danger">Emergency</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients</Label>
                <Select value={recipients} onValueChange={setRecipients}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="fire">Fire Department</SelectItem>
                    <SelectItem value="medical">Medical Staff</SelectItem>
                    <SelectItem value="police">Police</SelectItem>
                    <SelectItem value="operations">Operations Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="border-t pt-4 flex flex-col md:flex-row gap-6">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="sendEmail" 
                  checked={sendEmail} 
                  onCheckedChange={setSendEmail} 
                />
                <Label htmlFor="sendEmail" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Send Email
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="sendNotification" 
                  checked={sendNotification} 
                  onCheckedChange={setSendNotification} 
                />
                <Label htmlFor="sendNotification" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Send Notification
                </Label>
              </div>
            </div>
            
            <Button type="submit" className="w-full md:w-auto flex items-center gap-2">
              <SendHorizontal className="h-4 w-4" />
              Send Alert
            </Button>
          </form>
        </div>
        
        <div className="space-y-6">
          <div className="p-6 rounded-xl glass">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recipient Count
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>All Users</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Fire Department</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Medical Staff</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Police</span>
                <span className="font-medium">32</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Operations Team</span>
                <span className="font-medium">15</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-xl glass">
            <h3 className="text-lg font-medium mb-3">Recent Alerts</h3>
            <div className="space-y-3">
              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <div className="font-medium">Flash Flood Warning</div>
                  <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Warning</div>
                </div>
                <p className="text-sm text-muted-foreground">Sent 2 hours ago</p>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <div className="font-medium">Emergency Response Update</div>
                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Info</div>
                </div>
                <p className="text-sm text-muted-foreground">Sent 1 day ago</p>
              </div>
              <div>
                <div className="flex justify-between">
                  <div className="font-medium">System Maintenance</div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Success</div>
                </div>
                <p className="text-sm text-muted-foreground">Sent 3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SendAlertsPage;
