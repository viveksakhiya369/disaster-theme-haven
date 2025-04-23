
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface HelpRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  status: "pending" | "help_sent" | "team_on_way" | "closed";
  timestamp: string;
  priority: "high" | "medium" | "low";
}

const mockRequests: HelpRequest[] = [
  {
    id: "REQ-001",
    title: "Medical Emergency",
    description: "Person needs immediate medical attention",
    location: "123 Main St",
    status: "pending",
    timestamp: "2024-04-23T10:30:00Z",
    priority: "high",
  },
  {
    id: "REQ-002",
    title: "Fire Outbreak",
    description: "Small fire in kitchen",
    location: "456 Oak Ave",
    status: "team_on_way",
    timestamp: "2024-04-23T11:15:00Z",
    priority: "high",
  },
  {
    id: "REQ-003",
    title: "Flood Assistance",
    description: "Need help with sandbags",
    location: "789 River Rd",
    status: "help_sent",
    timestamp: "2024-04-23T09:45:00Z",
    priority: "medium",
  },
];

const DepartmentDashboard = () => {
  const [requests, setRequests] = useState<HelpRequest[]>(mockRequests);

  const updateRequestStatus = (requestId: string, newStatus: HelpRequest["status"]) => {
    setRequests(prev =>
      prev.map(request =>
        request.id === requestId
          ? { ...request, status: newStatus }
          : request
      )
    );

    const statusMessages = {
      help_sent: "Help has been sent",
      team_on_way: "Team is on the way",
      closed: "Request has been closed"
    };

    toast.success(statusMessages[newStatus] || "Status updated successfully");
  };

  const getStatusBadge = (status: HelpRequest["status"]) => {
    const statusStyles = {
      pending: "bg-yellow-500",
      help_sent: "bg-blue-500",
      team_on_way: "bg-green-500",
      closed: "bg-gray-500"
    };

    return (
      <Badge className={`${statusStyles[status]} text-white`}>
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: HelpRequest["priority"]) => {
    const priorityStyles = {
      high: "bg-red-500",
      medium: "bg-orange-500",
      low: "bg-blue-500"
    };

    return (
      <Badge className={`${priorityStyles[priority]} text-white`}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <Header
        title="Department Dashboard"
        subtitle="Manage and respond to help requests"
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg glass">
            <h3 className="font-semibold mb-2">Active Requests</h3>
            <p className="text-2xl font-bold">
              {requests.filter(r => r.status !== "closed").length}
            </p>
          </div>
          <div className="p-4 rounded-lg glass">
            <h3 className="font-semibold mb-2">Teams Deployed</h3>
            <p className="text-2xl font-bold">
              {requests.filter(r => r.status === "team_on_way").length}
            </p>
          </div>
          <div className="p-4 rounded-lg glass">
            <h3 className="font-semibold mb-2">Completed Today</h3>
            <p className="text-2xl font-bold">
              {requests.filter(r => r.status === "closed").length}
            </p>
          </div>
        </div>

        <div className="rounded-lg glass">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Help Requests</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-mono">{request.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {request.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{request.location}</TableCell>
                    <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {new Date(request.timestamp).toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {request.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => updateRequestStatus(request.id, "help_sent")}
                          >
                            <ArrowRight className="h-4 w-4 mr-1" />
                            Send Help
                          </Button>
                        )}
                        {request.status === "help_sent" && (
                          <Button
                            size="sm"
                            onClick={() => updateRequestStatus(request.id, "team_on_way")}
                          >
                            <Users className="h-4 w-4 mr-1" />
                            Team on Way
                          </Button>
                        )}
                        {(request.status === "team_on_way" || request.status === "help_sent") && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateRequestStatus(request.id, "closed")}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Close
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DepartmentDashboard;
