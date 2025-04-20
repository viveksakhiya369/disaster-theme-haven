
import React, { useState } from 'react';
import { AlertTriangle, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import DisasterMap from './DisasterMap';
import { alertsData } from "@/data/mockData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from 'date-fns';
import { Users } from 'lucide-react';

const SimplifiedMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  const handleMarkerClick = (alert: any) => {
    setSelectedAlert(alert);
  };

  const filteredAlerts = alertsData.filter(alert => 
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-[600px] relative">
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search locations..." 
            className="pl-8 bg-background/95 backdrop-blur"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <DisasterMap 
        alerts={filteredAlerts} 
        onMarkerClick={handleMarkerClick} 
        selectedAlert={selectedAlert}
      />

      {selectedAlert && (
        <div className="absolute left-4 top-20 w-80 z-10">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="affected">Affected Areas</TabsTrigger>
              <TabsTrigger value="relief">Relief</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <Alert className={cn(
                "shadow-lg border-l-4",
                selectedAlert.severity === "critical" && "border-l-destructive",
                selectedAlert.severity === "high" && "border-l-warning",
                selectedAlert.severity === "medium" && "border-l-info",
                selectedAlert.severity === "low" && "border-l-success"
              )}>
                <AlertTriangle className={cn(
                  "h-4 w-4",
                  selectedAlert.severity === "critical" && "text-destructive",
                  selectedAlert.severity === "high" && "text-warning",
                  selectedAlert.severity === "medium" && "text-info",
                  selectedAlert.severity === "low" && "text-success"
                )} />
                <AlertTitle className="font-semibold">{selectedAlert.title}</AlertTitle>
                <AlertDescription>
                  {selectedAlert.description}
                  <div className="mt-2 flex gap-2 items-center">
                    <Badge className={cn(
                      selectedAlert.severity === "critical" && "bg-destructive text-destructive-foreground",
                      selectedAlert.severity === "high" && "bg-warning text-warning-foreground",
                      selectedAlert.severity === "medium" && "bg-info text-info-foreground",
                      selectedAlert.severity === "low" && "bg-success text-success-foreground"
                    )}>
                      {selectedAlert.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(selectedAlert.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="affected" className="mt-0">
              <Alert className="shadow-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <AlertTitle className="font-semibold">Affected Areas</AlertTitle>
                </div>
                <AlertDescription>
                  {selectedAlert.population && (
                    <div className="mt-2 mb-3">
                      <Badge variant="outline" className="bg-background text-foreground">
                        Est. <span className="font-semibold">{selectedAlert.population.toLocaleString()}</span> people affected
                      </Badge>
                    </div>
                  )}
                  
                  {selectedAlert.affectedAreas && selectedAlert.affectedAreas.length > 0 ? (
                    <div className="space-y-2">
                      {selectedAlert.affectedAreas.map((area: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <AlertTriangle className="h-3 w-3 text-muted-foreground" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No specific areas reported</p>
                  )}
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default SimplifiedMap;

