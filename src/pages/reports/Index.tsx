
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpDown, 
  Download, 
  FileText, 
  Filter, 
  Grid, 
  List, 
  MoreHorizontal, 
  Plus, 
  Search,
  Shield, 
  Users,
  BarChart,
  Calendar
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

// Mock reports data
const reportData = [
  {
    id: "1",
    title: "Daily Incident Summary",
    type: "incidents",
    author: "Admin User",
    created: new Date("2023-05-28T09:30:00"),
    status: "published",
    summary: "Summary of all incidents that occurred in the last 24 hours",
  },
  {
    id: "2",
    title: "Weekly Resource Allocation",
    type: "resources",
    author: "Resource Manager",
    created: new Date("2023-05-24T14:15:00"),
    status: "published",
    summary: "Overview of resource allocation for the week of May 22-28",
  },
  {
    id: "3",
    title: "Monthly Performance Metrics",
    type: "performance",
    author: "Operations Director",
    created: new Date("2023-05-01T11:00:00"),
    status: "published",
    summary: "Key performance indicators for the month of April",
  },
  {
    id: "4",
    title: "Personnel Training Completion",
    type: "personnel",
    author: "Training Coordinator",
    created: new Date("2023-05-15T16:45:00"),
    status: "published",
    summary: "Training completion rates for all personnel",
  },
  {
    id: "5",
    title: "Quarterly Emergency Response Times",
    type: "performance",
    author: "Data Analyst",
    created: new Date("2023-04-01T10:30:00"),
    status: "published",
    summary: "Analysis of emergency response times for Q1 2023",
  },
  {
    id: "6",
    title: "Draft: Resource Needs Assessment",
    type: "resources",
    author: "Planning Team",
    created: new Date("2023-05-29T15:30:00"),
    status: "draft",
    summary: "Assessment of resource needs for upcoming hurricane season",
  },
  {
    id: "7",
    title: "Post-Incident Analysis",
    type: "incidents",
    author: "Incident Commander",
    created: new Date("2023-05-20T08:15:00"),
    status: "published",
    summary: "Detailed analysis of the major flooding incident on May 15-18",
  },
  {
    id: "8",
    title: "Draft: Personnel Deployment Strategy",
    type: "personnel",
    author: "Operations Manager",
    created: new Date("2023-05-28T17:00:00"),
    status: "draft",
    summary: "Strategy for personnel deployment during multiple simultaneous incidents",
  },
];

