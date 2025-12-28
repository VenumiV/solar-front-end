import { AdminSolarUnitAnomaliesTab } from "./components/AdminSolarUnitAnomaliesTab";

export default function SolarUnitAnomaliesPage() {
  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">Solar Unit Anomalies</h1>
      <p className="text-gray-600 mt-2">
        View and filter all detected anomalies across solar units
      </p>
      <div className="mt-8">
        <AdminSolarUnitAnomaliesTab />
      </div>
    </main>
  );
}


