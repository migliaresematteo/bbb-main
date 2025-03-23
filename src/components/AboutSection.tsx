import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchFromStrapi, Property } from "../lib/strapi";

interface CounterProps {
  end: number;
  duration?: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

const Counter = ({
  end = 0,
  duration = 2,
  label = "Properties",
  prefix = "",
  suffix = "",
}: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-lg">
      <div className="text-4xl font-bold text-primary mb-2">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

interface AboutSectionProps {
  title?: string;
  description?: string;
  metrics?: Array<{
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
  }>;
}

const AboutSection = ({
  title = "Su di noi",
  description = "Brick By Brick Immobiliare nasce dalla passione per il territorio del Canavese e dalla volontà di offrire un servizio immobiliare di eccellenza. Specializzati nella zona di Torino e del Canavese, con particolare focus su comuni come Ciriè, Nole, Fiano, Cafasse e Villanova Canavese, ci distinguiamo per la profonda conoscenza del mercato locale e per l'attenzione alle esigenze di ogni cliente. La nostra missione è guidare i clienti verso le migliori opportunità immobiliari, siano esse appartamenti moderni, ville esclusive o soluzioni abitative sostenibili. Puntiamo sulla qualità, sull'efficienza energetica e sul rispetto dell'ambiente, promuovendo immobili in classe A e soluzioni innovative.",
  metrics: Array<{ value: number; label: string; prefix?: string; suffix?: string; }> = [],
}: AboutSectionProps) => {
  const [dynamicMetrics, setDynamicMetrics] = useState([
    { value: 50, label: "Appartamenti venduti", prefix: "" },
    { value: 100, label: "Clienti soddisfatti", prefix: "" },
    { value: 0, label: "Appartamenti premium", prefix: "" },
    { value: 0, label: "valore portfolio", prefix: "€", suffix: "" },
  ]);

  useEffect(() => {
    const fetchPropertyMetrics = async () => {
      try {
        const response = await fetchFromStrapi<Property>('/api/immobilis?populate=*');
        if (response.data) {
          const premiumProperties = response.data.filter(property => property.In_Evidenza);
          const totalValue = premiumProperties.reduce((sum, property) => sum + property.Prezzo, 0);
          const valueInMillions = totalValue; // Convert to millions

          setDynamicMetrics(prev => [
            prev[0],
            prev[1],
            { ...prev[2], value: premiumProperties.length },
            { ...prev[3], value: Number(valueInMillions.toFixed(1)) },
          ]);
        }
      } catch (error) {
        console.error('Error fetching property metrics:', error);
      }
    };

    fetchPropertyMetrics();
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 bg-background" id="about">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {dynamicMetrics.map((metric, index) => (
            <Counter
              key={index}
              end={metric.value}
              label={metric.label}
              prefix={metric.prefix}
              suffix={metric.suffix}
              duration={2 + index * 0.3}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div className="rounded-lg overflow-hidden h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
              alt="Our team"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">La nostra missione</h3>
            <p className="text-muted-foreground">
              Ci impegniamo a fornire un servizio e una competenza eccezionali sul
              mercato immobiliare. La nostra missione è aiutare i nostri clienti a
              a trovare gli immobili dei loro sogni, rendendo il processo
              piacevole.
            </p>
            <h3 className="text-2xl font-semibold">I nostri obiettivi</h3>
            <p className="text-muted-foreground">
              Essere un agenzia immobiliare conosciuta per l' integrità, la competenza e l'approccio personalizzato verso i singoli clienti.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
