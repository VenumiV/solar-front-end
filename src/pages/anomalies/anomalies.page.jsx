//import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import { useGetSolarUnitforUserQuery } from "@/lib/redux/query";
import DataCard from "./components/DataCard";
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
  console.log(solarUnit);
  
  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">{user?.firstName}'s House</h1>
      <p className="text-gray-600 mt-2">Monitor Anomalies in your Solar Energy Production</p>
      <div className="mt-8">
        <DataCard
          solarUnitId={solarUnit._Id}       
        />
      </div>
    </main>
  );
}

export default AnomaliesPage;