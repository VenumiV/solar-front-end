import HeroSection from "@/pages/home/components/HeroSection/HeroSection";
import SolarEnergyProduction from "@/pages/home/components/SolarEnergyProduction";
import Navigation from "@/components/Navigation/Navigation";


const HomePage = () => {
  return (
    <main>
      <Navigation/>
      <HeroSection />
      <SolarEnergyProduction />
    </main>
  );
};

export default HomePage;