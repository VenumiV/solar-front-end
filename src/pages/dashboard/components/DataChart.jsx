import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { format, toDate, startOfDay, subDays } from "date-fns";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";

const DataChart = ({ solarUnitId }) => {
  const [selectedRange, setSelectedRange] = useState("7");

  // Fetch grouped data for 7 and 30 days
  const { data: groupedData, isLoading: isLoadingGrouped, isError: isErrorGrouped } =
    useGetEnergyGenerationRecordsBySolarUnitQuery(
      {
        id: solarUnitId,
        groupBy: "date",
        limit: parseInt(selectedRange),
      },
      { skip: selectedRange === "1" || !solarUnitId }
    );

  // Fetch ungrouped data for 1 day
  const { data: ungroupedData, isLoading: isLoadingUngrouped, isError: isErrorUngrouped } =
    useGetEnergyGenerationRecordsBySolarUnitQuery(
      {
        id: solarUnitId,
        groupBy: undefined,
        limit: undefined,
      },
      { skip: selectedRange !== "1" || !solarUnitId }
    );

  const isLoading = selectedRange === "1" ? isLoadingUngrouped : isLoadingGrouped;
  const isError = selectedRange === "1" ? isErrorUngrouped : isErrorGrouped;
  const data = selectedRange === "1" ? ungroupedData : groupedData;

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  // Process data based on selected range
  const chartData = useMemo(() => {
    if (isLoading || isError) return [];
    
    if (selectedRange === "1") {
      if (!ungroupedData || ungroupedData.length === 0) {
        console.log("No ungrouped data available");
        return [];
      }
      
      // Process 1 day data into 4-hour intervals
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      console.log("Now:", now);
      console.log("One day ago:", oneDayAgo);
      console.log("Ungrouped data sample:", ungroupedData.slice(0, 3));

      // Filter records from last 24 hours (with a small buffer for timezone issues)
      const bufferMs = 1 * 60 * 60 * 1000; // 1 hour buffer
      const last24Hours = (ungroupedData || [])
        .filter((record) => {
          if (!record || !record.timestamp) return false;
          const recordDate = new Date(record.timestamp);
          // Add buffer to account for timezone differences
          const isValid = recordDate >= new Date(oneDayAgo.getTime() - bufferMs) && recordDate <= new Date(now.getTime() + bufferMs);
          return isValid;
        })
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      console.log("Last 24 hours records:", last24Hours.length);
      console.log("Sample records:", last24Hours.slice(0, 3));

      // Create 6 intervals of 4 hours each, from oldest to newest (left to right)
      // Intervals span the last 24 hours, which may cross day boundaries
      const intervals = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
      
      for (let i = 0; i < 6; i++) {
        const intervalStart = new Date(oneDayAgo.getTime() + i * 4 * 60 * 60 * 1000);
        const intervalEnd = new Date(oneDayAgo.getTime() + (i + 1) * 4 * 60 * 60 * 1000);
        
        // Format label to show date and time if from previous day, or just time if today
        const intervalStartDate = new Date(intervalStart);
        intervalStartDate.setHours(0, 0, 0, 0);
        const isFromYesterday = intervalStartDate.getTime() < today.getTime();
        
        let label;
        if (isFromYesterday) {
          // Show date and time for yesterday's intervals
          label = format(intervalStart, "MMM d HH:mm");
        } else {
          // Show just time for today's intervals
          label = format(intervalStart, "HH:mm");
        }
        
        intervals.push({ start: intervalStart, end: intervalEnd, label });
      }

      console.log("Intervals:", intervals.map(i => ({ 
        label: i.label, 
        start: format(i.start, "MMM d HH:mm"), 
        end: format(i.end, "MMM d HH:mm")
      })));

      const chartDataPoints = intervals.map((interval) => {
        // Check if interval overlaps with solar generation hours (8 AM - 5 PM)
        const intervalStartHour = interval.start.getHours();
        const intervalEndHour = interval.end.getHours();
        const solarStartHour = 8; // 8 AM
        const solarEndHour = 17; // 5 PM (17:00)
        
        // Check if interval overlaps with solar generation window (8 AM - 5 PM)
        // An interval overlaps if any part of it falls within 8 AM - 5 PM
        // Intervals that are completely before 8 AM or completely after 5 PM should be zero
        const intervalOverlapsSolarHours = 
          !(intervalEndHour <= solarStartHour || intervalStartHour >= solarEndHour);

        // If interval is completely outside solar hours (8 AM - 5 PM), set energy to zero
        // Energy should ONLY be produced during 8 AM - 5 PM, all other times must be zero
        if (!intervalOverlapsSolarHours) {
          console.log(`Interval ${interval.label}: Outside solar hours (8 AM - 5 PM), setting to 0`);
          return {
            time: interval.label,
            energy: 0,
          };
        }

        // Sum energy in this 4-hour interval (only for intervals within solar hours)
        const intervalRecords = last24Hours.filter((record) => {
          if (!record.timestamp) return false;
          const recordDate = new Date(record.timestamp);
          return recordDate >= interval.start && recordDate < interval.end;
        });

        const totalEnergy = intervalRecords.reduce(
          (sum, record) => {
            // Ensure each energy value is non-negative before summing
            const energy = Math.max(0, record.energyGenerated || 0);
            return sum + energy;
          },
          0
        );

        // Convert kWh to kW (average power over 4 hours)
        // kW = kWh / hours
        // Ensure final result is never negative (can be zero but not negative)
        const powerKw = Math.max(0, totalEnergy / 4);

        console.log(`Interval ${interval.label}: ${intervalRecords.length} records, ${totalEnergy} kWh, ${powerKw} kW`);

        return {
          time: interval.label,
          energy: Math.max(0, parseFloat(powerKw.toFixed(2))), // Double-check to ensure non-negative
        };
      });

      // Debug: Log the processed data
      console.log("1 Day Chart Data Points:", chartDataPoints);
      console.log("Chart data length:", chartDataPoints.length);

      return chartDataPoints;
    } else {
      // Process multi-day data (7 or 30 days)
      // Data comes newest to oldest, so reverse to show oldest to newest (left to right)
      if (!data || data.length === 0) return [];
      return data
        .slice(0, parseInt(selectedRange))
        .reverse() // Reverse to show oldest to newest
        .map((el) => {
          // Ensure energy is never negative (can be zero but not negative)
          const energy = Math.max(0, el.totalEnergy || 0);
          return {
            date: format(toDate(el._id.date), "MMM d"),
            energy: Math.max(0, energy), // Double-check to ensure non-negative
          };
        });
    }
  }, [data, selectedRange, isLoading, isError, ungroupedData]);

  const chartConfig = {
    energy: {
      label: selectedRange === "1" ? "Power (kW)" : "Energy (kWh)",
      color: "oklch(54.6% 0.245 262.881)",
    },
  };

  const title = "Energy Production Chart";

  return (
    <Card className="rounded-md p-4">
      <div className="flex justify-between items-center gap-2">
        <h2 className="text-xl font-medium text-foreground">{title}</h2>
        <div>
          <Select value={selectedRange} onValueChange={handleRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                className="text-foreground"
                placeholder="Select Range"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Day</SelectItem>
              <SelectItem value="7">7 Days</SelectItem>
              <SelectItem value="30">30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full h-[400px]">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Loading chart data...</p>
          </div>
        ) : isError ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-red-500">Error loading chart data</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">No data available for the selected range</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="w-full h-full">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 40,
                right: 20,
                top: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={selectedRange === "1" ? "time" : "date"}
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                tick={selectedRange === "1"}
                label={{
                  value: selectedRange === "1" ? "Time" : "Date",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                tickCount={10}
                label={{
                  value: selectedRange === "1" ? "kW" : "kWh",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="energy"
                type="natural"
                fill="var(--color-energy)"
                fillOpacity={0.4}
                stroke="var(--color-energy)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </div>
    </Card>
  );
};

export default DataChart;