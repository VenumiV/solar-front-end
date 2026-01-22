//import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import { useGetSolarUnitforUserQuery } from "@/lib/redux/query";
import DataChart from "./components/DataChart";
import CapacityFactorChart from "./components/CapacityFactorChart";
import { useUser } from "@clerk/clerk-react";
import solarFarm from "./solar-farm.png";
import useWeather from "@/hooks/useWeather";

const DashboardPage = () => {
  const { user } = useUser(); // from @clerk/clerk-react

  const {
    data: solarUnit,
    isLoading: isLoadingSolarUnit,
    isError: isErrorSolarUnit,
    error: errorSolarUnit,
  } = useGetSolarUnitforUserQuery(undefined, {
    skip: !user,
  });

  // Fetch weather data - uses browser geolocation with fallback to default coordinates
  const { weatherData, isLoading: isLoadingWeather, error: weatherError } = useWeather();


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
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-16 text-center max-w-2xl mx-auto">
          <div className="mx-auto w-24 h-24 mb-6 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Solar Unit Found</h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            You don't have a solar unit assigned to your account yet. Please contact your administrator to get a solar unit set up for you.
          </p>
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