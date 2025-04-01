import React, { useEffect, useState } from 'react';
import { useProperties, Property, logStrapiData } from '../lib/strapi';
import PropertyCard from './PropertyCard';
import { Loader2 } from 'lucide-react';

interface FeaturedPropertiesProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  excludePropertyId?: number;
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  title = 'Immobili in Evidenza',
  subtitle = 'Scopri le nostre proprietà selezionate con cura per te',
  limit = 3,
  excludePropertyId
}) => {
  const { properties, loading, error } = useProperties(1, limit, true, true);
  const filteredProperties = properties.filter(prop => prop.id !== excludePropertyId);

  // Log the data received from Strapi for debugging
  useEffect(() => {
    if (properties.length > 0) {
      logStrapiData(properties);
    }
  }, [properties]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          {error && <p className="text-amber-600 mt-2">{error}</p>}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <span className="ml-2 text-gray-600">Caricamento immobili...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">Nessun immobile in evidenza disponibile al momento.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;