import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RadialBar, RadialBarChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { format, parseISO } from "date-fns";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCapacityFactorBySolarUnitQuery } from "@/lib/redux/query";

const CapacityFactorChart = ({ solarUnitId }) => {
  const [selectedRange, setSelectedRange] = useState("30");

  const { data, isLoading, isError } = useGetCapacityFactorBySolarUnitQuery(
    {
      id: solarUnitId,
      days: selectedRange,
    },
    { skip: !solarUnitId }
  );

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  // Prepare data for RadialBarChart (overall capacity factor)
  const radialData = useMemo(() => {
    if (!data || isLoading || isError) return [];
    
    return [
      {
        name: "Capacity Factor",
        value: data.overallCapacityFactor || 0,
        fill: "oklch(54.6% 0.245 262.881)",
      },
    ];
  }, [data, isLoading, isError]);

  // Prepare data for BarChart (daily capacity factors)
  const barChartData = useMemo(() => {
    if (!data || !data.dailyData || isLoading || isError) return [];
    
    return data.dailyData.map((day) => ({
      date: format(parseISO(day.date), "MMM d"),
      capacityFactor: parseFloat(day.capacityFactor.toFixed(2)),
    }));
  }, [data, isLoading, isError]);

  const chartConfig = {
    capacityFactor: {
      label: "Capacity Factor (%)",
      color: "oklch(54.6% 0.245 262.881)",
    },
  };

  return (
    <Card className="rounded-md p-4">
      <div className="flex justify-between items-center gap-2 mb-4">
        <div>
          <h2 className="text-xl font-medium text-foreground">Capacity Factor</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Efficiency: Actual vs Theoretical Maximum Energy Generation
          </p>
        </div>
        <div>
          <Select value={selectedRange} onValueChange={handleRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                className="text-foreground"
                placeholder="Select Range"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 Days</SelectItem>
              <SelectItem value="30">30 Days</SelectItem>
              <SelectItem value="90">90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="h-[400px] flex items-center justify-center">
          <p className="text-gray-500">Loading capacity factor data...</p>
        </div>
      ) : isError ? (
        <div className="h-[400px] flex items-center justify-center">
          <p className="text-red-500">Error loading capacity factor data</p>
        </div>
      ) : !data ? (
        <div className="h-[400px] flex items-center justify-center">
          <p className="text-gray-500">No data available</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overall Capacity Factor - Radial Bar Chart */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md h-64">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <RadialBarChart
                  data={radialData}
                  innerRadius="60%"
                  outerRadius="90%"
                  startAngle={90}
                  endAngle={-270}
                  barSize={10}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    fill="var(--color-capacityFactor)"
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => [`${value}%`, "Capacity Factor"]}
                      />
                    }
                  />
                </RadialBarChart>
              </ChartContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-3xl font-bold text-foreground">
                {data.overallCapacityFactor?.toFixed(2)}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Overall Capacity Factor ({selectedRange} days)
              </p>
              <div className="mt-2 text-xs text-muted-foreground">
                <p>Actual: {(data.actualEnergyGenerated || 0).toFixed(2)} kWh</p>
                <p>Theoretical: {(data.theoreticalMaximum || 0).toFixed(2)} kWh</p>
              </div>
            </div>
          </div>

          {/* Daily Capacity Factors - Bar Chart */}
          {barChartData.length > 0 && (
            <div className="w-full h-[300px]">
              <h3 className="text-lg font-medium text-foreground mb-4">
                Daily Capacity Factor Trend
              </h3>
              <ChartContainer config={chartConfig} className="w-full h-full">
                <BarChart
                  accessibilityLayer
                  data={barChartData}
                  margin={{
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    label={{
                      value: "Date",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    label={{
                      value: "Capacity Factor (%)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        formatter={(value) => [`${value}%`, "Capacity Factor"]}
                      />
                    }
                  />
                  <Bar
                    dataKey="capacityFactor"
                    fill="var(--color-capacityFactor)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default CapacityFactorChart;

