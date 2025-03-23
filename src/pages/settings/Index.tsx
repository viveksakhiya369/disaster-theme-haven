
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Bell, User, Lock, Globe, Monitor, Moon, Sun, Palette, Save, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <Header 
        title="Settings" 
        subtitle="Customize system preferences and account settings"
      />
      
      <div className="mb-6">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="account">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="system">
              <Globe className="h-4 w-4 mr-2" />
              System
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="mt-0">
            <div className="p-6 rounded-xl glass transition-all duration-300 ease-in-out space-y-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-medium">
                      AD
                    </div>
                    <Button variant="outline" size="sm" className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0">
                      <User className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Admin" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="User" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="admin@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Operations Manager" readOnly className="bg-muted" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6 flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0">
            <div className="p-6 rounded-xl glass space-y-6">
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alert Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications for new alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Incident Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified about changes to incidents</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Resource Allocations</p>
                    <p className="text-sm text-muted-foreground">Receive notifications about resource changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified about system maintenance</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email copies of important notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="border-t pt-4 mt-6">
                <h4 className="font-medium mb-3">Notification Schedule</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="notifyStart">Quiet Hours Start</Label>
                    <Input id="notifyStart" type="time" defaultValue="22:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notifyEnd">Quiet Hours End</Label>
                    <Input id="notifyEnd" type="time" defaultValue="07:00" />
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-2">During quiet hours, only critical alerts will be sent</p>
              </div>
              
              <div className="border-t pt-6 flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance" className="mt-0">
            <div className="p-6 rounded-xl glass space-y-6">
              <h3 className="text-lg font-medium mb-4">Appearance Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Theme Preference</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 flex flex-col items-center hover:border-primary cursor-pointer">
                      <Sun className="h-8 w-8 mb-2" />
                      <span className="text-sm">Light Mode</span>
                    </div>
                    <div className="border rounded-lg p-4 flex flex-col items-center hover:border-primary cursor-pointer">
                      <Moon className="h-8 w-8 mb-2" />
                      <span className="text-sm">Dark Mode</span>
                    </div>
                    <div className="border rounded-lg p-4 flex flex-col items-center hover:border-primary cursor-pointer border-primary">
                      <Monitor className="h-8 w-8 mb-2" />
                      <span className="text-sm">System Default</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Color Accent</h4>
                  <div className="flex flex-wrap gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-600 cursor-pointer border-2 border-white"></div>
                    <div className="h-8 w-8 rounded-full bg-green-600 cursor-pointer"></div>
                    <div className="h-8 w-8 rounded-full bg-red-600 cursor-pointer"></div>
                    <div className="h-8 w-8 rounded-full bg-purple-600 cursor-pointer"></div>
                    <div className="h-8 w-8 rounded-full bg-amber-500 cursor-pointer"></div>
                    <div className="h-8 w-8 rounded-full bg-pink-600 cursor-pointer"></div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Accessibility</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Increased Contrast</p>
                        <p className="text-sm text-muted-foreground">Enhance visual distinction between elements</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Reduced Motion</p>
                        <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Larger Text</p>
                        <p className="text-sm text-muted-foreground">Increase default font size throughout the app</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6 flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Apply Changes
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="mt-0">
            <div className="p-6 rounded-xl glass space-y-6">
              <h3 className="text-lg font-medium mb-4">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">Password must be at least 12 characters and include uppercase, lowercase, numbers, and symbols</p>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-3">Two-Factor Authentication</h4>
                
                <div className="p-4 border border-primary/20 rounded-lg bg-primary/5 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Two-factor authentication is not enabled</p>
                      <p className="text-sm text-muted-foreground">Enable two-factor authentication for enhanced account security</p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline">Enable Two-Factor Authentication</Button>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-3">Session Management</h4>
                
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on Windows • IP: 192.168.1.1</p>
                        <p className="text-xs text-muted-foreground">Started 2 hours ago</p>
                      </div>
                      <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full h-fit">
                        Active
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-sm text-muted-foreground">iPhone • IP: 192.168.1.2</p>
                        <p className="text-xs text-muted-foreground">Last active 2 days ago</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 text-destructive">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6 flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Security Settings
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="system" className="mt-0">
            <div className="p-6 rounded-xl glass space-y-6">
              <h3 className="text-lg font-medium mb-4">System Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Automatic Data Refresh</p>
                    <p className="text-sm text-muted-foreground">Automatically update dashboard data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="refreshInterval">Refresh Interval (seconds)</Label>
                  <Input id="refreshInterval" type="number" defaultValue="30" min="5" max="300" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sound Alerts</p>
                    <p className="text-sm text-muted-foreground">Play sound when new alerts arrive</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Offline Mode</p>
                    <p className="text-sm text-muted-foreground">Cache data for offline access</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics Collection</p>
                    <p className="text-sm text-muted-foreground">Share anonymous usage data to improve the system</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-3">Data Management</h4>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full sm:w-auto">Export System Data</Button>
                  <Button variant="outline" className="w-full sm:w-auto">Import Configuration</Button>
                  <Button variant="outline" className="w-full sm:w-auto text-destructive">Clear Local Cache</Button>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-3">System Information</h4>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version</span>
                    <span>DisasterCtrl v2.5.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span>June 10, 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Server Status</span>
                    <span className="text-green-600">Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Database</span>
                    <span>Connected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">API Status</span>
                    <span>Operational</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6 flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save System Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
