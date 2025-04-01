import React, { useState, useEffect } from 'react';
import { useProperties, Property } from '../lib/strapi';
import PropertyCard from './PropertyCard';
import PropertyMap from './PropertyMap';
import { 
  Loader2, Search, Grid, List, SlidersHorizontal, X, Euro, 
  ArrowUpDown, ArrowDown, ArrowUp, Home, MapPin 
} from 'lucide-react';
import { Input } from './ui/input';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from './ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from './ui/sheet';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import Header from './Header';
import Footer from './Footer';
import { formatCurrency } from '../lib/utils';

// Price range constants
const MIN_PRICE = 0;
const MAX_PRICE = 2000000;
const PRICE_STEP = 10000;

// Surface area range constants
const MIN_SURFACE = 0;
const MAX_SURFACE = 1000;
const SURFACE_STEP = 5;

// Sorting options
type SortOption = {
  value: string;
  label: string;
  sortFn: (a: Property, b: Property) => number;
};

const sortOptions: SortOption[] = [
  { 
    value: 'price-asc', 
    label: 'Prezzo (crescente)', 
    sortFn: (a, b) => a.Prezzo - b.Prezzo 
  },
  { 
    value: 'price-desc', 
    label: 'Prezzo (decrescente)', 
    sortFn: (a, b) => b.Prezzo - a.Prezzo 
  },
  { 
    value: 'date-desc', 
    label: 'Più recenti', 
    sortFn: (a, b) => new Date(b.Data_Aggiornamento).getTime() - new Date(a.Data_Aggiornamento).getTime() 
  },
  { 
    value: 'date-asc', 
    label: 'Meno recenti', 
    sortFn: (a, b) => new Date(a.Data_Aggiornamento).getTime() - new Date(b.Data_Aggiornamento).getTime() 
  },
  { 
    value: 'size-desc', 
    label: 'Superficie (decrescente)', 
    sortFn: (a, b) => b.Superficie - a.Superficie 
  },
  { 
    value: 'size-asc', 
    label: 'Superficie (crescente)', 
    sortFn: (a, b) => a.Superficie - b.Superficie 
  },
];

const PropertiesPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(9);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [metratureRange, setMetratureRange] = useState<[number, number]>([0, 1000]);
  const [city, setCity] = useState<string>('all');
  const [rooms, setRooms] = useState<string>('all');
  const [bathrooms, setBathrooms] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date-desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMap, setShowMap] = useState<boolean>(false);
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState<boolean>(false);
  
  // Fetch properties with pagination
  const { properties, loading, error, pagination } = useProperties(page, pageSize, false, false);
  
  // Filtered properties based on search term and filters
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [sortedProperties, setSortedProperties] = useState<Property[]>([]);

  // Filter properties when properties, searchTerm, or propertyType changes
  useEffect(() => {
    if (properties.length > 0) {
      let filtered = [...properties];
      
      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(property => 
          property.Nome_Immobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.Descrizione.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.Indirizzo.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filter by property type
      if (propertyType && propertyType !== 'all') {
        filtered = filtered.filter(property => 
          property.Tipologia === propertyType
        );
      }
      
      // Filter by city
      if (city && city !== 'all') {
        filtered = filtered.filter(property => 
          property.Citta === city
        );
      }
      
      // Filter by metrature range
      filtered = filtered.filter(property => 
        property.Superficie >= metratureRange[0] && property.Superficie <= metratureRange[1]
      );
      
      // Filter by price range
      filtered = filtered.filter(property => 
        property.Prezzo >= priceRange[0] && property.Prezzo <= priceRange[1]
      );
      
      // Filter by rooms (using Numero_Locali instead of Numero_Camere)
      if (rooms && rooms !== 'all') {
        filtered = filtered.filter(property => 
          property.Numero_Locali === parseInt(rooms)
        );
      }
      
      // Filter by bathrooms (using Bagni instead of Numero_Bagni)
      if (bathrooms && bathrooms !== 'all') {
        filtered = filtered.filter(property => 
          property.Bagni === parseInt(bathrooms)
        );
      }
      
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties([]);
    }
  }, [properties, searchTerm, propertyType, priceRange, rooms, bathrooms]);

  // Sort properties when filteredProperties or sortBy changes
  useEffect(() => {
    if (filteredProperties.length > 0) {
      const sortOption = sortOptions.find(option => option.value === sortBy);
      if (sortOption) {
        const sorted = [...filteredProperties].sort(sortOption.sortFn);
        setSortedProperties(sorted);
      } else {
        setSortedProperties(filteredProperties);
      }
    } else {
      setSortedProperties([]);
    }
  }, [filteredProperties, sortBy]);

  // Get unique property types for the filter dropdown
  const propertyTypes = properties.length > 0 
    ? ['all', ...new Set(properties.map(property => property.Tipologia))]
    : ['all'];
    
  // Get unique cities for the filter dropdown
  const cities = properties.length > 0
    ? ['all', ...new Set(properties.map(property => property.Citta))]
    : ['all'];
    
  // Get unique room counts for the filter dropdown
  const roomCounts = properties.length > 0
    ? ['all', ...new Set(properties.map(property => property.Numero_Locali.toString()))]
    : ['all'];
    
  // Get min and max metrature for the slider
  const surfaceAreaRange = properties.length > 0
    ? [0, Math.max(...properties.map(property => property.Superficie))]
    : [0, 1000];
    
  // Get unique bathroom counts for the filter dropdown
  const bathroomCounts = properties.length > 0
    ? ['all', ...new Set(properties.map(property => property.Bagni.toString()))]
    : ['all'];

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset all filters to default values
  const resetFilters = () => {
    setSearchTerm('');
    setPropertyType('all');
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setRooms('all');
    setBathrooms('all');
    setSortBy('date-desc');
    setFiltersApplied(false);
  };
  
  // Apply filters and close filter sheet
  const applyFilters = () => {
    setFiltersApplied(true);
    setIsFilterSheetOpen(false);
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    const totalPages = pagination.pageCount;
    
    // Always show first page
    items.push(
      <PaginationItem key="page-1">
        <PaginationLink 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(1);
          }}
          isActive={page === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Show ellipsis if needed
    if (page > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Show pages around current page
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      if (i <= 1 || i >= totalPages) continue; // Skip first and last page as they're always shown
      
      items.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            isActive={page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show ellipsis if needed
    if (page < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
            isActive={page === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Cerca per nome, descrizione o indirizzo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-shrink-0">
                    <SlidersHorizontal className="h-5 w-5 mr-2" />
                    Filtri
                    {filtersApplied && (
                      <Badge variant="secondary" className="ml-2">!</Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filtri di Ricerca</SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-6 space-y-6">
                    {/* Property Type Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tipologia</label>
                      <div className="space-y-4">
                        <Select value={propertyType} onValueChange={setPropertyType}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Tipo di immobile" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map((type, index) => (
                              <SelectItem key={index} value={type}>
                                {type === 'all' ? 'Tutti i tipi' : type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select value={city} onValueChange={setCity}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Città" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((cityOption, index) => (
                              <SelectItem key={index} value={cityOption}>
                                {cityOption === 'all' ? 'Tutte le città' : cityOption}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Price Range Filter */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Prezzo</label>
                        <span className="text-sm text-gray-500">
                          {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                        </span>
                      </div>
                      <Slider
                        value={priceRange}
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step={PRICE_STEP}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        className="mt-2"
                        minStepsBetweenThumbs={1}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Superficie (m²)</label>
                        <span className="text-sm text-gray-500">
                          {metratureRange[0]} - {metratureRange[1]} m²
                        </span>
                      </div>
                      <Slider
                        value={metratureRange}
                        min={MIN_SURFACE}
                        max={MAX_SURFACE}
                        step={SURFACE_STEP}
                        onValueChange={(value) => setMetratureRange(value as [number, number])}
                        className="mt-2"
                        minStepsBetweenThumbs={1}
                      />
                    </div>
                    
                    {/* Rooms Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Locali</label>
                      <Select value={rooms} onValueChange={setRooms}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tutti" />
                        </SelectTrigger>
                        <SelectContent>
                          {roomCounts.map((count) => (
                            <SelectItem key={count} value={count}>
                              {count === 'all' ? 'Tutti' : `${count} locali`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Bathrooms Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Bagni</label>
                      <Select value={bathrooms} onValueChange={setBathrooms}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tutti" />
                        </SelectTrigger>
                        <SelectContent>
                          {bathroomCounts.map((count) => (
                            <SelectItem key={count} value={count}>
                              {count === 'all' ? 'Tutti' : `${count} bagni`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <SheetFooter className="mt-6 flex gap-3">
                    <Button variant="outline" onClick={resetFilters} className="flex-1">
                      Resetta
                    </Button>
                    <Button onClick={applyFilters} className="flex-1">
                      Applica Filtri
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              
              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] flex-shrink-0">
                  <SelectValue placeholder="Ordina per" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* View Mode Toggle */}
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={!showMap ? "ghost" : "outline"}
                  size="sm"
                  className={`rounded-none px-3 ${!showMap ? 'bg-muted' : ''}`}
                  onClick={() => setShowMap(false)}
                >
                  {viewMode === 'grid' ? <Grid className="h-4 w-4 mr-2" /> : <List className="h-4 w-4 mr-2" />}
                  Lista
                </Button>
                <Button
                  variant={showMap ? "ghost" : "outline"}
                  size="sm"
                  className={`rounded-none px-3 ${showMap ? 'bg-muted' : ''}`}
                  onClick={() => setShowMap(true)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Mappa
                </Button>
              </div>
              
              {/* Grid/List Toggle (only visible when map is not shown) */}
              {!showMap && (
                <div className="flex border rounded-md overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? "ghost" : "outline"}
                    size="sm"
                    className={`rounded-none px-3 ${viewMode === 'grid' ? 'bg-muted' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? "ghost" : "outline"}
                    size="sm"
                    className={`rounded-none px-3 ${viewMode === 'list' ? 'bg-muted' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Properties Display (Map or Grid/List) */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <span className="ml-2 text-gray-600">Caricamento proprietà...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500">{error}</p>
            </div>
          ) : sortedProperties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Nessuna proprietà trovata</p>
            </div>
          ) : showMap ? (
            <div className="mt-6">
              <PropertyMap properties={sortedProperties} />
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {sortedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  layout={viewMode === 'grid' ? 'vertical' : 'horizontal'}
                />
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {pagination && pagination.pageCount > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                    />
                  </PaginationItem>
                  {generatePaginationItems()}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === pagination.pageCount}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PropertiesPage;