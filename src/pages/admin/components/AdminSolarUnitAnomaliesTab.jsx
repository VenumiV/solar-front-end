import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
//import { Button } from "@/components/ui/button";
import { useGetAllAnomaliesQuery } from "@/lib/redux/query";
import { format } from "date-fns";

export function AdminSolarUnitAnomaliesTab() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [resolvedFilter, setResolvedFilter] = useState("all");

  const { data: anomalies, isLoading, isError, error, refetch } = useGetAllAnomaliesQuery({
    type: typeFilter !== "all" ? typeFilter : undefined,
    severity: severityFilter !== "all" ? severityFilter : undefined,
    resolved: resolvedFilter === "all" ? undefined : resolvedFilter === "true",
  });

  if (isLoading) {
    return <div>Loading anomalies...</div>;
  }

  if (isError) {
    return <div>Error loading anomalies: {error?.data?.message ?? "Unknown error"}</div>;
  }

  const items = anomalies ?? [];

  return (
    <div className="space-y-6">
      <Card className="rounded-md p-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium mb-2 block">Filter by Type</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="MECHANICAL">Mechanical</SelectItem>
                <SelectItem value="TEMPERATURE">Temperature</SelectItem>
                <SelectItem value="SHADING">Shading</SelectItem>
                <SelectItem value="SENSOR_ERROR">Sensor Error</SelectItem>
                <SelectItem value="BELOW_AVERAGE">Below Average</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium mb-2 block">Filter by Severity</label>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
                <SelectItem value="WARNING">Warning</SelectItem>
                <SelectItem value="INFO">Info</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select value={resolvedFilter} onValueChange={setResolvedFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="false">Unresolved</SelectItem>
                <SelectItem value="true">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

         
        </div>
      </Card>

      <Card className="rounded-md p-4">
        <h2 className="text-xl font-medium text-foreground mb-4">
          All Anomalies ({items.length})
        </h2>

        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No anomalies found for the selected filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="py-2 pr-4">Solar Unit</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Severity</th>
                  <th className="py-2 pr-4">Detected At</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Description</th>
                </tr>
              </thead>
              <tbody>
                {items.map((anomaly) => (
                  <tr key={anomaly._id} className="border-b last:border-0">
                    <td className="py-2 pr-4">
                      {anomaly.solarUnitId?.serialNumber ?? "Unknown"}
                    </td>
                    <td className="py-2 pr-4">{anomaly.anomalyType}</td>
                    <td className="py-2 pr-4">{anomaly.severity}</td>
                    <td className="py-2 pr-4">
                      {anomaly.detectionTimestamp
                        ? format(new Date(anomaly.detectionTimestamp), "MMM d, yyyy HH:mm")
                        : "-"}
                    </td>
                    <td className="py-2 pr-4">
                      {anomaly.resolved ? "Resolved" : "Unresolved"}
                    </td>
                    <td className="py-2 pr-4 max-w-md truncate" title={anomaly.description}>
                      {anomaly.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}


