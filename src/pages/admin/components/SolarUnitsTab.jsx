import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSolarUnitsQuery } from "@/lib/redux/query";
import { Zap, Plus, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router";

export function SolarUnitsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: solarUnits, isLoading: isLoadingSolarUnits, isError: isErrorSolarUnits, error: errorSolarUnits } = useGetSolarUnitsQuery();

  if (isLoadingSolarUnits) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isErrorSolarUnits) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="py-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-medium">Error loading solar units</p>
          <p className="text-sm text-red-500 mt-2">{errorSolarUnits?.message || "Unknown error"}</p>
        </CardContent>
      </Card>
    );
  }

  const filteredUnits = searchTerm !== "" ? solarUnits.filter(
    (unit) =>
      unit.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())) : solarUnits;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button asChild>
          <Link to="/admin/solar-units/create">
            <Plus className="mr-2 h-4 w-4" />
            Add New Unit
          </Link>
        </Button>
      </div>

      <div className="w-full max-w-md">
        <Input
          placeholder="Search solar units..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUnits.map((unit) => (
          <Card key={unit._id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold text-foreground">{unit.serialNumber}</h3>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  unit.status === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : unit.status === "MAINTENANCE"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {unit.status}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                <p className="text-lg font-semibold text-foreground">
                  {unit.capacity} kW
                </p>
              </div>
              {unit.userId && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Assigned User</p>
                  <p className="text-sm font-medium text-foreground">
                    {unit.userId.email}
                    {unit.userId.firstName && ` (${unit.userId.firstName} ${unit.userId.lastName || ""})`}
                  </p>
                </div>
              )}
              {!unit.userId && (
                <div>
                  <p className="text-xs text-muted-foreground">No user assigned</p>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/admin/solar-units/${unit._id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/admin/solar-units/${unit._id}`)}
                >
                  View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredUnits.length === 0 && (
        <Card className="p-12 text-center">
          <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium mb-2">
            {searchTerm ? `No solar units found matching "${searchTerm}"` : "No solar units found"}
          </p>
          <p className="text-sm text-gray-500">
            {searchTerm ? "Try adjusting your search term" : "Click 'Add New Unit' to create your first solar unit"}
          </p>
        </Card>
      )}
    </div>
  );
}