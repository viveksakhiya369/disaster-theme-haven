
import React, { useState } from 'react';
import { AlertTriangle, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import DisasterMap from './DisasterMap';
import { alertsData } from "@/data/mockData";

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
    </div>
  );
};

export default SimplifiedMap;
