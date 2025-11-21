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

     
      

    </div>
  );
};

export default Descrip;
