"use client";

import HeroSlider from "./components/HeroSlider";
import WorkSection from "./components/WorkSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import PortfolioModal from "./components/PortfolioModal";

// Si aquí usabas useSearchParams, déjalo aquí:
import { useSearchParams } from "next/navigation";

export default function HomeClient() {
  const searchParams = useSearchParams();

  // TODO: pega aquí tu lógica actual tal cual (useEffect, estados, handlers, etc.)
  // Ejemplo: abrir modal si ?work=... etc.

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
