import { Card } from "@/components/ui/card";
import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import { format } from "date-fns";

const DashboardPage = () => {
  const { data, isLoading, isError } =
    useGetEnergyGenerationRecordsBySolarUnitQuery({
      id: "690c024481b1e60d4e380875",
      groupBy: "date",
    });

  if (isLoading) return null;
  if (isError || !data) return null;

  console.log(data);

  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">Alice's House</h1>

      <div className="mt-8">
        <Card className="rounded-md p-4">
          <h2 className="px-4 text-xl font-medium text-foreground">
            Last 7 Days Energy Production
          </h2>

          <div className="grid grid-cols-7 gap-4 mt-4">
            {data.slice(0, 7).map((el, index) => (
              <div
                key={`${el._id.date}-${index}`}
                className="col-span-1 px-2 py-1 hover:bg-gray-200 bg-gray-100 rounded-md"
              >
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-xs font-medium text-foreground">
                    {format(new Date(el._id.date), "MMM d")}
                  </h3>

                  <p className="text-m font-semibold text-foreground">
                    {el.totalEnergy} kwh
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
};

export default DashboardPage;
