//import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import { useGetSolarUnitforUserQuery } from "@/lib/redux/query";
import DataCard from "./components/DataCard";
import DataChart from "./components/DataChart";
import { useUser } from "@clerk/clerk-react";

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


  if (isLoadingSolarUnit) {
    return <div>Loading...</div>;
  }

  if (isErrorSolarUnit) {
    return <div>Error: {errorSolarUnit.message}</div>;
  }

  console.log(solarUnit);
  
  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">{user?.firstName}'s House</h1>
      <p className="text-gray-600 mt-2">Welcome back to your Solar Energy Production Dashboard</p>
      <div className="mt-8">
        <DataCard
          solarUnitId={solarUnit._Id}
          title="Last 7 Days Energy Production"
        />
      </div>
      <div className="mt-8">
        <DataChart
         solarUnitId={solarUnit._Id}
        />
      </div>
    </main>
  );
}

export default DashboardPage;