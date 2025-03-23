import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { Property } from '../lib/strapi';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
// This is needed because the default icons reference assets that aren't properly bundled
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface PropertyMapProps {
  properties: Property[];
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties }) => {
  const navigate = useNavigate();
  
  // Calculate center of the map based on property coordinates
  const getMapCenter = () => {
    if (properties.length === 0) {
      // Default to Turin, Italy if no properties
      return [45.0703, 7.6869]; // Turin coordinates
    }

    // Filter properties with valid coordinates
    const validProperties = properties.filter(
      (property) => property.Coordinate_LATITUDINE && property.Coordinate_LONGITUDINE
    );

    if (validProperties.length === 0) {
      return [45.0703, 7.6869]; // Turin coordinates
    }

    // Calculate the average of all coordinates
    const sumLat = validProperties.reduce(
      (sum, property) => sum + property.Coordinate_LONGITUDINE,
      0
    );
    const sumLng = validProperties.reduce(
      (sum, property) => sum + property.Coordinate_LATITUDINE,
      0
    );

    return [sumLat / validProperties.length, sumLng / validProperties.length];
  };

  // Handle marker click to navigate to property details
  const handleMarkerClick = (propertyId: number) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={getMapCenter() as [number, number]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => {
          // Only create markers for properties with valid coordinates
          if (property.Coordinate_LONGITUDINE && property.Coordinate_LATITUDINE) {
            return (
              <Marker
                key={property.id}
                position={[property.Coordinate_LONGITUDINE, property.Coordinate_LATITUDINE]}
                eventHandlers={{
                  click: () => handleMarkerClick(property.id),
                }}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{property.Nome_Immobile}</h3>
                    <p className="text-sm">{property.Indirizzo}</p>
                    <button
                      className="text-primary text-sm font-medium mt-2"
                      onClick={() => handleMarkerClick(property.id)}
                    >
                      Visualizza Dettagli
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;