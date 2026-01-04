"use client";

import HeroSlider from "./components/HeroSlider";
import WorkSection from "./components/WorkSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import PortfolioModal from "./components/PortfolioModal";
// importa aquí lo que ya tenías en Home

export default function HomeClient() {
  // TODO: aquí va tu lógica actual, incluyendo el useSearchParams()
  // y el return de tu página.
  return (
    <>
      <HeroSlider />
      <WorkSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <PortfolioModal />
    </>
  );
}
