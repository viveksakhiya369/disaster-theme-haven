
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Search, Layers, Compass, Maximize, ZoomIn, ZoomOut, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

const MapViewPage = () => {
  return (
    <DashboardLayout>
      <Header 
        title="Map View" 
        subtitle="Visualize incidents and resources on the map"
      />
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-72">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search location..." 
              className="pl-8"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Layers className="h-4 w-4 mr-2" />
              Layers
            </Button>
            <Button variant="outline" size="sm">
              <Compass className="h-4 w-4 mr-2" />
              Navigate
            </Button>
            <Button variant="outline" size="sm">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          {/* This is a placeholder for the map - in a real application, you'd integrate a mapping library like Leaflet or Google Maps */}
          <div className="w-full h-[70vh] bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-lg">
              Interactive Map View
              <br />
              (Map integration would be implemented here)
            </div>
            
            {/* Sample incident markers */}
            <div className="absolute top-1/3 left-1/4 text-red-500 animate-pulse">
              <MapPin className="h-8 w-8" />
            </div>
            <div className="absolute top-1/2 left-1/2 text-orange-500 animate-pulse">
              <MapPin className="h-8 w-8" />
            </div>
            <div className="absolute bottom-1/3 right-1/4 text-blue-500 animate-pulse">
              <MapPin className="h-8 w-8" />
            </div>
            
            {/* Map controls */}
            <div className="absolute right-4 bottom-4 flex flex-col gap-2">
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full shadow-lg">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full shadow-lg">
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Legend */}
            <div className="absolute left-4 bottom-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg">
              <h4 className="text-sm font-medium mb-2">Legend</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Critical Incidents</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>Active Incidents</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Response Teams</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Nearby Incidents</h3>
          <div className="space-y-3">
            <div className="flex gap-3 items-start border-b pb-3">
              <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium">Building Fire - Downtown</p>
                <p className="text-sm text-muted-foreground">0.8 miles away • Critical</p>
              </div>
            </div>
            <div className="flex gap-3 items-start border-b pb-3">
              <MapPin className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <p className="font-medium">Traffic Accident - Highway 101</p>
                <p className="text-sm text-muted-foreground">1.2 miles away • High</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium">Power Outage - North Suburb</p>
                <p className="text-sm text-muted-foreground">2.5 miles away • Medium</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Response Teams</h3>
          <div className="space-y-3">
            <div className="flex gap-3 items-start border-b pb-3">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">
                FD
              </div>
              <div>
                <p className="font-medium">Fire Department Team A</p>
                <p className="text-sm text-muted-foreground">4 units • En route to Downtown</p>
              </div>
            </div>
            <div className="flex gap-3 items-start border-b pb-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                PD
              </div>
              <div>
                <p className="font-medium">Police Department Unit 5</p>
                <p className="text-sm text-muted-foreground">2 units • On scene at Highway 101</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-medium">
                EM
              </div>
              <div>
                <p className="font-medium">Emergency Medical Team C</p>
                <p className="text-sm text-muted-foreground">1 unit • Standing by</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-xl glass">
          <h3 className="text-lg font-medium mb-3">Resources</h3>
          <div className="space-y-3">
            <div className="flex gap-3 items-start border-b pb-3">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-medium">
                F
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">Fire Trucks</p>
                  <p className="font-medium">6/10</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-start border-b pb-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                A
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">Ambulances</p>
                  <p className="font-medium">8/12</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">
                H
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">Helicopters</p>
                  <p className="font-medium">1/2</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapViewPage;
