"use client";

import HeroSlider from "./components/HeroSlider";
import WorkSection from "./components/WorkSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import PortfolioModal from "./components/PortfolioModal";
import Brands from "./components/Brands";

// Si aquí usabas useSearchParams, déjalo aquí:
import { useSearchParams } from "next/navigation";

export default function HomeClient() {
  const searchParams = useSearchParams();

  return (
    <>
       <HeroSlider />
            <WorkSection />
            <PortfolioModal />
            <Brands />
            <AboutSection />
            <ContactSection />
            <Footer />
    </>
  );
}
