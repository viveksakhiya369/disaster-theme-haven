
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search, 
  Download, 
  FileText, 
  Calendar, 
  Filter, 
  ArrowUpDown, 
  Eye, 
  ArrowUpRight, 
  FileIcon,
  AlertTriangle,
  Clock,
  Users,
  BarChart
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { incidentData, responseTimeData } from "@/data/mockData";
import StatisticsCard from "@/components/dashboard/StatisticsCard";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ReportsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("all");
  const [sorting, setSorting] = useState({ field: "created", direction: "desc" });
  const [searchQuery, setSearchQuery] = useState("");
  
  const mockReports = [
    {
      id: "RPT-2023-001",
      title: "Monthly Incident Summary - May 2023",
      type: "Monthly Summary",
      department: "Operations",
      author: "John Smith",
      created: "2023-06-05T14:30:00Z",
      status: "Published"
    },
    {
      id: "RPT-2023-002",
      title: "Resource Allocation Analysis Q2 2023",
      type: "Quarterly Analysis",
      department: "Resource Management",
      author: "Emily Johnson",
      created: "2023-06-02T09:15:00Z",
      status: "Published"
    },
    {
      id: "RPT-2023-003",
      title: "Response Time Performance Review",
      type: "Performance Review",
      department: "Emergency Services",
      author: "Michael Chen",
      created: "2023-05-28T17:45:00Z",
      status: "Published"
    },
    {
      id: "RPT-2023-004",
      title: "Downtown Building Fire - Incident Report",
      type: "Incident Report",
      department: "Fire Department",
      author: "Sarah Williams",
      created: "2023-06-10T20:30:00Z",
      status: "Draft"
    },
    {
      id: "RPT-2023-005",
      title: "Personnel Training Compliance Report",
      type: "Compliance Report",
      department: "HR & Training",
      author: "David Rodriguez",
      created: "2023-06-08T10:30:00Z",
      status: "In Review"
    },
    {
      id: "RPT-2023-006",
      title: "Annual Budget Forecast - FY 2023-2024",
      type: "Financial Report",
      department: "Finance",
      author: "Lisa Thompson",
      created: "2023-06-01T11:30:00Z",
      status: "In Review"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-green-500";
      case "Draft": return "bg-yellow-500";
      case "In Review": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };
  
  const handleExport = (reportId: string) => {
    toast({
      title: "Report Exported",
      description: `Report ${reportId} has been exported successfully.`,
    });
  };
  
  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    toast({
      title: "Filter Applied",
      description: `Showing ${filter} reports.`,
    });
  };
  
  const handleSort = (field: string) => {
    const newDirection = 
      sorting.field === field 
        ? (sorting.direction === "asc" ? "desc" : "asc") 
        : "asc";
    
    setSorting({ field, direction: newDirection });
    
    toast({
      title: "Sorting Applied",
      description: `Sorting by ${field} (${newDirection === "asc" ? "ascending" : "descending"})`,
    });
  };
  
  const filteredReports = mockReports
    .filter(report => {
      if (activeFilter === "all") return true;
      return report.type.toLowerCase().includes(activeFilter.toLowerCase());
    })
    .filter(report => {
      if (!searchQuery) return true;
      return (
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      const field = sorting.field;
      const direction = sorting.direction === "asc" ? 1 : -1;
      
      if (field === "created") {
        return direction * (new Date(a.created).getTime() - new Date(b.created).getTime());
      }
      
      // @ts-ignore
      return direction * (a[field] < b[field] ? -1 : 1);
    });

  return (
    <DashboardLayout>
      <Header 
        title="Reports Management" 
        subtitle="Generate and access incident and resource reports"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <StatisticsCard
            title="Incident Trend"
            subtitle="Daily incidents over the past week"
            data={incidentData}
            color="rgba(220, 38, 38, 0.8)"
          />
        </div>
        <div>
          <StatisticsCard
            title="Response Time"
            subtitle="Average response time (minutes)"
            data={responseTimeData}
            color="rgba(37, 99, 235, 0.8)"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all" onClick={() => handleFilter("all")}>All Reports</TabsTrigger>
              <TabsTrigger value="incidents" onClick={() => handleFilter("incident")}>Incident Reports</TabsTrigger>
              <TabsTrigger value="resources" onClick={() => handleFilter("resource")}>Resource Reports</TabsTrigger>
              <TabsTrigger value="personnel" onClick={() => handleFilter("personnel")}>Personnel Reports</TabsTrigger>
              <TabsTrigger value="performance" onClick={() => handleFilter("performance")}>Performance Reports</TabsTrigger>
            </TabsList>
            <Button className="gap-2" onClick={() => navigate("/reports/create")}>
              <Plus className="h-4 w-4" />
              Create Report
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="p-6 rounded-xl glass transition-all duration-300 ease-in-out">
              <div className="flex justify-between mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search reports..." 
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
                      <DropdownMenuItem onClick={() => handleFilter("all")}>
                        All Reports
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilter("published")}>
                        Published Only
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilter("draft")}>
                        Drafts Only
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilter("review")}>
                        In Review
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
                      <DropdownMenuItem onClick={() => handleSort("created")}>
                        Date {sorting.field === "created" && (sorting.direction === "asc" ? "↑" : "↓")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSort("title")}>
                        Title {sorting.field === "title" && (sorting.direction === "asc" ? "↑" : "↓")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSort("department")}>
                        Department {sorting.field === "department" && (sorting.direction === "asc" ? "↑" : "↓")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSort("status")}>
                        Status {sorting.field === "status" && (sorting.direction === "asc" ? "↑" : "↓")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 font-medium">Report ID</th>
                      <th className="pb-2 font-medium">Title</th>
                      <th className="pb-2 font-medium">Type</th>
                      <th className="pb-2 font-medium">Department</th>
                      <th className="pb-2 font-medium">Date</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="border-b hover:bg-accent/10">
                        <td className="py-3 text-sm font-mono">{report.id}</td>
                        <td className="py-3">
                          <div className="font-medium">{report.title}</div>
                          <div className="text-xs text-muted-foreground">
                            By {report.author}
                          </div>
                        </td>
                        <td className="py-3">{report.type}</td>
                        <td className="py-3">{report.department}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(report.created).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`${getStatusColor(report.status)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8">
                                  <Eye className="h-3.5 w-3.5 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle>{report.title}</DialogTitle>
                                  <DialogDescription>
                                    {report.id} • {report.department} • {new Date(report.created).toLocaleDateString()}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="flex items-start gap-4 border p-3 rounded-md bg-muted/50">
                                    <div className="bg-primary/10 p-2 rounded-md">
                                      <FileIcon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                      <h3 className="font-medium">Executive Summary</h3>
                                      <p className="text-sm text-muted-foreground">
                                        This report provides a comprehensive analysis of all incidents reported during May 2023, 
                                        including response times, resource allocation, and outcome metrics.
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="border p-3 rounded-md">
                                      <div className="flex items-center gap-2 text-sm mb-1 text-muted-foreground">
                                        <AlertTriangle className="h-4 w-4" />
                                        <span>Incident Statistics</span>
                                      </div>
                                      <div className="text-2xl font-bold">48</div>
                                      <div className="text-xs text-green-600 flex items-center gap-1">
                                        <ArrowUpRight className="h-3 w-3" />
                                        5% decrease from previous month
                                      </div>
                                    </div>
                                    
                                    <div className="border p-3 rounded-md">
                                      <div className="flex items-center gap-2 text-sm mb-1 text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>Avg. Response Time</span>
                                      </div>
                                      <div className="text-2xl font-bold">8.2 min</div>
                                      <div className="text-xs text-green-600 flex items-center gap-1">
                                        <ArrowUpRight className="h-3 w-3" />
                                        12% improvement 
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="border-t pt-4 mt-4">
                                    <h3 className="font-medium mb-2">Key Findings</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                      <li>Response time improved by 12% compared to the previous month</li>
                                      <li>Resource utilization rate increased to 78%</li>
                                      <li>Three major incidents required multi-agency response</li>
                                      <li>Personnel deployment was optimized, reducing overtime by 15%</li>
                                    </ul>
                                  </div>
                                  
                                  <div className="border-t pt-4 mt-4">
                                    <h3 className="font-medium mb-2">Recommendations</h3>
                                    <p className="text-sm text-muted-foreground">
                                      Based on this month's data, we recommend implementing additional training for 
                                      new response protocols, reviewing resource allocation during peak hours, and 
                                      improving coordination with neighboring jurisdictions for major incidents.
                                    </p>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <Button variant="outline" onClick={() => handleExport(report.id)}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                  </Button>
                                  <Button>Close</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm" className="h-8" onClick={() => handleExport(report.id)}>
                              <Download className="h-3.5 w-3.5 mr-1" />
                              Export
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
          
          <TabsContent value="incidents" className="mt-0">
            <div className="p-6 rounded-xl glass">
              <div className="flex items-center justify-center py-12 flex-col">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Incident Reports</h3>
                <p className="text-muted-foreground mb-6">Create and manage detailed incident reports</p>
                <Button variant="outline" onClick={() => navigate("/reports/create")}>Create Incident Report</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-0">
            <div className="p-6 rounded-xl glass">
              <div className="flex items-center justify-center py-12 flex-col">
                <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Resource Reports</h3>
                <p className="text-muted-foreground mb-6">Track and analyze resource allocation and utilization</p>
                <Button variant="outline" onClick={() => navigate("/reports/create")}>Create Resource Report</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="personnel" className="mt-0">
            <div className="p-6 rounded-xl glass">
              <div className="flex items-center justify-center py-12 flex-col">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Personnel Reports</h3>
                <p className="text-muted-foreground mb-6">Manage staff deployments and training compliance</p>
                <Button variant="outline" onClick={() => navigate("/reports/create")}>Create Personnel Report</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="mt-0">
            <div className="p-6 rounded-xl glass">
              <div className="flex items-center justify-center py-12 flex-col">
                <BarChart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Performance Reports</h3>
                <p className="text-muted-foreground mb-6">Analyze key metrics and response effectiveness</p>
                <Button variant="outline" onClick={() => navigate("/reports/create")}>Create Performance Report</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Report Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="border rounded-lg p-3 hover:border-primary/50 hover:bg-accent/20 transition-colors cursor-pointer">
              <div className="flex items-center justify-center h-12 w-12 bg-red-100 text-red-800 rounded-lg mb-2">
                <FileText className="h-6 w-6" />
              </div>
              <h4 className="font-medium">Incident Report</h4>
              <p className="text-xs text-muted-foreground mb-3">Standard template for documenting incidents</p>
              <Button variant="ghost" size="sm" className="w-full gap-1" onClick={() => navigate("/reports/create")}>
                <Plus className="h-3.5 w-3.5" />
                Create
              </Button>
            </div>
            
            <div className="border rounded-lg p-3 hover:border-primary/50 hover:bg-accent/20 transition-colors cursor-pointer">
              <div className="flex items-center justify-center h-12 w-12 bg-blue-100 text-blue-800 rounded-lg mb-2">
                <FileText className="h-6 w-6" />
              </div>
              <h4 className="font-medium">Resource Status</h4>
              <p className="text-xs text-muted-foreground mb-3">Template for resource allocation reports</p>
              <Button variant="ghost" size="sm" className="w-full gap-1" onClick={() => navigate("/reports/create")}>
                <Plus className="h-3.5 w-3.5" />
                Create
              </Button>
            </div>
            
            <div className="border rounded-lg p-3 hover:border-primary/50 hover:bg-accent/20 transition-colors cursor-pointer">
              <div className="flex items-center justify-center h-12 w-12 bg-green-100 text-green-800 rounded-lg mb-2">
                <FileText className="h-6 w-6" />
              </div>
              <h4 className="font-medium">Situation Report</h4>
              <p className="text-xs text-muted-foreground mb-3">For ongoing emergency situations</p>
              <Button variant="ghost" size="sm" className="w-full gap-1" onClick={() => navigate("/reports/create")}>
                <Plus className="h-3.5 w-3.5" />
                Create
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Report Analytics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Incidents</span>
              <div className="flex items-center gap-1 text-green-600">
                <span className="font-medium">24</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Resources</span>
              <div className="flex items-center gap-1 text-red-600">
                <span className="font-medium">12</span>
                <ArrowUpRight className="h-4 w-4 transform rotate-90" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Personnel</span>
              <div className="flex items-center gap-1 text-green-600">
                <span className="font-medium">18</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Performance</span>
              <div className="flex items-center gap-1 text-green-600">
                <span className="font-medium">9</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            <div className="border-t pt-3 mt-4">
              <div className="text-sm text-muted-foreground">Total reports this month</div>
              <div className="text-2xl font-bold">63</div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                23% increase from last month
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
