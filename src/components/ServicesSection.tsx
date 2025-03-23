import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { fetchServices, Service } from "../lib/strapi";
import { Loader2 } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard = ({ title, description }: ServiceCardProps) => {
  return (
    <Card className="h-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
  useStaticData?: boolean;
}

// Default static services data
const defaultServices = [
  {
    title: "Valutazione gratuita immobili residenziali",
    description:
      "Offriamo una valutazione professionale e gratuita del valore di mercato degli immobili residenziali, fornendo un'analisi dettagliata e aggiornata.",
  },
  {
    title: "Valutazione gratuita immobili commerciali",
    description:
      "Determinazione precisa del valore degli immobili commerciali per garantire un'operazione di vendita o acquisto consapevole e vantaggiosa.",
  },
  {
    title: "Valutazione gratuita terreni edificabili",
    description:
      "Analisi esperta del potenziale edificabile e del valore di mercato dei terreni destinati a nuove costruzioni.",
  },
  {
    title: "Valutazione gratuita terreni agricoli",
    description:
      "Stima professionale del valore dei terreni agricoli basata su caratteristiche, ubicazione e destinazione d'uso.",
  },
  {
    title: "Gestione pratiche",
    description:
      "Supporto completo nella gestione delle pratiche burocratiche e amministrative per compravendite immobiliari.",
  },
  {
    title: "Controllo documentale",
    description:
      "Verifica approfondita di tutta la documentazione necessaria per garantire la conformità legale e amministrativa dell'immobile.",
  },
  {
    title: "Assistenza fino al rogito",
    description:
      "Accompagnamento in ogni fase della compravendita, fino alla firma del rogito notarile, garantendo un processo sicuro e trasparente.",
  },
  {
    title: "Consulenze per cantieri residenziali e commerciali",
    description:
      "Analisi e strategie per la valorizzazione e vendita di cantieri residenziali e commerciali.",
  },
  {
    title: "Consulenza per ristrutturazione di immobili",
    description:
      "Suggerimenti strategici per interventi di ristrutturazione finalizzati all'ottimizzazione del valore di mercato degli immobili.",
  },
];

const ServicesSection = ({
  title = "Tutti i nostri servizi",
  subtitle = "Da ricerca della proprieta' alla vendita di esse, offriamo un servizio completo e adatto ai tuoi bisogni!",
  services: initialServices,
  useStaticData = false,
}: ServicesSectionProps) => {
  const [services, setServices] = useState<Service[]>(initialServices || []);
  const [loading, setLoading] = useState(!initialServices && !useStaticData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Always use default services due to mixed content issues
    if (initialServices && initialServices.length > 0) {
      setServices(initialServices);
    } else {
      setServices(defaultServices);
    }
    setLoading(false);
  }, [initialServices, useStaticData]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          {error && <p className="text-amber-600 mt-2">{error}</p>}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <span className="ml-2 text-gray-600">Caricamento servizi...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
