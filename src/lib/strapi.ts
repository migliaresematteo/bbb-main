import { useState, useEffect } from 'react';

// Define types based on the provided response structure
export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
    small?: {
      url: string;
      width: number;
      height: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Property {
  id: number;
  documentId: string;
  Nome_Immobile: string;
  In_Evidenza: boolean;
  Descrizione: string;
  Data_Aggiornamento: string;
  Numero_Locali: number;
  Superficie: number;
  Bagni: number;
  Piani: number;
  Box_PostiAuto_Garage: string;
  Climatizzazione: string;
  Riscaldamento: string;
  Tipologia: string;
  Prezzo: number;
  Coordinate_LONGITUDINE: number;
  Coordinate_LATITUDINE: number;
  Indirizzo: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Immagini_Carosello: StrapiImage[];
  Immagine_Copertina: StrapiImage[];
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Service {
  title: string;
  description: string;
}

// Helper function to build URLs with the API token
const getApiUrl = (endpoint: string): string => {
  const baseUrl = import.meta.env.VITE_STRAPI_API_URL;
  return `${baseUrl}${endpoint}`;
};

// Helper function to get headers with the API token
const getHeaders = (): HeadersInit => {
  return {
    Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
    'Content-Type': 'application/json',
  };
};

// Generic fetch function for Strapi API
export const fetchFromStrapi = async <T>(endpoint: string): Promise<StrapiResponse<T>> => {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error fetching from Strapi: ${response.status}`);
    }

    const data = await response.json();
    return data as StrapiResponse<T>;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
};

// Fetch properties from Strapi
export const fetchProperties = async (page = 1, pageSize = 10): Promise<StrapiResponse<Property>> => {
  return fetchFromStrapi<Property>(`/api/immobilis?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
};

// Fetch all properties from Strapi (handles pagination automatically)
export const fetchAllProperties = async (pageSize = 100): Promise<StrapiResponse<Property>> => {
  // Get first page to determine total pages
  const firstPageResponse = await fetchProperties(1, pageSize);
  const { pageCount } = firstPageResponse.meta.pagination;
  
  // If only one page, return the response
  if (pageCount <= 1) {
    return firstPageResponse;
  }
  
  // Otherwise, fetch all remaining pages
  const allPagePromises = [];
  for (let page = 2; page <= pageCount; page++) {
    allPagePromises.push(fetchProperties(page, pageSize));
  }
  
  // Wait for all requests to complete
  const remainingResponses = await Promise.all(allPagePromises);
  
  // Combine all data
  const allData = [
    ...firstPageResponse.data,
    ...remainingResponses.flatMap(response => response.data)
  ];
  
  // Return combined response with updated metadata
  return {
    data: allData,
    meta: {
      pagination: {
        ...firstPageResponse.meta.pagination,
        page: 1,
        pageSize: allData.length,
        pageCount: 1
      }
    }
  };
};

// Fetch featured properties from Strapi
export const fetchFeaturedProperties = async (limit = 3): Promise<StrapiResponse<Property>> => {
  return fetchFromStrapi<Property>(`/api/immobilis?populate=*&filters[In_Evidenza][$eq]=true&pagination[pageSize]=${limit}`);
};

// Fetch services from Strapi
export const fetchServices = async (): Promise<Service[]> => {
  try {
    const response = await fetchFromStrapi<any>('/api/services?populate=*');
    // Transform the response to match the Service interface
    return response.data.map((item: any) => ({
      title: item.attributes?.title || '',
      description: item.attributes?.description || '',
    }));
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

// Custom hook for fetching properties
export const useProperties = (page = 1, pageSize = 10, featured = false, fetchAll = false) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page,
    pageSize,
    pageCount: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (fetchAll) {
          // Fetch all properties
          response = await fetchAllProperties(pageSize);
        } else if (featured) {
          // Fetch featured properties
          response = await fetchFeaturedProperties(pageSize);
        } else {
          // Fetch paginated properties
          response = await fetchProperties(page, pageSize);
        }
        setProperties(response.data);
        setPagination(response.meta.pagination);
        setError(null);
      } catch (err) {
        setError('Failed to fetch properties. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, featured, fetchAll]);

  return { properties, loading, error, pagination };
};

// Log the data received from Strapi
export const logStrapiData = <T>(data: T): void => {
  console.log('Data received from Strapi:', JSON.stringify(data, null, 2));
};