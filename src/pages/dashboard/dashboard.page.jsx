//import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import { useGetSolarUnitforUserQuery } from "@/lib/redux/query";
import DataChart from "./components/DataChart";
import CapacityFactorChart from "./components/CapacityFactorChart";
import { useUser } from "@clerk/clerk-react";
import solarFarm from "./solar-farm.png";
import useWeather from "@/hooks/useWeather";

const DashboardPage = () => {

  const { user, isLoaded } = useUser(); // from @clerk/clerk-react

const {
  data: solarUnit,
  isLoading: isLoadingSolarUnit,
  isError: isErrorSolarUnit,
  error: errorSolarUnit,
} = useGetSolarUnitforUserQuery(undefined, {
  skip: !user,
});

// Fetch weather data
const { weatherData, isLoading: isLoadingWeather, error: weatherError } = useWeather(7.75, 80.75);


  if (isLoadingSolarUnit) {
    return <div>Loading...</div>;
  }

  if (isErrorSolarUnit) {
    return <div>Error: {errorSolarUnit.message}</div>;
  }

  if (!solarUnit) {
    return <div>No solar unit found for this user.</div>;
  }
  console.log(solarUnit);
  
  return (
    
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">{user?.firstName}'s House</h1>
      <p className="text-gray-600 mt-2">Welcome back to your Solar Energy Production Dashboard</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="relative w-full aspect-[16/9]">
  <img
    src={solarFarm}
    alt="Solar farm"
    className="absolute inset-0 w-full h-full object-cover rounded-xl"
  />

  {/* Overlay content */}
  <div className="absolute inset-0 p-6 z-10">
    <h2 className="font-bold text-white text-2xl mb-4">
      Weather Conditions
    </h2>

    <div className="grid grid-cols-2 gap-4 text-white">
      <div>
        <h3 className="font-semibold">Temperature</h3>
        {isLoadingWeather ? (
          <p className="animate-pulse">Loading...</p>
        ) : weatherError ? (
          <p className="text-red-300">Error</p>
        ) : (
          <p>{weatherData?.temperature || "N/A"}°C</p>
        )}
      </div>
      <div>
        <h3 className="font-semibold">Wind Speed</h3>
        {isLoadingWeather ? (
          <p className="animate-pulse">Loading...</p>
        ) : weatherError ? (
          <p className="text-red-300">Error</p>
        ) : (
          <p>{weatherData?.windSpeed || "N/A"} km/h</p>
        )}
      </div>
    </div>
  </div>

  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/30 rounded-xl">
  </div>
      </div>
        <div className="rounded-2xl">
        <CapacityFactorChart
            solarUnitId={solarUnit._id}
          />

        </div>

      </div>
      <div className="mt-8">
        <div>
          <DataChart
            solarUnitId={solarUnit._id}
          />
          
        </div>
      </div>
      
    </main>
  );
}

export default DashboardPage;