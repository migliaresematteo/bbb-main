import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  backgroundImage?: string;
  onCtaClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "BrickByBrick",
  subtitle = "Agenzia immobiliare specializzata nella vendita e affitto di proprietà in Italia",
  ctaText = "Vedi immobili",
  backgroundImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  onCtaClick,
}) => {
  const navigate = useNavigate();
  
  // Use provided onCtaClick or default to navigation to properties page
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      navigate("/properties");
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-gray-900 overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">{subtitle}</p>
          <Button
            size="lg"
            className="text-base font-semibold px-8 py-6 h-auto bg-white text-gray-900 hover:bg-white/90 hover:text-gray-900"
            onClick={handleCtaClick}
          >
            {ctaText}
          </Button>
        </div>

        {/* Optional Property Stats */}
        <div className="mt-16 bg-white/10 backdrop-blur-md rounded-lg p-6 hidden md:block">
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">5+</p>
              <p className="text-sm text-white/80">Anni di esperienza</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">95%</p>
              <p className="text-sm text-white/80">Dei clienti soddisfatti</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
