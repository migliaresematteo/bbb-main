import React from "react";
import ServicesSection from "./ServicesSection";

const ServicesSectionStoryboard = () => {
  // This storyboard demonstrates the ServicesSection with Strapi integration
  // It will attempt to fetch data from Strapi, but fall back to default data if unavailable
  return (
    <div className="bg-white">
      <ServicesSection />
    </div>
  );
};

export default ServicesSectionStoryboard;
