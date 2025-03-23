
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Clock, MapPin, Users } from "lucide-react";

interface Incident {
  id: string;
  title: string;
  type: string;
  severity: string;
  location: string;
  status: string;
  timestamp: string;
  responders: number;
  description?: string;
}

interface IncidentDetailsProps {
  incident: Incident | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const IncidentDetails = ({ incident, open, onOpenChange }: IncidentDetailsProps) => {
  if (!incident) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-500";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-red-500";
      case "Monitoring": return "bg-orange-500";
      case "Resolved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>{incident.title}</DialogTitle>
            <Badge className={`${getSeverityColor(incident.severity)} text-white`}>
              {incident.severity}
            </Badge>
          </div>
          <DialogDescription>
            Reported {formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">ID</h4>
              <p className="text-sm font-mono">{incident.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Type</h4>
              <p className="text-sm">{incident.type}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Status</h4>
              <span className={`${getStatusColor(incident.status)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                {incident.status}
              </span>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Responders</h4>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{incident.responders} assigned</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-1">Location</h4>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <p className="text-sm">{incident.location}</p>
            </div>
          </div>

          {incident.description && (
            <div>
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm text-muted-foreground">{incident.description}</p>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium mb-1">Timeline</h4>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <p className="text-sm">{new Date(incident.timestamp).toLocaleString()}</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
            <Button>Assign Responders</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IncidentDetails;