const ReportsPage = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState(reportData);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  
  // Filter reports based on search, type, and status
  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         report.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || report.type === typeFilter;
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const handleExport = (id: string) => {
    toast.success("Report exported successfully");
  };
  
  const handleDelete = (id: string) => {
    setReports(reports.filter(report => report.id !== id));
    toast.success("Report deleted successfully");
  };
  
  const handleCreateReport = () => {
    navigate("/reports/create");
  };
  
  // Helper function to get icon based on report type
  const getReportIcon = (type: string) => {
    switch (type) {
      case "incidents":
        return <FileText className="h-5 w-5" />;
      case "resources":
        return <Shield className="h-5 w-5" />;
      case "personnel":
        return <Users className="h-5 w-5" />;
      case "performance":
        return <BarChart className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  // Helper function to get badge color based on report type
  const getReportBadgeStyle = (type: string) => {
    switch (type) {
      case "incidents":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      case "resources":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "personnel":
        return "bg-info/10 text-info hover:bg-info/20";
      case "performance":
        return "bg-primary/10 text-primary hover:bg-primary/20";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };
  
  return (
    <DashboardLayout>
      <Header 
        title="Reports & Analysis" 
        subtitle="View, create, and export system reports"
      />
      
      <div className="mb-6">
        <Tabs defaultValue="all-reports" className="w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="all-reports">All Reports</TabsTrigger>
              <TabsTrigger value="incident-reports">Incident</TabsTrigger>
              <TabsTrigger value="resource-reports">Resource</TabsTrigger>
              <TabsTrigger value="personnel-reports">Personnel</TabsTrigger>
              <TabsTrigger value="performance-reports">Performance</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-secondary" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-secondary" : ""}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => toast.success("Reports exported successfully")}
              >
                <Download className="h-4 w-4" />
                Export All
              </Button>
              <Button className="gap-2" onClick={handleCreateReport}>
                <Plus className="h-4 w-4" />
                Create Report
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={typeFilter}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="incidents">Incidents</SelectItem>
                  <SelectItem value="resources">Resources</SelectItem>
                  <SelectItem value="personnel">Personnel</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="all-reports">
            {viewMode === "list" ? (
              <div className="p-6 rounded-xl glass">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>
                        <Button variant="ghost" className="gap-1 p-0 h-auto font-medium" onClick={() => {
                          setReports([...reports].sort((a, b) => a.created.getTime() - b.created.getTime()));
                        }}>
                          Date <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No reports found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${getReportBadgeStyle(report.type)}`}>
                                {getReportIcon(report.type)}
                              </div>
                              <div>
                                <div className="font-medium">{report.title}</div>
                                <div className="text-sm text-muted-foreground line-clamp-1">{report.summary}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getReportBadgeStyle(report.type)}>
                              {report.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.author}</TableCell>
                          <TableCell>{format(report.created, "PPP")}</TableCell>
                          <TableCell>
                            <Badge variant={report.status === "published" ? "default" : "secondary"}>
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => navigate(`/reports/${report.id}`)}>
                                  View Report
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleExport(report.id)}>
                                  Export
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDelete(report.id)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.length === 0 ? (
                  <div className="col-span-full p-6 rounded-xl glass text-center text-muted-foreground">
                    No reports found
                  </div>
                ) : (
                  filteredReports.map((report) => (
                    <Card key={report.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className={getReportBadgeStyle(report.type)}>
                            {report.type}
                          </Badge>
                          <Badge variant={report.status === "published" ? "default" : "secondary"}>
                            {report.status}
                          </Badge>
                        </div>
                        <CardTitle className="mt-2">{report.title}</CardTitle>
                        <CardDescription>
                          By {report.author} • {format(report.created, "PPP")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{report.summary}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2 border-t">
                        <Button variant="ghost" className="text-xs h-8" onClick={() => navigate(`/reports/${report.id}`)}>
                          View Report
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleExport(report.id)}>
                              Export
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(report.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="incident-reports">
            <div className="p-6 rounded-xl glass">
              <h3 className="text-lg font-medium mb-4">Incident Reports</h3>
              <p>View reports related to emergency incidents, response times, and outcomes.</p>
              
              <div className="mt-6 space-y-4">
                {filteredReports
                  .filter(report => report.type === "incidents")
                  .map(report => (
                    <div key={report.id} className="flex justify-between p-4 border rounded-lg bg-card">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">{format(report.created, "PPP")}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1" onClick={() => handleExport(report.id)}>
                        <Download className="h-3.5 w-3.5" />
                        Export
                      </Button>
                    </div>
                  ))}
                
                {filteredReports.filter(report => report.type === "incidents").length === 0 && (
                  <p className="text-center text-muted-foreground p-6">No incident reports found</p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resource-reports">
            <div className="p-6 rounded-xl glass">
              <h3 className="text-lg font-medium mb-4">Resource Reports</h3>
              <p>View reports on resource allocation, usage, and availability.</p>
              
              <div className="mt-6 space-y-4">
                {filteredReports
                  .filter(report => report.type === "resources")
                  .map(report => (
                    <div key={report.id} className="flex justify-between p-4 border rounded-lg bg-card">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-warning/10 text-warning">
                          <Shield className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">{format(report.created, "PPP")}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1" onClick={() => handleExport(report.id)}>
                        <Download className="h-3.5 w-3.5" />
                        Export
                      </Button>
                    </div>
                  ))}
                
                {filteredReports.filter(report => report.type === "resources").length === 0 && (
                  <p className="text-center text-muted-foreground p-6">No resource reports found</p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="personnel-reports">
            <div className="p-6 rounded-xl glass">
              <h3 className="text-lg font-medium mb-4">Personnel Reports</h3>
              <p>View reports on personnel deployment, training, and performance.</p>
              
              <div className="mt-6 space-y-4">
                {filteredReports
                  .filter(report => report.type === "personnel")
                  .map(report => (
                    <div key={report.id} className="flex justify-between p-4 border rounded-lg bg-card">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-info/10 text-info">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">{format(report.created, "PPP")}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1" onClick={() => handleExport(report.id)}>
                        <Download className="h-3.5 w-3.5" />
                        Export
                      </Button>
                    </div>
                  ))}
                
                {filteredReports.filter(report => report.type === "personnel").length === 0 && (
                  <p className="text-center text-muted-foreground p-6">No personnel reports found</p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="performance-reports">
            <div className="p-6 rounded-xl glass">
              <h3 className="text-lg font-medium mb-4">Performance Reports</h3>
              <p>View reports on system performance, metrics, and analytics.</p>
              
              <div className="mt-6 space-y-4">
                {filteredReports
                  .filter(report => report.type === "performance")
                  .map(report => (
                    <div key={report.id} className="flex justify-between p-4 border rounded-lg bg-card">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <BarChart className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">{format(report.created, "PPP")}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1" onClick={() => handleExport(report.id)}>
                        <Download className="h-3.5 w-3.5" />
                        Export
                      </Button>
                    </div>
                  ))}
                
                {filteredReports.filter(report => report.type === "performance").length === 0 && (
                  <p className="text-center text-muted-foreground p-6">No performance reports found</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
