"use client";

import HeroSlider from "./components/HeroSlider";
import WorkSection from "./components/WorkSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import PortfolioModal from "./components/PortfolioModal";
import Brands from "./components/Brands";
import { useSearchParams } from "next/navigation";


//Aqui va toda la pagina en orden, empezando por el HeroSlider y terminando con el Footer,
//dependiendo del orden es como se muestra en la pagina

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


