import HeroSlider from "./components/HeroSlider";
import WorkSection from "./components/WorkSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import PortfolioModal from "./components/PortfolioModal";
import Brands from "./components/Brands";


export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSlider />
      <WorkSection />
      <PortfolioModal />
      <Brands />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
