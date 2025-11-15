import Navigation from "@/components/Navigation/Navigation";
import { Card } from "@/components/ui/card"

const DashboardPage = () => {
  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">Alice's House</h1>
      <div className="mt-8">
        <Card className="rounded-md px-2">
         <h2 className="px-4 text-xl font-medium text-foreground">Last 7 Days Energy Production</h2>
         <div className="grid grid-cols-7 gap-4">
          {Array.from({ length: 7}).map((_, index)=>(
            <div key={index} className="col-span-1 px-2 py-1 hover:bg-gray-200  bg-gray-100 rounded-md">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-xs font-medium text-foreground">19 Oct</h3>
              <p className="text-m font-semibold text-foreground">100 kwh</p>
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