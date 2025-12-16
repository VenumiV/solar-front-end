import React from "react";
import imgWindTurbine1 from "./wind-turbine-2.png";
import solarConstruct from "./solar-construction.png";
import imgWindTurbine3 from "./wind-turbine-3.png";
import profilePic from "./profile-photos.png";

const Descrip = () => {
  return (
    <div className="flex flex-col items-start gap-4 px-12"> 
    <div className="grid grid-cols-2">
    <div>
    <img
        src={imgWindTurbine1} 
        alt="Wind turbine"
        className="rounded-xl"
      />
      
    </div>
      <div className="ml-12">
        <div>
        <h1 className="text-5xl font-semibold my-10">Your Solar Energy<br/> Generation</h1>
        <p className="mb-6">
          This month, your solar panels generated 
          <span className="font-semibold text-blue-600"> X kWh </span>
           of clean energy, helping
          you save on electricity bills and reduce your carbon footprint. Track
          your energy production trends and see how much power you contribute
          back to the grid.
        </p>

        </div>
        <div className="mx-auto h-40 w-56 overflow-hidden rounded-2xl sm:h-48 sm:w-64 lg:mx-0">
        <img
            src={solarConstruct}
            alt="Solar Construction"
            className="h-full w-full object-cover"
        />
        </div>        
      </div>
    </div>
     

     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 m-6 md:m-10">
        <div>
            <div>Problem</div>
            <div>
              <h2 className="mb-8 text-gray-900 font-bold text-2xl sm:mb-12 sm:text-3xl lg:text-4xl">Home solar systems can face reduced efficiency and missed savings due to panel shading, dirt, unexpected drops in output, or inverter issues. Stay ahead with instant anomaly alerts.</h2>
            </div>
            <div className="mt-4 ">
            <ul className="space-y-3 text-xl text-gray-600">
                <li className="before:content-['>'] before:text-red-500 before:mr-4">
                Panel shading or dirt                </li>
                <li className="before:content-['>'] before:text-red-500 before:mr-4">
                Unexpected drop in output
                </li>
                <li className="before:content-['>'] before:text-red-500 before:mr-4">
                Inverter errors
                </li>
                <li className="before:content-['>'] before:text-red-500 before:mr-4">
                Missed maintenance reminders
                </li>
                </ul>


            </div>
        </div>
        <div>
        <img
        src={imgWindTurbine3} 
        alt="Wind turbine"
        className="rounded-xl"
      />


        </div>

     </div>
     <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 m-6 md:m-10">
      <div className="relative">
     <img
        src={imgWindTurbine1} 
        alt="Wind turbine"
        className="rounded-xl  "
      />
      <div class="absolute bottom-4 left-4 sm:bottom-8 sm:left-8"><div class="flex flex-col items-center rounded-2xl bg-blue-500 p-4 text-white sm:p-6"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle mb-2 h-6 w-6 fill-current sm:h-8 sm:w-8" aria-hidden="true"><path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path></svg><span class="text-lg font-bold sm:text-xl">Aelora</span></div></div>
      
        

      </div>
      <div className="bg-blue-400 rounded-2xl p-6 md:px-10 md:py-12">
      <div className="flex flex-1 py-18 ">

      <div class="flex items-center gap-2 rounded-lg bg-lime-400 px-3 py-1.5 text-black sm:px-4 sm:py-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap h-4 w-4" aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
        <span class="text-sm font-medium sm:text-base">Solution</span></div>
      </div>
      
      
        <h2 className="text-white font-bold text-3xl md:text-4xl pr-24">The Solar Home Dashboard empowers you to monitor your solar panels, receive instant alerts for anomalies, and optimize your energy usage for maximum savings and peace of mind.</h2>
        <div className="mt-4 ">
            <ul className="list-none space-y-3 text-lg text-white">
                <li className="before:content-['>'] before:text-lime-400 before:mr-4">
                Panel shading or dirt                </li>
                <li className="before:content-['>'] before:text-lime-400 before:mr-4">
                Unexpected drop in output
                </li>
                <li className="before:content-['>'] before:text-lime-400 before:mr-4">
                Inverter errors
                </li>
                <li className="before:content-['>'] before:text-lime-400 before:mr-4">
                Missed maintenance reminders
                </li>
                </ul>


            </div>
      </div>

     </div>

     <div className="w-full flex flex-col md:flex-col lg:flex-row items-start md:items-center gap-10 p-10">
  {/* Left side */}
  <div className="md:w-1/2 space-y-10">
    
    {/* Goals */}
    <div>
      <h2 className="text-3xl font-bold text-black mb-4">Goals:</h2>
      <ul className="list-none space-y-3 text-xl text-black">
        <li className="flex items-start">
          <span className="mr-3">›</span> Maximize solar energy savings.
        </li>
        <li className="flex items-start">
          <span className="mr-3">›</span> Detect and resolve issues early.
        </li>
        <li className="flex items-start">
          <span className="mr-3">›</span> Track daily, weekly, and monthly output.
        </li>
        <li className="flex items-start">
          <span className="mr-3">›</span> Get notified of anomalies instantly.
        </li>
      </ul>
    </div>

    {/* Needs */}
    <div>
      <h2 className="text-3xl font-bold text-black mb-4">Needs:</h2>
      <ul className="list-none space-y-3 text-xl text-black">
        <li className="flex items-start">
          <span className="mr-3">›</span> A simple dashboard for real-time monitoring.
        </li>
        <li className="flex items-start">
          <span className="mr-3">›</span> Instant alerts for system anomalies.
        </li>
        <li className="flex items-start">
          <span className="mr-3">›</span> Easy access to historical performance data.
        </li>
        <li className="flex items-start">
          <span className="mr-3">›</span> Clear, actionable insights for better energy management.
        </li>
      </ul>
    </div>

    <div className="flex flex-col gap-3 rounded-2xl bg-gray-50 p-4 text-gray-300 sm:items-center sm:flex-row sm:gap-4 shadow-lg">
      <div>
      <img src={profilePic} alt="Wind turbine" className="w-10 h-10 rounded-full" />
      </div>
      <div>
        <p className="text-sm text-gray-900 font-bold">ALez P. <span className="text-gray-500 font-medium"> 42 y.o</span></p>

      </div>
      <div>
        <p className="font-medium text-gray-500">Homeowner <span className="text-black pl-4">Solar User</span></p>

      </div>
    </div>
  </div>

  {/* Right side image */}
  <div className="md:w-1/2 flex justify-center">
    <img
      src={solarConstruct}
      alt="Solar construction"
      className="rounded-xl h-[540px] object-cover shadow-md"
    />
  </div>
</div>


     
      

    </div>
  );
};

export default Descrip;
