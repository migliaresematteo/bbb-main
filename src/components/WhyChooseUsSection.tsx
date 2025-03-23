import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Home, Shield, Clock, Award } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon = <Home />,
  title = "Feature Title",
  description = "Feature description goes here.",
}: FeatureCardProps) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white">
      <CardHeader>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

interface WhyChooseUsSectionProps {
  title?: string;
  subtitle?: string;
  features?: FeatureCardProps[];
}

const WhyChooseUsSection = ({
  title = "Perchè scegliere noi?",
  subtitle = "Forniamo servizi immobiliari con particolare attenzione alla qualità, alla fiducia e alla soddisfazione del cliente.",
  features = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Proprietà",
      description:
        "Offriamo solo le proprietà migliori nelle posizioni più ambite per garantire investimenti di qualità.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Consulenti di fiducia",
      description:
        "Il nostro team di professionisti esperti fornisce una guida esperta durante tutto il processo.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Supporto 24/7",
      description:
        "Siamo sempre disponibili a rispondere ai vostri dubbi e a fornirvi assistenza ogni volta che ne avete bisogno.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Servizio ottimale",
      description:
        "Il nostro impegno per l'eccellenza ci ha fatto garantisce un servizio di altà qualità, sempre.",
    },
  ],
}: WhyChooseUsSectionProps) => {
  return (
    <section className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
