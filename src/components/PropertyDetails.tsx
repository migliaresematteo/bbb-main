import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Property, fetchFromStrapi } from '../lib/strapi';
import { formatCurrency } from '../lib/utils';
import { 
  Loader2, ArrowLeft, MapPin, Home, Ruler, Bath, Building, 
  Car, Thermometer, Wind, CalendarClock, Euro, Share2 
} from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from './ui/carousel';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import Header from './Header';
import Footer from './Footer';
import PropertyMap from './PropertyMap';

interface PropertyDetailsParams {
  [key: string]: string;
  id: string;
}

const PropertyDetails: React.FC = () => {
  const params = useParams<PropertyDetailsParams>();
  const { id } = params;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  // Update the active image index when carousel changes
  useEffect(() => {
    if (!carouselApi) return;

    const onChange = () => {
      setActiveImageIndex(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onChange);
    return () => {
      carouselApi.off("select", onChange);
    };
  }, [carouselApi]);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Use filter parameter to query properties by ID instead of direct path access
        // This is more reliable when Strapi IDs aren't sequential or have custom formats
        const response = await fetchFromStrapi<Property>(`/api/immobilis?populate=*&filters[id][$eq]=${id}`);
        
        // Check if we got any properties back
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          // Set the first matching property
          setProperty(response.data[0]);
        } else {
          // If no properties found with that ID, try an alternative approach
          try {
            // Try with documentId if id doesn't work
            const altResponse = await fetchFromStrapi<Property>(`/api/immobilis?populate=*&filters[documentId][$eq]=${id}`);
            
            if (altResponse.data && Array.isArray(altResponse.data) && altResponse.data.length > 0) {
              setProperty(altResponse.data[0]);
            } else {
              setError('Proprietà non trovata');
            }
          } catch (innerErr) {
            setError('Proprietà non trovata');
            console.error(innerErr);
          }
        }
      } catch (err) {
        setError('Impossibile caricare i dettagli della proprietà. Riprova più tardi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <span className="ml-2 text-gray-600">Caricamento dettagli proprietà...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col justify-center items-center p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Errore</h1>
          <p className="text-gray-600 mb-6">{error || 'Proprietà non trovata'}</p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/properties">Torna alle Proprietà</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Get the carousel images or use a placeholder
  const carouselImages = property.Immagini_Carosello && property.Immagini_Carosello.length > 0
    ? property.Immagini_Carosello
    : property.Immagine_Copertina && property.Immagine_Copertina.length > 0
      ? property.Immagine_Copertina
      : [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="outline" asChild className="rounded-full hover:bg-gray-100">
              <Link to="/properties" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Torna alle Proprietà
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            <div className="lg:col-span-2">
              {/* Property Images Carousel */}
              <div className="rounded-xl overflow-hidden shadow-lg">
                {carouselImages.length > 0 ? (
                  <div className="relative">
                    <Carousel 
                      className="w-full" 
                      opts={{ loop: true }}
                      setApi={setCarouselApi}
                    >
                      <CarouselContent>
                        {carouselImages.map((image, index) => (
                          <CarouselItem key={image.id}>
                            <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden">
                              <img
                                src={`${import.meta.env.VITE_STRAPI_API_URL}${image.url}`}
                                alt={`${property.Nome_Immobile} - Immagine ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                                {activeImageIndex + 1} / {carouselImages.length}
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4 h-10 w-10 bg-white/80 hover:bg-white text-gray-800" />
                      <CarouselNext className="right-4 h-10 w-10 bg-white/80 hover:bg-white text-gray-800" />
                    </Carousel>
                    
                    {/* Thumbnail Preview */}
                    {carouselImages.length > 1 && (
                      <div className="flex gap-2 mt-4 px-2 overflow-x-auto pb-2 hide-scrollbar">
                        {carouselImages.map((image, index) => (
                          <button 
                            key={`thumb-${image.id}`}
                            onClick={() => {
                              carouselApi?.scrollTo(index);
                              setActiveImageIndex(index);
                            }}
                            className={`flex-shrink-0 h-16 w-24 rounded-md overflow-hidden border-2 transition-all ${
                              index === activeImageIndex ? 'border-primary' : 'border-transparent'
                            }`}
                          >
                            <img
                              src={`${import.meta.env.VITE_STRAPI_API_URL}${image.url}`}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Nessuna immagine disponibile</span>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 h-full">
              {/* Property Info Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                {/* Property Title and Badge */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    {property.In_Evidenza && (
                      <Badge className="bg-amber-500 text-white font-semibold px-3 py-1 rounded-full">
                        In Evidenza
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-sm font-medium">
                      {property.Tipologia}
                    </Badge>
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.Nome_Immobile}</h1>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0 text-gray-400" />
                    <span className="text-sm">{property.Indirizzo}</span>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <Euro className="h-5 w-5 mr-2 text-primary" />
                    <span className="text-3xl font-bold text-primary">
                      {formatCurrency(property.Prezzo)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-1.5 rounded-md">
                        <Home className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Locali</p>
                        <p className="font-medium">{property.Numero_Locali}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-1.5 rounded-md">
                        <Bath className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Bagni</p>
                        <p className="font-medium">{property.Bagni}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-1.5 rounded-md">
                        <Ruler className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Superficie</p>
                        <p className="font-medium">{property.Superficie} m²</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-1.5 rounded-md">
                        <Building className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Piani</p>
                        <p className="font-medium">{property.Piani}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <a 
                      href={`https://wa.me/393383551127?text=${encodeURIComponent(
                        `Salve, sono interessato/a all'immobile: ${property.Nome_Immobile}\n` +
                        `Indirizzo: ${property.Indirizzo}\n` +
                        `Prezzo: ${formatCurrency(property.Prezzo)}\n` +
                        `Link: ${window.location.href}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white font-medium py-2.5 flex items-center justify-center gap-2">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Contatta su WhatsApp
                      </Button>
                    </a>
                    
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Condividi
                    </Button>
                  </div>

                  {/* Tally.so Contact Form */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Richiedi Informazioni</h3>
                    <iframe 
                      data-tally-src="https://tally.so/embed/wA4e2y?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
                      loading="lazy" 
                      width="100%" 
                      height="692" 
                      frameBorder="0" 
                      marginHeight="0" 
                      marginWidth="0" 
                      title="Informazioni immobile"
                    />
                    <script
                      dangerouslySetInnerHTML={{
                        __html: `
                          var d=document,w="https://tally.so/widgets/embed.js",v=function(){
                            "undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))
                          };
                          if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){
                            var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);
                          }
                        `
                      }}
                    />
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-sm text-gray-500">
                    <CalendarClock className="h-4 w-4 mr-1.5" />
                    Aggiornato il: {new Date(property.Data_Aggiornamento).toLocaleDateString('it-IT')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property Details Tabs */}
          <div className="mt-10">
            <Tabs defaultValue="details" className="mb-12">
              <TabsList className="grid w-full md:w-auto grid-cols-3 rounded-lg bg-gray-100 p-1">
                <TabsTrigger value="details" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Dettagli</TabsTrigger>
                <TabsTrigger value="description" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Descrizione</TabsTrigger>
                <TabsTrigger value="location" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Posizione</TabsTrigger>
              </TabsList>
              
              {/* Details Tab */}
              <TabsContent value="details" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Home className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Locali</p>
                        <p className="text-lg font-medium">{property.Numero_Locali}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Ruler className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Superficie</p>
                        <p className="text-lg font-medium">{property.Superficie} m²</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Bath className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bagni</p>
                        <p className="text-lg font-medium">{property.Bagni}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Building className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Piani</p>
                        <p className="text-lg font-medium">{property.Piani}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Car className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Parcheggio</p>
                        <p className="text-lg font-medium">{property.Box_PostiAuto_Garage || 'Non specificato'}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Thermometer className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Riscaldamento</p>
                        <p className="text-lg font-medium">{property.Riscaldamento || 'Non specificato'}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Wind className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Climatizzazione</p>
                        <p className="text-lg font-medium">{property.Climatizzazione || 'Non specificato'}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Description Tab */}
              <TabsContent value="description" className="mt-6">
                <Card className="bg-white border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Descrizione Proprietà</h3>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line leading-relaxed text-gray-700">{property.Descrizione}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Location Tab */}
              <TabsContent value="location" className="mt-6">
                <Card className="bg-white border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Posizione</h3>
                    <div className="flex items-center mb-4 bg-gray-50 p-3 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary mr-2" />
                      <p className="text-gray-700">{property.Indirizzo}</p>
                    </div>
                    
                    {property.Coordinate_LATITUDINE && property.Coordinate_LONGITUDINE ? (
                      <div className="aspect-video rounded-lg overflow-hidden shadow-inner">
                        <PropertyMap properties={[property]} />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Mappa non disponibile</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;