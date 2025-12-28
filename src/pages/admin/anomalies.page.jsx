import { AdminAnomaliesTab } from "./components/AdminAnomaliesTab";

export default function AdminAnomaliesPage() {
  return (
    <main className="mt-4 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Anomalies Management</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          View and manage all anomalies across all solar units
        </p>
      </div>
      <div className="mt-8">
        <AdminAnomaliesTab />
      </div>
    </main>
  );
}

