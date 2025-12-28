import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { detectAnomalies } from "@/lib/anomalyDetection";
import {
  useGetAnomaliesForUserQuery,
  useGetAnomalyStatisticsQuery,
  useResolveAnomalyMutation,
  useGetEnergyGenerationRecordsBySolarUnitQuery,useRunAnomalyDetectionMutation,
} from "@/lib/redux/query";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts";
import { Button } from "@/components/ui/button";

const AnomaliesList = () => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [resolvedFilter, setResolvedFilter] = useState("false");

  const { data: anomalies, isLoading, isError, refetch } = useGetAnomaliesForUserQuery({
    type: typeFilter !== "all" ? typeFilter : undefined,
    severity: severityFilter !== "all" ? severityFilter : undefined,
    resolved: resolvedFilter === "true",
  });

  const { data: statistics } = useGetAnomalyStatisticsQuery({
    resolved: resolvedFilter === "true",
  });

  const [resolveAnomaly] = useResolveAnomalyMutation();
  const [runAnomalyDetection, { isLoading: isDetecting }] = useRunAnomalyDetectionMutation();

  const handleRunDetection = async () => {
    try {
      const result = await runAnomalyDetection().unwrap();
      console.log("Anomaly detection result:", result);
      // Refetch anomalies after detection
      refetch();
    } catch (error) {
      console.error("Failed to run anomaly detection:", error);
    }
  };

  const handleResolve = async (anomalyId) => {
    try {
      await resolveAnomaly(anomalyId).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to resolve anomaly:", error);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "text-red-600 bg-red-50 border-red-200";
      case "WARNING":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "INFO":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getTypeDisplayName = (type) => {
    const names = {
      MECHANICAL: "Mechanical",
      TEMPERATURE: "Temperature",
      SHADING: "Shading",
      SENSOR_ERROR: "Sensor Error",
      BELOW_AVERAGE: "Below Average",
    };
    return names[type] || type;
  };

  // Colors for pie chart
  const COLORS = {
    Mechanical: "oklch(54.6% 0.245 262.881)",
    Temperature: "oklch(70% 0.15 50)",
    Shading: "oklch(60% 0.2 200)",
    "Sensor Error": "oklch(50% 0.25 0)",
    "Below Average": "oklch(65% 0.18 280)",
  };

  if (isLoading) {
    return (
      <Card className="rounded-md p-4">
        <Skeleton className="h-6 w-64 mb-4" />
        <Skeleton className="h-64 w-full" />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="rounded-md p-4">
        <p className="text-red-500">Error loading anomalies</p>
      </Card>
    );
  }

  const filteredAnomalies = anomalies || [];

  return (
    <div className="space-y-6">
      {/* Filters and Detection Button */}
      <Card className="rounded-md p-4">
        <div className="flex flex-wrap gap-4 items-end justify-between mb-4">
          <div className="flex flex-wrap gap-4 items-end flex-1">
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
                <SelectItem value="false">Unresolved</SelectItem>
                <SelectItem value="true">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          </div>
          <Button
            onClick={handleRunDetection}
            disabled={isDetecting}
            variant="default"
            className="min-w-[180px]"
          >
            {isDetecting ? "Detecting..." : "Run Anomaly Detection"}
          </Button>
        </div>
      </Card>

      {/* Pie Chart */}
      {statistics && statistics.pieChartData && statistics.pieChartData.length > 0 && (
        <Card className="rounded-md p-4">
          <h2 className="text-xl font-medium text-foreground mb-4">
            Anomaly Distribution by Type
          </h2>
          <div className="w-full h-[400px]">
            <ChartContainer
              config={statistics.pieChartData.reduce((acc, item) => {
                acc[item.name.replace(/\s+/g, "")] = {
                  label: item.name,
                  color: COLORS[item.name] || "oklch(50% 0.2 200)",
                };
                return acc;
              }, {})}
              className="w-full h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statistics.pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                  >
                    {statistics.pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.name] || "oklch(50% 0.2 200)"}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name, props) => [
                          `${value} (${props.payload.percentage}%)`,
                          name,
                        ]}
                      />
                    }
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Total Anomalies: <span className="font-semibold">{statistics.total}</span>
            </p>
          </div>
        </Card>
      )}

      {/* Anomalies List */}
      <Card className="rounded-md p-4">
        <h2 className="text-xl font-medium text-foreground mb-4">
          Detected Anomalies ({filteredAnomalies.length})
        </h2>

        {filteredAnomalies.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No anomalies found matching your filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAnomalies.map((anomaly) => (
              <div
                key={anomaly._id}
                className={`border rounded-lg p-4 ${
                  anomaly.resolved ? "opacity-60" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(
                          anomaly.severity
                        )}`}
                      >
                        {anomaly.severity}
                      </span>
                      <span className="font-semibold text-foreground">
                        {getTypeDisplayName(anomaly.anomalyType)}
                      </span>
                      {anomaly.resolved && (
                        <span className="text-xs text-green-600 font-medium">
                          ✓ Resolved
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {anomaly.description}
                    </p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>
                        Detected: {format(new Date(anomaly.detectionTimestamp), "MMM d, yyyy HH:mm")}
                      </span>
                      <span>
                        Affected Period: {format(new Date(anomaly.affectedStartDate), "MMM d")} -{" "}
                        {format(new Date(anomaly.affectedEndDate), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                  {!anomaly.resolved && (
                    <Button
                      onClick={() => handleResolve(anomaly._id)}
                      variant="outline"
                      size="sm"
                    >
                      Mark as Resolved
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AnomaliesList;

