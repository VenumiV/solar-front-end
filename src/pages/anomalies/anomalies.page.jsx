import { useGetSolarUnitforUserQuery } from "@/lib/redux/query";
import DataCard from "./components/DataCard";
import AnomaliesList from "./components/AnomaliesList";
import { useUser } from "@clerk/clerk-react";

const AnomaliesPage = () => {
  const { user, isLoaded } = useUser(); // from @clerk/clerk-react

  const {
    data: solarUnit,
    isLoading: isLoadingSolarUnit,
    isError: isErrorSolarUnit,
    error: errorSolarUnit,
  } = useGetSolarUnitforUserQuery(undefined, {
    skip: !user,
  });

  if (isLoadingSolarUnit) {
    return (
      <main className="mt-4 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-6">
          <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </main>
    );
  }

  if (isErrorSolarUnit) {
    return (
      <main className="mt-4 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Error loading anomalies</p>
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
          {user?.firstName}'s Anomaly Detection
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Monitor and resolve anomalies in your solar energy production
        </p>
      </div>
      
      <div className="mt-6 sm:mt-8 space-y-6">
        {/* Existing DataCard component for client-side detection */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <DataCard solarUnitId={solarUnit._id} />
        </div>
        
        {/* New AnomaliesList component for backend-detected anomalies */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <AnomaliesList solarUnitId={solarUnit._id} />
        </div>
      </div>
    </main>
  );
}

export default AnomaliesPage;