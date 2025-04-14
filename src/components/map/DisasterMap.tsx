
import React, { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

interface AlertLocation {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  lat: number;
  lng: number;
  timestamp: Date;
}

interface DisasterMapProps {
  alerts: AlertLocation[];
  onMarkerClick: (alert: AlertLocation) => void;
  selectedAlert: AlertLocation | null;
}

// Map container style
const containerStyle = {
  width: '100%',
  height: '100%'
};

// Default center position (can be adjusted)
const defaultCenter = {
  lat: 20, // Center on world view
  lng: 0
};

const mapOptions = {
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: true,
  zoomControl: true,
};

const DisasterMap: React.FC<DisasterMapProps> = ({ alerts, onMarkerClick, selectedAlert }) => {
  const [activeInfoWindow, setActiveInfoWindow] = useState<string | null>(null);
  
  // Load the Google Maps JavaScript API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'YOUR_API_KEY' // Replace with your actual API key
  });

  const severityColorMap = {
    critical: "#EF4444", // Red
    high: "#F97316",     // Orange
    medium: "#3B82F6",   // Blue
    low: "#10B981",      // Green
  };

  // Handle marker click
  const handleMarkerClick = (alert: AlertLocation) => {
    onMarkerClick(alert);
    setActiveInfoWindow(alert.id);
  };

  // Close info window
  const handleInfoWindowClose = () => {
    setActiveInfoWindow(null);
  };

  // Create marker icon based on severity
  const getMarkerIcon = (severity: string) => {
    return {
      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
      fillColor: severityColorMap[severity as keyof typeof severityColorMap],
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: "#FFFFFF",
      scale: 1.5,
    };
  };

  return (
    <div className="w-full h-[70vh] rounded-xl overflow-hidden relative bg-zinc-100 dark:bg-zinc-800">
      {!isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Loading map...</p>
          </div>
        </div>
      ) : (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={selectedAlert ? { lat: selectedAlert.lat, lng: selectedAlert.lng } : defaultCenter}
            zoom={selectedAlert ? 8 : 2}
            options={mapOptions}
          >
            {/* Render alert markers */}
            {alerts.map((alert) => (
              <Marker
                key={alert.id}
                position={{ lat: alert.lat, lng: alert.lng }}
                onClick={() => handleMarkerClick(alert)}
                icon={getMarkerIcon(alert.severity)}
                animation={selectedAlert?.id === alert.id ? window.google.maps.Animation.BOUNCE : undefined}
              >
                {activeInfoWindow === alert.id && (
                  <InfoWindow onCloseClick={handleInfoWindowClose}>
                    <div className="p-2 max-w-xs">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <p className="text-xs text-gray-700 mt-1">{alert.description.substring(0, 100)}...</p>
                      <div className="mt-2 flex items-center">
                        <AlertTriangle className={cn(
                          "h-3 w-3 mr-1",
                          `text-[${severityColorMap[alert.severity]}]`
                        )} />
                        <span className="text-xs capitalize">{alert.severity}</span>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
          
          {/* Legend */}
          <div className="absolute left-4 bottom-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg">
            <h4 className="text-sm font-medium mb-2">Legend</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span>Critical Alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span>High Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-info" />
                <span>Medium Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-success" />
                <span>Low Priority</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DisasterMap;
