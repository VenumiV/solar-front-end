import Navigation from "./components/Navigation/Navigation";
import HeroSection from "./pages/home/components/HeroSection/HeroSection";
import SolarEnergyProduction from "./components/SolarEnergyProduction";
import Descrip from "./components/BelowHero/descrip";

function App() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <SolarEnergyProduction />
        <Descrip/>
      </main>
    </>
  );
}

export default App;