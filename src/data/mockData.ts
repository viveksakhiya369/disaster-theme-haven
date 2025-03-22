
// Mock data for the disaster management dashboard

export const alertsData = [
  {
    id: "alert-1",
    title: "Flash Flood Warning",
    description: "Flash flooding reported in southern districts. Emergency response teams deployed.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    severity: "critical",
    read: false,
  },
  {
    id: "alert-2",
    title: "Evacuation Notice",
    description: "Voluntary evacuation order issued for coastal areas due to approaching storm.",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    severity: "high",
    read: false,
  },
  {
    id: "alert-3",
    title: "Road Closure",
    description: "Highway 101 closed due to landslide. Use alternate routes.",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    severity: "medium",
    read: true,
  },
  {
    id: "alert-4",
    title: "Weather Advisory",
    description: "Thunderstorms expected in the evening. Stay indoors if possible.",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    severity: "low",
    read: true,
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
