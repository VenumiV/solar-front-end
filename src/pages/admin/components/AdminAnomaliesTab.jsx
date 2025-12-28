import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetAllAnomaliesQuery, useResolveAnomalyMutation, useGetSolarUnitsQuery } from "@/lib/redux/query";
import { format } from "date-fns";
import { TriangleAlert, CheckCircle2, AlertCircle, Info, AlertTriangle, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminAnomaliesTab() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [resolvedFilter, setResolvedFilter] = useState("all");
  const [solarUnitFilter, setSolarUnitFilter] = useState("all");

  const { data: anomalies, isLoading, isError, error, refetch } = useGetAllAnomaliesQuery({
    type: typeFilter !== "all" ? typeFilter : undefined,
    severity: severityFilter !== "all" ? severityFilter : undefined,
    resolved: resolvedFilter === "all" ? undefined : resolvedFilter === "true",
    solarUnitId: solarUnitFilter !== "all" ? solarUnitFilter : undefined,
  });

  const { data: solarUnits } = useGetSolarUnitsQuery();
  const [resolveAnomaly, { isLoading: isResolving }] = useResolveAnomalyMutation();

  const handleResolve = async (anomalyId) => {
    try {
      await resolveAnomaly(anomalyId).unwrap();
      refetch();
    } catch (error) {
      console.error("Error resolving anomaly:", error);
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "WARNING":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "INFO":
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <TriangleAlert className="h-4 w-4" />;
    }
  };

  const getSeverityBadge = (severity) => {
    const variants = {
      CRITICAL: "bg-red-100 text-red-800 border-red-200",
      WARNING: "bg-yellow-100 text-yellow-800 border-yellow-200",
      INFO: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return (
      <Badge className={`${variants[severity] || "bg-gray-100 text-gray-800"} border flex items-center gap-1.5 px-2 py-1`}>
        {getSeverityIcon(severity)}
        {severity}
      </Badge>
    );
  };

  const getTypeBadge = (type) => {
    return (
      <Badge variant="outline" className="text-xs">
        {type}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="py-8 text-center">
          <p className="text-red-600 font-medium">Error loading anomalies</p>
          <p className="text-sm text-red-500 mt-2">{error?.message || "Unknown error"}</p>
        </CardContent>
      </Card>
    );
  }

  const items = anomalies ?? [];
  const unresolvedCount = items.filter((a) => !a.resolved).length;
  const criticalCount = items.filter((a) => a.severity === "CRITICAL" && !a.resolved).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Anomalies</p>
                <p className="text-2xl font-bold text-gray-900">{items.length}</p>
              </div>
              <TriangleAlert className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Unresolved</p>
                <p className="text-2xl font-bold text-gray-900">{unresolvedCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Critical</p>
                <p className="text-2xl font-bold text-gray-900">{criticalCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter anomalies by type, severity, status, or solar unit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
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

            <div>
              <label className="text-sm font-medium mb-2 block">Severity</label>
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

            <div>
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

            <div>
              <label className="text-sm font-medium mb-2 block">Solar Unit</label>
              <Select value={solarUnitFilter} onValueChange={setSolarUnitFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Units</SelectItem>
                  {solarUnits?.map((unit) => (
                    <SelectItem key={unit._id} value={unit._id}>
                      {unit.serialNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anomalies List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Anomalies ({items.length})</CardTitle>
              <CardDescription>View and manage anomalies across all solar units</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-center py-12">
              <TriangleAlert className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No anomalies found</p>
              <p className="text-sm text-gray-500 mt-2">
                {typeFilter !== "all" || severityFilter !== "all" || resolvedFilter !== "all" || solarUnitFilter !== "all"
                  ? "Try adjusting your filters"
                  : "All systems are operating normally"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((anomaly) => (
                <Card
                  key={anomaly._id}
                  className={`border-l-4 ${
                    anomaly.severity === "CRITICAL"
                      ? "border-l-red-500 bg-red-50/50"
                      : anomaly.severity === "WARNING"
                      ? "border-l-yellow-500 bg-yellow-50/50"
                      : "border-l-blue-500 bg-blue-50/50"
                  } hover:shadow-md transition-shadow`}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {getSeverityBadge(anomaly.severity)}
                              {getTypeBadge(anomaly.anomalyType)}
                              {anomaly.resolved && (
                                <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1.5">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Resolved
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {anomaly.solarUnitId?.serialNumber || "Unknown Solar Unit"}
                            </h3>
                            <p className="text-sm text-gray-600">{anomaly.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <span>
                            Detected: {anomaly.detectionTimestamp
                              ? format(new Date(anomaly.detectionTimestamp), "MMM d, yyyy 'at' h:mm a")
                              : "Unknown"}
                          </span>
                          {anomaly.resolved && anomaly.resolvedAt && (
                            <span>
                              Resolved: {format(new Date(anomaly.resolvedAt), "MMM d, yyyy 'at' h:mm a")}
                            </span>
                          )}
                        </div>
                      </div>
                      {!anomaly.resolved && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResolve(anomaly._id)}
                          disabled={isResolving}
                          className="whitespace-nowrap"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

