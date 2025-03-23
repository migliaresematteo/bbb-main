import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../lib/strapi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { formatCurrency } from '../lib/utils';
import { Button } from './ui/button';
import { MapPin, Home, Bath, Ruler, Building } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  layout?: 'vertical' | 'horizontal';
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, layout = 'vertical' }) => {
  // Get the cover image URL or use a placeholder
  const coverImage = property.Immagine_Copertina?.[0]?.url
    ? `${import.meta.env.VITE_STRAPI_API_URL}${property.Immagine_Copertina[0].url}`
    : 'https://placehold.co/600x400?text=No+Image';

  // Horizontal layout
  if (layout === 'horizontal') {
    return (
      <Card className="group overflow-hidden bg-white border-0 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
        <Link to={`/property/${property.id}`} className="flex flex-col md:flex-row">
          <div className="relative h-64 md:h-auto md:w-1/3 md:min-w-[250px] overflow-hidden md:rounded-l-xl rounded-t-xl md:rounded-tr-none">
            <img 
              src={coverImage} 
              alt={property.Nome_Immobile} 
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {property.In_Evidenza && (
              <Badge className="absolute top-3 left-3 bg-amber-500 text-white font-semibold px-3 py-1 shadow-lg rounded-full">
                In Evidenza
              </Badge>
            )}
            {/* Price tag */}
            <div className="absolute top-3 right-3 bg-primary text-white font-bold px-3 py-1.5 rounded-lg shadow-lg">
              {formatCurrency(property.Prezzo)}
            </div>
          </div>
          
          <div className="flex flex-col flex-grow p-4 md:p-5">
            <div className="mb-2">
              <Badge variant="outline" className="text-xs font-medium mb-2">
                {property.Tipologia}
              </Badge>
              <h3 className="text-xl font-bold leading-tight text-gray-900 group-hover:text-primary transition-colors duration-200 mt-1">
                {property.Nome_Immobile}
              </h3>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                {property.Indirizzo}
              </p>
            </div>
            
            <CardDescription className="text-sm text-gray-600 line-clamp-2 mb-3 md:mb-4">
              {property.Descrizione}
            </CardDescription>
            
            <div className="grid grid-cols-2 xs:grid-cols-4 gap-3 md:gap-4 text-sm mb-3 md:mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <div className="bg-primary/10 p-1.5 rounded-md">
                  <Home className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Locali</span>
                  <span className="font-medium">{property.Numero_Locali}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="bg-primary/10 p-1.5 rounded-md">
                  <Bath className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Bagni</span>
                  <span className="font-medium">{property.Bagni}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="bg-primary/10 p-1.5 rounded-md">
                  <Ruler className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Superficie</span>
                  <span className="font-medium">{property.Superficie} m²</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="bg-primary/10 p-1.5 rounded-md">
                  <Building className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Piani</span>
                  <span className="font-medium">{property.Piani}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <Button 
                asChild 
                className="w-full xs:w-auto font-medium bg-primary hover:bg-primary/90 text-white transition-colors duration-200 rounded-lg py-2"
              >
                <Link to={`/property/${property.id}`}>Visualizza Dettagli</Link>
              </Button>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  // Default vertical layout
  return (
    <Card className="group overflow-hidden h-full flex flex-col bg-white border-0 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <Link to={`/property/${property.id}`} className="flex flex-col flex-grow">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
          <img 
            src={coverImage} 
            alt={property.Nome_Immobile} 
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {property.In_Evidenza && (
            <Badge className="absolute top-3 left-3 bg-amber-500 text-white font-semibold px-3 py-1 shadow-lg rounded-full">
              In Evidenza
            </Badge>
          )}
          {/* Price tag */}
          <div className="absolute top-3 right-3 bg-primary text-white font-bold px-3 py-1.5 rounded-lg shadow-lg">
            {formatCurrency(property.Prezzo)}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Badge variant="outline" className="text-xs font-medium px-2 py-1 border-white text-white bg-transparent backdrop-blur-sm">
              {property.Tipologia}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-2 pt-4 px-5">
          <CardTitle className="text-xl font-bold leading-tight text-gray-900 group-hover:text-primary transition-colors duration-200">
            {property.Nome_Immobile}
          </CardTitle>
          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            <MapPin className="h-4 w-4 text-gray-400" />
            {property.Indirizzo}
          </p>
        </CardHeader>
        <CardContent className="flex-grow space-y-4 px-5">
          <CardDescription className="text-sm text-gray-600 line-clamp-2">
            {property.Descrizione}
          </CardDescription>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="bg-primary/10 p-1.5 rounded-md">
                <Home className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Locali</span>
                <span className="font-medium">{property.Numero_Locali}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="bg-primary/10 p-1.5 rounded-md">
                <Bath className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Bagni</span>
                <span className="font-medium">{property.Bagni}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="bg-primary/10 p-1.5 rounded-md">
                <Ruler className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Superficie</span>
                <span className="font-medium">{property.Superficie} m²</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="bg-primary/10 p-1.5 rounded-md">
                <Building className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Piani</span>
                <span className="font-medium">{property.Piani}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="border-t pt-4 pb-5 px-5 mt-auto">
        <Button 
          asChild 
          className="w-full font-medium bg-primary hover:bg-primary/90 text-white transition-colors duration-200 rounded-lg py-2"
        >
          <Link to={`/property/${property.id}`}>Visualizza Dettagli</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;