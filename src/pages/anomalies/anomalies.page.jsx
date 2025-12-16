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
    return <div>Loading...</div>;
  }

  if (isErrorSolarUnit) {
    return <div>Error: {errorSolarUnit.message}</div>;
  }

  if (!solarUnit) {
    return <div>No solar unit found for this user.</div>;
  }
  
  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">{user?.firstName}'s House</h1>
      <p className="text-gray-600 mt-2">Monitor Anomalies in your Solar Energy Production</p>
      
      <div className="mt-8 space-y-6">
        {/* Existing DataCard component for client-side detection */}
        <DataCard solarUnitId={solarUnit._id} />
        
        {/* New AnomaliesList component for backend-detected anomalies */}
        <AnomaliesList solarUnitId={solarUnit._id} />
       

      </div>
    </main>
  );
}

export default AnomaliesPage;