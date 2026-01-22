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