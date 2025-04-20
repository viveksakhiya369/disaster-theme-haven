
import React from 'react';
import SimplifiedMap from '@/components/map/SimplifiedMap';

const MapView = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Disaster Alert Map</h1>
      <SimplifiedMap />
    </div>
  );
};

export default MapView;
