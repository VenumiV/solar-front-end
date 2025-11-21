import HeroSection from "@/pages/home/components/HeroSection/HeroSection";
import SolarEnergyProduction from "@/pages/home/components/SolarEnergyProduction";
import Navigation from "@/components/Navigation/Navigation";
import Descrip from "@/components/BelowHero/descrip";


const HomePage = () => {
  return (
    <main>
      <Navigation/>
      <HeroSection />
      <SolarEnergyProduction />
      <Descrip />
    </main>
  );
};

export default HomePage;