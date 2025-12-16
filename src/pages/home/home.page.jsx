import HeroSection from "@/pages/home/components/HeroSection/HeroSection";
import SolarEnergyProduction from "@/pages/home/components/SolarEnergyProduction";
import Navigation from "@/components/Navigation/Navigation";
import Descrip from "@/components/BelowHero/descrip";
import Footer from "@/components/Footer/Footer";


const HomePage = () => {
  return (
    <main>
      <Navigation/>
      <HeroSection />
      <Descrip />
      <Footer/>
    </main>
  );
};

export default HomePage;