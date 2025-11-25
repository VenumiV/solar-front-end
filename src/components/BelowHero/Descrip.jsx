import React from "react";
import imgWindTurbine1 from "./wind-turbine-2.png";
import solarConstruct from "./solar-construction.png";
import imgWindTurbine3 from "./wind-turbine-3.png";

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
     

     <div className="grid grid-cols-2 m-10">
        <div>
            <div>Problem</div>
            <div>
              <h2 className="mb-8 text-gray-900 font-bold text-2xl sm:mb-12 sm:text-3xl lg:text-4xl">Home solar systems can face reduced efficiency and missed savings due to panel shading, dirt, unexpected drops in output, or inverter issues. Stay ahead with instant anomaly alerts.</h2>
            </div>
            <div className="mt-4 ">
            <ul className="list-none space-y-3 text-xl text-gray-600">
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
     <div className="grid grid-cols-2">
      <div className="relative">
     <img
        src={imgWindTurbine1} 
        alt="Wind turbine"
        className="rounded-xl "
      />
      <div class="absolute bottom-4 left-4 sm:bottom-8 sm:left-8"><div class="flex flex-col items-center rounded-2xl bg-blue-500 p-4 text-white sm:p-6"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle mb-2 h-6 w-6 fill-current sm:h-8 sm:w-8" aria-hidden="true"><path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path></svg><span class="text-lg font-bold sm:text-xl">Aelora</span></div></div>
      
        

      </div>
      <div className="bg-blue-400 rounded-2xl px-10">
      <div className="flex flex-1 py-18 ">

      <div class="flex items-center gap-2 rounded-lg bg-lime-400 px-3 py-1.5 text-black sm:px-4 sm:py-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap h-4 w-4" aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
        <span class="text-sm font-medium sm:text-base">Solution</span></div>
      </div>
      
      
        <h2 className="text-white font-bold text-4xl pr-24">The Solar Home Dashboard empowers you to monitor your solar panels, receive instant alerts for anomalies, and optimize your energy usage for maximum savings and peace of mind.</h2>
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

     <div className="grid grid-cols-2">
      <div>

      </div>
      <div>
      <img
        src={solarConstruct} 
        alt="Wind turbine"
        className="rounded-xl"
      />

      </div>

     </div>

     
      

    </div>
  );
};

export default Descrip;
