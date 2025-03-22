
// Mock data for the disaster management dashboard

export const alertsData = [
  {
    id: "alert-1",
    title: "Flash Flood Warning",
    description: "Flash flooding reported in southern districts. Emergency response teams deployed.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    severity: "critical",
    read: false,
    affectedAreas: ["Riverside County", "South District", "Millbrook", "East Valley"],
    population: 125000,
    reliefMeasures: [
      "3 emergency shelters established at local schools",
      "Rescue boats deployed to heavily flooded areas",
      "Emergency water pumps operating in South District",
      "National Guard activated for rescue operations"
    ],
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    id: "alert-2",
    title: "Evacuation Notice",
    description: "Voluntary evacuation order issued for coastal areas due to approaching storm.",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    severity: "high",
    read: false,
    affectedAreas: ["Coastal Boulevard", "Marina District", "Harbor View", "Bay Shore"],
    population: 75000,
    reliefMeasures: [
      "Evacuation centers open at Central High School and Community Center",
      "Public transportation running extended hours for evacuation",
      "Police conducting door-to-door notifications in vulnerable areas"
    ],
    lat: 25.7617,
    lng: -80.1918,
  },
  {
    id: "alert-3",
    title: "Road Closure",
    description: "Highway 101 closed due to landslide. Use alternate routes.",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    severity: "medium",
    read: true,
    affectedAreas: ["Highway 101 Mile 25-40", "Cliffside Community", "Woodland Heights"],
    population: 30000,
    reliefMeasures: [
      "Detour routes established through Routes 82 and 280",
      "Heavy equipment deployed for debris clearing",
      "Geological assessment team evaluating hillside stability"
    ],
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: "alert-4",
    title: "Weather Advisory",
    description: "Thunderstorms expected in the evening. Stay indoors if possible.",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    severity: "low",
    read: true,
    affectedAreas: ["Metro Area", "Northern Suburbs", "Downtown Core"],
    population: 250000,
    reliefMeasures: [
      "Utility crews on standby for power outages",
      "Storm drains being cleared to prevent localized flooding",
      "Public information campaign active on local media"
    ],
    lat: 40.7128,
    lng: -74.0060,
  },
];

export const incidentData = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 8 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 10 },
  { name: "Fri", value: 20 },
  { name: "Sat", value: 17 },
  { name: "Sun", value: 13 },
];

export const responseTimeData = [
  { name: "Mon", value: 28 },
  { name: "Tue", value: 22 },
  { name: "Wed", value: 24 },
  { name: "Thu", value: 18 },
  { name: "Fri", value: 15 },
  { name: "Sat", value: 19 },
  { name: "Sun", value: 21 },
];

export const resourceData = [
  { name: "Mon", value: 84 },
  { name: "Tue", value: 78 },
  { name: "Wed", value: 72 },
  { name: "Thu", value: 69 },
  { name: "Fri", value: 65 },
  { name: "Sat", value: 62 },
  { name: "Sun", value: 59 },
];
