import React, { useEffect } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import ServicesSection from "./ServicesSection";
import FeaturedProperties from "./FeaturedProperties";
import Footer from "./Footer";

const Home: React.FC = () => {
  useEffect(() => {
    // Check if we need to scroll to a section
    const scrollToSection = sessionStorage.getItem("scrollToSection");
    if (scrollToSection) {
      // Clear the storage item
      sessionStorage.removeItem("scrollToSection");
      
      // Find the element and scroll to it
      const targetElement = document.getElementById(scrollToSection);
      if (targetElement) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth"
          });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* About Us Section */}
        <AboutSection />

        {/* Why Choose Us Section */}
        <WhyChooseUsSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Featured Properties Section */}
        <FeaturedProperties />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
