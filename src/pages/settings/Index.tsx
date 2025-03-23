
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  User, 
  Lock, 
  Globe, 
  Monitor, 
  Moon, 
  Sun, 
  Palette, 
  Save, 
  Type, 
  ZoomIn, 
  MousePointerClick, 
  EyeOff
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { 
    theme, 
    setTheme, 
    accentColor, 
    setAccentColor,
    fontSize,
    setFontSize,
    reducedMotion,
    setReducedMotion,
    highContrast,
    setHighContrast
  } = useTheme();
  
  const { toast } = useToast();
  
  const handleSaveAppearance = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your theme preferences have been updated.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    });
  };
  
  const handleSavePassword = () => {
    toast({
      title: "Security settings updated",
      description: "Your password has been changed successfully.",
    });
  };
  
  const handleSaveSystemSettings = () => {
    toast({
      title: "System settings saved",
      description: "Your system preferences have been updated.",
    });
  };
  
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
                  <Switch defaultChecked id="alert-notifications" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Incident Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified about changes to incidents</p>
                  </div>
                  <Switch defaultChecked id="incident-updates" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Resource Allocations</p>
                    <p className="text-sm text-muted-foreground">Receive notifications about resource changes</p>
                  </div>
                  <Switch defaultChecked id="resource-allocations" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified about system maintenance</p>
                  </div>
                  <Switch id="system-updates" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email copies of important notifications</p>
                  </div>
                  <Switch defaultChecked id="email-notifications" />
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
                <Button className="gap-2" onClick={handleSaveNotifications}>
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
                    <div 
                      className={`border rounded-lg p-4 flex flex-col items-center hover:border-primary cursor-pointer ${theme === 'light' ? 'border-primary' : ''}`}
                      onClick={() => setTheme('light')}
                    >
                      <Sun className="h-8 w-8 mb-2" />
                      <span className="text-sm">Light Mode</span>
                    </div>
                    <div 
                      className={`border rounded-lg p-4 flex flex-col items-center hover:border-primary cursor-pointer ${theme === 'dark' ? 'border-primary' : ''}`}
                      onClick={() => setTheme('dark')}
                    >
                      <Moon className="h-8 w-8 mb-2" />
                      <span className="text-sm">Dark Mode</span>
                    </div>
                    <div 
                      className={`border rounded-lg p-4 flex flex-col items-center hover:border-primary cursor-pointer ${theme === 'system' ? 'border-primary' : ''}`}
                      onClick={() => setTheme('system')}
                    >
                      <Monitor className="h-8 w-8 mb-2" />
                      <span className="text-sm">System Default</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Color Accent</h4>
                  <div className="flex flex-wrap gap-3">
                    <div 
                      className={`h-8 w-8 rounded-full bg-blue-600 cursor-pointer ${accentColor === 'blue' ? 'ring-2 ring-offset-2 ring-blue-600' : ''}`}
                      onClick={() => setAccentColor('blue')}
                    ></div>
                    <div 
                      className={`h-8 w-8 rounded-full bg-green-600 cursor-pointer ${accentColor === 'green' ? 'ring-2 ring-offset-2 ring-green-600' : ''}`}
                      onClick={() => setAccentColor('green')}
                    ></div>
                    <div 
                      className={`h-8 w-8 rounded-full bg-red-600 cursor-pointer ${accentColor === 'red' ? 'ring-2 ring-offset-2 ring-red-600' : ''}`}
                      onClick={() => setAccentColor('red')}
                    ></div>
                    <div 
                      className={`h-8 w-8 rounded-full bg-purple-600 cursor-pointer ${accentColor === 'purple' ? 'ring-2 ring-offset-2 ring-purple-600' : ''}`}
                      onClick={() => setAccentColor('purple')}
                    ></div>
                    <div 
                      className={`h-8 w-8 rounded-full bg-amber-500 cursor-pointer ${accentColor === 'amber' ? 'ring-2 ring-offset-2 ring-amber-500' : ''}`}
                      onClick={() => setAccentColor('amber')}
                    ></div>
                    <div 
                      className={`h-8 w-8 rounded-full bg-pink-600 cursor-pointer ${accentColor === 'pink' ? 'ring-2 ring-offset-2 ring-pink-600' : ''}`}
                      onClick={() => setAccentColor('pink')}
                    ></div>
                    <div 
                      className={`h-8 w-8 rounded-full bg-teal-600 cursor-pointer ${accentColor === 'teal' ? 'ring-2 ring-offset-2 ring-teal-600' : ''}`}
                      onClick={() => setAccentColor('teal')}
                    ></div>
                    <div 
                      className={`h-8 w-8 rounded-full bg-indigo-600 cursor-pointer ${accentColor === 'indigo' ? 'ring-2 ring-offset-2 ring-indigo-600' : ''}`}
                      onClick={() => setAccentColor('indigo')}
                    ></div>
                    <div 
                      className={`h-8 w-8 rounded-full bg-cyan-600 cursor-pointer ${accentColor === 'cyan' ? 'ring-2 ring-offset-2 ring-cyan-600' : ''}`}
                      onClick={() => setAccentColor('cyan')}
                    ></div>
                    <div 
                      className={`h-8 w-8 rounded-full bg-orange-600 cursor-pointer ${accentColor === 'orange' ? 'ring-2 ring-offset-2 ring-orange-600' : ''}`}
                      onClick={() => setAccentColor('orange')}
                    ></div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Text Size</h4>
                  <div className="flex gap-3">
                    <div 
                      className={`border rounded-lg p-4 flex flex-col items-center hover:border-primary cursor-pointer ${fontSize === 'normal' ? 'border-primary' : ''}`}
                      onClick={() => setFontSize('normal')}
                    >
                      <Type className="h-6 w-6 mb-2" />
                      <span className="text-sm">Normal</span>
                    </div>
                    <div 
                      className={`border rounded-lg p-4 flex flex-col items-center hover:border-primary cursor-pointer ${fontSize === 'large' ? 'border-primary' : ''}`}
                      onClick={() => setFontSize('large')}
                    >
                      <Type className="h-7 w-7 mb-2" />
                      <span className="text-sm">Large</span>
                    </div>
                    <div 
                      className={`border rounded-lg p-4 flex flex-col items-center hover:border-primary cursor-pointer ${fontSize === 'larger' ? 'border-primary' : ''}`}
                      onClick={() => setFontSize('larger')}
                    >
                      <Type className="h-8 w-8 mb-2" />
                      <span className="text-sm">Larger</span>
                    </div>
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
                      <Switch 
                        id="increased-contrast"
                        checked={highContrast}
                        onCheckedChange={setHighContrast}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Reduced Motion</p>
                        <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                      </div>
                      <Switch 
                        id="reduced-motion"
                        checked={reducedMotion}
                        onCheckedChange={setReducedMotion}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6 flex justify-end">
                <Button className="gap-2" onClick={handleSaveAppearance}>
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
              
              <div className="border-t pt-6 flex justify-end">
                <Button className="gap-2" onClick={handleSavePassword}>
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
                  <Switch defaultChecked id="auto-refresh" />
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
                  <Switch defaultChecked id="sound-alerts" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Offline Mode</p>
                    <p className="text-sm text-muted-foreground">Cache data for offline access</p>
                  </div>
                  <Switch defaultChecked id="offline-mode" />
                </div>
              </div>
              
              <div className="border-t pt-6 flex justify-end">
                <Button className="gap-2" onClick={handleSaveSystemSettings}>
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
