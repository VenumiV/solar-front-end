import React from "react";
import imgWindTurbine1 from "./wind-turbine-2.png";
import solarConstruct from "./solar-construction.png";
import imgWindTurbine3 from "./wind-turbine-3.png";
import profilePic from "./profile-photos.png";

const Descrip = () => {
  return (
    <div className="flex flex-col items-start gap-8 sm:gap-12 px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16 bg-white"> 
      {/* First Section - Solar Energy Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full">
        <div className="order-2 lg:order-1">
          <img
            src={imgWindTurbine1} 
            alt="Wind turbine"
            className="rounded-xl sm:rounded-2xl w-full h-auto object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
        <div className="order-1 lg:order-2 flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Your Solar Energy<br className="hidden sm:block"/> Generation
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
              This month, your solar panels generated 
              <span className="font-semibold text-blue-600"> X kWh </span>
              of clean energy, helping you save on electricity bills and reduce your carbon footprint. Track
              your energy production trends and see how much power you contribute
              back to the grid.
            </p>
          </div>
          <div className="h-48 sm:h-56 lg:h-64 w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={solarConstruct}
              alt="Solar Construction"
              className="h-full w-full object-cover"
            />
          </div>        
        </div>
      </div>
     

      {/* Problem Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 w-full my-8 sm:my-12">
        <div className="order-2 lg:order-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full">
            <span className="text-sm font-semibold text-red-600">Problem</span>
          </div>
          <div>
            <h2 className="mb-6 sm:mb-8 text-gray-900 font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight">
              Home solar systems can face reduced efficiency and missed savings due to panel shading, dirt, unexpected drops in output, or inverter issues. Stay ahead with instant anomaly alerts.
            </h2>
          </div>
          <div className="mt-6">
            <ul className="space-y-4 text-lg sm:text-xl text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl mt-1">›</span>
                <span>Panel shading or dirt</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl mt-1">›</span>
                <span>Unexpected drop in output</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl mt-1">›</span>
                <span>Inverter errors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl mt-1">›</span>
                <span>Missed maintenance reminders</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <img
            src={imgWindTurbine3} 
            alt="Wind turbine"
            className="rounded-xl sm:rounded-2xl w-full h-auto object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      </div>
      {/* Solution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 w-full my-8 sm:my-12">
        <div className="relative group">
          <img
            src={imgWindTurbine1} 
            alt="Wind turbine"
            className="rounded-xl sm:rounded-2xl w-full h-auto object-cover shadow-lg hover:shadow-xl transition-all duration-300"
          />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
            <div className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 sm:p-6 shadow-xl backdrop-blur-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mb-2 h-6 w-6 sm:h-8 sm:w-8 fill-current text-white" 
                aria-hidden="true"
              >
                <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              </svg>
              <span className="text-lg font-bold sm:text-xl text-white">Aelora</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:px-10 md:py-12 shadow-lg">
          <div className="flex flex-1 mb-6">
            <div className="flex items-center gap-2 rounded-lg bg-lime-400 px-3 py-1.5 sm:px-4 sm:py-2 shadow-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-4 w-4" 
                aria-hidden="true"
              >
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
              </svg>
              <span className="text-sm font-semibold sm:text-base text-black">Solution</span>
            </div>
          </div>
          <h2 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl mb-6 leading-tight">
            The Solar Home Dashboard empowers you to monitor your solar panels, receive instant alerts for anomalies, and optimize your energy usage for maximum savings and peace of mind.
          </h2>
          <div className="mt-6">
            <ul className="list-none space-y-4 text-lg sm:text-xl text-white">
              <li className="flex items-start gap-3">
                <span className="text-lime-400 font-bold text-xl mt-1">›</span>
                <span>Panel shading or dirt</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lime-400 font-bold text-xl mt-1">›</span>
                <span>Unexpected drop in output</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lime-400 font-bold text-xl mt-1">›</span>
                <span>Inverter errors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lime-400 font-bold text-xl mt-1">›</span>
                <span>Missed maintenance reminders</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Goals and Needs Section */}
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-8 sm:gap-10 lg:gap-12 p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl shadow-lg">
        {/* Left side */}
        <div className="w-full lg:w-1/2 space-y-8 sm:space-y-10">
          {/* Goals */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Goals:</h2>
            <ul className="list-none space-y-3 sm:space-y-4 text-lg sm:text-xl text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-xl mt-1">›</span>
                <span>Maximize solar energy savings.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-xl mt-1">›</span>
                <span>Detect and resolve issues early.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-xl mt-1">›</span>
                <span>Track daily, weekly, and monthly output.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-xl mt-1">›</span>
                <span>Get notified of anomalies instantly.</span>
              </li>
            </ul>
          </div>

          {/* Needs */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Needs:</h2>
            <ul className="list-none space-y-3 sm:space-y-4 text-lg sm:text-xl text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl mt-1">›</span>
                <span>A simple dashboard for real-time monitoring.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl mt-1">›</span>
                <span>Instant alerts for system anomalies.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl mt-1">›</span>
                <span>Easy access to historical performance data.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl mt-1">›</span>
                <span>Clear, actionable insights for better energy management.</span>
              </li>
            </ul>
          </div>

          {/* Profile Card */}
          <div className="flex flex-col sm:flex-row gap-4 rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-lg border border-gray-200">
            <div className="flex-shrink-0">
              <img src={profilePic} alt="Profile" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-gray-200" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm sm:text-base text-gray-900 font-bold">
                ALez P. <span className="text-gray-500 font-medium">42 y.o</span>
              </p>
              <p className="text-sm sm:text-base font-medium text-gray-600">
                Homeowner <span className="text-gray-900 pl-2">Solar User</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right side image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={solarConstruct}
            alt="Solar construction"
            className="rounded-xl sm:rounded-2xl w-full h-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      </div>


     
      

    </div>
  );
};

export default Descrip;
