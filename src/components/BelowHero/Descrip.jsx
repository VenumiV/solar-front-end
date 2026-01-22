import React from "react";
import solarPanel1 from "@/assets/images/Solar-Panels.png";
import solarPanel2 from "@/assets/images/Solar-Panels.png";
import { useGetSolarUnitforUserQuery, useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";

const Descrip = () => {
  const { user } = useUser();
  const { data: solarUnit } = useGetSolarUnitforUserQuery(undefined, {
    skip: !user,
  });

  const { data: monthlyEnergy } = useGetEnergyGenerationRecordsBySolarUnitQuery(
    {
      id: solarUnit?._id,
      groupBy: "date",
      limit: 30,
    },
    {
      skip: !solarUnit?._id,
    }
  );

  // Calculate total energy for the last 30 days
  const totalEnergy = monthlyEnergy?.reduce((sum, record) => sum + (record.totalEnergy || 0), 0) || 0;

  return (
    <div className="flex flex-col items-start gap-8 sm:gap-12 px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16 bg-white"> 
      {/* First Section - Solar Energy Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full">
        <div className="order-2 lg:order-1">
          <img
            src={solarPanel1} 
            alt="Solar panels"
            className="rounded-xl sm:rounded-2xl w-full h-auto object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
        <div className="order-1 lg:order-2 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Your Solar Energy<br className="hidden sm:block"/> Generation
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            This month, your solar panels generated 
            <span className="font-semibold text-blue-600"> {totalEnergy > 0 ? `${totalEnergy.toFixed(1)} kWh` : "0 kWh"} </span>
            of clean energy, helping you save on electricity bills and reduce your carbon footprint. Track
            your energy production trends and see how much power you contribute
            back to the grid.
          </p>
        </div>
      </div>
     

      {/* Problem Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 w-full mt-12 sm:mt-16">
        <div className="order-2 lg:order-1 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full w-fit">
            <span className="text-sm font-semibold text-red-600">Problem</span>
          </div>
          <h2 className="text-gray-900 font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight">
            Home solar systems can face reduced efficiency and missed savings due to panel shading, dirt, unexpected drops in output, or inverter issues.
          </h2>
          <ul className="space-y-3 text-base sm:text-lg text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold text-lg mt-1">›</span>
              <span>Panel shading or dirt accumulation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold text-lg mt-1">›</span>
              <span>Unexpected drops in energy output</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold text-lg mt-1">›</span>
              <span>Inverter errors and malfunctions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold text-lg mt-1">›</span>
              <span>Missed maintenance opportunities</span>
            </li>
          </ul>
        </div>
        <div className="order-1 lg:order-2">
          <img
            src={solarPanel2} 
            alt="Solar panels"
            className="rounded-xl sm:rounded-2xl w-full h-auto object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      </div>
      {/* Solution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 w-full mt-12 sm:mt-16">
        <div className="relative">
          <img
            src={solarPanel1} 
            alt="Solar panels"
            className="rounded-xl sm:rounded-2xl w-full h-auto object-cover shadow-lg hover:shadow-xl transition-all duration-300"
          />
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 rounded-lg bg-white/20 backdrop-blur-sm px-4 py-2 w-fit mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-5 w-5 text-white" 
            >
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
            </svg>
            <span className="text-sm font-semibold text-white">Solution</span>
          </div>
          <h2 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl mb-6 leading-tight">
            Monitor your solar panels, receive instant alerts for anomalies, and optimize your energy usage for maximum savings.
          </h2>
          <ul className="space-y-3 text-base sm:text-lg text-white/90">
            <li className="flex items-start gap-3">
              <span className="text-yellow-300 font-bold text-lg mt-1">✓</span>
              <span>Real-time monitoring and alerts</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-300 font-bold text-lg mt-1">✓</span>
              <span>Automated anomaly detection</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-300 font-bold text-lg mt-1">✓</span>
              <span>Historical performance tracking</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-300 font-bold text-lg mt-1">✓</span>
              <span>Actionable insights for optimization</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full mt-12 sm:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-blue-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <ul className="space-y-3 text-base sm:text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg mt-1">✓</span>
                <span>Real-time energy monitoring</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg mt-1">✓</span>
                <span>Automated anomaly detection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg mt-1">✓</span>
                <span>Historical performance tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg mt-1">✓</span>
                <span>Instant alerts and notifications</span>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-green-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Benefits</h2>
            <ul className="space-y-3 text-base sm:text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg mt-1">✓</span>
                <span>Maximize energy savings</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg mt-1">✓</span>
                <span>Early issue detection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg mt-1">✓</span>
                <span>Optimize system performance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg mt-1">✓</span>
                <span>Reduce maintenance costs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Descrip;
