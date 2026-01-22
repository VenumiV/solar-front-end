import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import EnergyProductionCards from "../../dashboard/components/EnergyProductionCards";
import Tab from "../../dashboard/components/EnergyTab";
import { useEffect } from "react";
import { useState } from "react";
import { subDays, toDate, format } from "date-fns";
import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";

const SolarEnergyProduction = () => {
  const energyProductionData = [
    { day: "Mon", date: "Aug 18", production: 34.1, hasAnomaly: false },
    { day: "Tue", date: "Aug 19", production: 3.2, hasAnomaly: true },
    { day: "Wed", date: "Aug 20", production: 44.7, hasAnomaly: false },
    { day: "Thu", date: "Aug 21", production: 21.9, hasAnomaly: false },
    { day: "Fri", date: "Aug 22", production: 0, hasAnomaly: true },
    { day: "Sat", date: "Aug 23", production: 43, hasAnomaly: false },
    { day: "Sun", date: "Aug 24", production: 26.8, hasAnomaly: false },
  ];

  const tabs = [
    { label: "All", value: "all" },
    { label: "Anomaly", value: "anomaly" },
  ];

  const selectedTab = useSelector((state) => state.ui.selectedHomeTab);

  // const filteredEnergyProductionData =
  // selectedTab === "all"
  //   ? energyProductionData
  //   : selectedTab === "anomaly"
  //   ? energyProductionData.filter((el) => el.hasAnomaly)
  //   : [];

  const { data, isLoading, isError, error } =
    useGetEnergyGenerationRecordsBySolarUnitQuery({
      id: "690c024481b1e60d4e380875",
      groupBy: "date",
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || isError) {
    return <div>Error: {error.message}</div>;
  }

  const newEnergyProductionData = data.slice(0, 7).map((el) => {
    return {
      day: format(toDate(el._id.date), "EEE"),
      date: format(toDate(el._id.date), "MMM d"),
      production: el.totalEnergy,
      hasAnomaly: false,
    };
  });

  const filteredEnergyProductionData = newEnergyProductionData.filter((el) => {
    if (selectedTab === "all") {
      return true;
    } else if (selectedTab === "anomaly") {
      return el.hasAnomaly;
    }
  });

  return (
    <section className="px-4 sm:px-6 lg:px-12 font-[Inter] py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-gray-900">Solar Energy Production</h2>
          <p className="text-gray-600 text-sm sm:text-base">Daily energy output for the past 7 days</p>
        </div>
        <div className="mt-6 flex items-center gap-x-4 flex-wrap">
          {tabs.map((tab) => {
            return <Tab key={tab.value} tab={tab} />;
          })}
        </div>
        <div className="mt-6">
          <EnergyProductionCards
            energyProductionData={filteredEnergyProductionData}
          />
        </div>
      </div>
    </section>
  );
};

export default SolarEnergyProduction;