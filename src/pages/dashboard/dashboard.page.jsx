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
    return (
      <main className="mt-4 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </main>
    );
  }

  if (isErrorSolarUnit) {
    return (
      <main className="mt-4 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Error loading dashboard</p>
          <p className="text-sm text-red-500 mt-2">{errorSolarUnit.message}</p>
        </div>
      </main>
    );
  }

  if (!solarUnit) {
    return (
      <main className="mt-4 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-600">No solar unit found for this user.</p>
        </div>
      </main>
    );
  }
  
  return (
    <main className="mt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          {user?.firstName}'s Solar Dashboard
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Welcome back! Monitor your solar energy production in real-time.
        </p>
      </div>

      {/* Weather and Capacity Factor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Weather Card */}
        <div className="relative w-full aspect-[16/9] sm:aspect-auto sm:h-full min-h-[300px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img
            src={solarFarm}
            alt="Solar farm"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />
          
          {/* Overlay content */}
          <div className="absolute inset-0 p-4 sm:p-6 z-10 flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-white text-xl sm:text-2xl mb-4 drop-shadow-lg">
                Weather Conditions
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <h3 className="font-semibold text-sm sm:text-base mb-2">Temperature</h3>
                {isLoadingWeather ? (
                  <div className="h-8 w-16 bg-white/20 rounded animate-pulse" />
                ) : weatherError ? (
                  <p className="text-red-300 text-sm">Error</p>
                ) : (
                  <p className="text-2xl sm:text-3xl font-bold">{weatherData?.temperature || "N/A"}°C</p>
                )}
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <h3 className="font-semibold text-sm sm:text-base mb-2">Wind Speed</h3>
                {isLoadingWeather ? (
                  <div className="h-8 w-16 bg-white/20 rounded animate-pulse" />
                ) : weatherError ? (
                  <p className="text-red-300 text-sm">Error</p>
                ) : (
                  <p className="text-2xl sm:text-3xl font-bold">{weatherData?.windSpeed || "N/A"} km/h</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Capacity Factor Chart */}
        <div className="rounded-xl bg-white shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
          <CapacityFactorChart solarUnitId={solarUnit._id} />
        </div>
      </div>

      {/* Energy Production Chart */}
      <div className="mt-6 sm:mt-8">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
          <DataChart solarUnitId={solarUnit._id} />
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;