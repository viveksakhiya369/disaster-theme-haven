
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, FileText, Image, Paperclip, Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const CreateReportPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reportType, setReportType] = useState("incident");
  
  const handleSaveDraft = () => {
    toast({
      title: "Report saved as draft",
      description: "Your report has been saved and can be edited later.",
    });
  };
  
  const handlePublish = () => {
    toast({
      title: "Report published successfully",
      description: "Your report is now available in the reports section.",
    });
    navigate("/reports");
  };

  return (
    <DashboardLayout>
      <Header 
        title="Create Report" 
        subtitle="Generate a new report from incident data"
      />
      
      <div className="mb-4 flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate("/reports")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Reports
        </Button>
      </div>
      
      <div className="glass p-6 rounded-xl mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reportTitle">Report Title</Label>
              <Input id="reportTitle" placeholder="Enter report title" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select defaultValue={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incident">Incident Report</SelectItem>
                  <SelectItem value="resource">Resource Report</SelectItem>
                  <SelectItem value="personnel">Personnel Report</SelectItem>
                  <SelectItem value="performance">Performance Report</SelectItem>
                  <SelectItem value="situation">Situation Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select defaultValue="operations">
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="fire">Fire Department</SelectItem>
                  <SelectItem value="police">Police</SelectItem>
                  <SelectItem value="rescue">Search & Rescue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timeframe">Time Period</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input type="date" id="startDate" />
                <Input type="date" id="endDate" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="visibility">Visibility</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="department">Department Only</SelectItem>
                  <SelectItem value="management">Management Only</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select defaultValue="normal">
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="content" className="mt-6">
          <TabsList>
            <TabsTrigger value="content">Report Content</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="summary">Executive Summary</Label>
              <Textarea id="summary" placeholder="Brief overview of the report" className="min-h-[100px]" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="content">Report Content</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Templates
                  </Button>
                </div>
              </div>
              <Textarea id="content" placeholder="Detailed report content" className="min-h-[300px]" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="conclusion">Conclusion & Recommendations</Label>
              <Textarea id="conclusion" placeholder="Summarize findings and recommendations" className="min-h-[100px]" />
            </div>
          </TabsContent>
          
          <TabsContent value="attachments" className="mt-4">
            <div className="border-2 border-dashed rounded-lg p-10 text-center">
              <div className="flex flex-col items-center">
                <Paperclip className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-lg font-medium mb-1">Drop files to attach</p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                <Button>
                  <Image className="h-4 w-4 mr-2" />
                  Browse Files
                </Button>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Attached Files</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>incident-photo-1.jpg</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>resource-data.xlsx</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-4">
            <div className="p-6 border rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Incident Response Report</h3>
              <p className="text-muted-foreground mb-4">Created by Admin User • Draft</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium">Executive Summary</h4>
                  <p>This report contains a comprehensive analysis of the recent incident response...</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium">Key Findings</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Response time averaged 8.5 minutes across all units</li>
                    <li>Resource allocation was optimized during peak demand</li>
                    <li>Communication protocols were followed effectively</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium">Recommendations</h4>
                  <p>Based on the analysis, we recommend implementing additional training for...</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">Note: This is a preview. The final report may look different when published.</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-6 mt-6 flex justify-between">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/reports")}>Cancel</Button>
            <Button onClick={handlePublish}>Publish Report</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateReportPage;
