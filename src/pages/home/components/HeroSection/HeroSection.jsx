import imgWindTurbine from "./wind-turbine.png";
import { Sailboat, Shield, Triangle, Wind } from "lucide-react";
import backgroundImage from "@/assets/images/Solar-Panels.png";


export default function HeroSection() {
  const features = [
    {
      icon: Wind,
      title: "Solar Energy",
      bgColor: "bg-gradient-to-br from-green-600 to-green-800",
    },
    {
      icon: Sailboat,
      title: "Home Dashboard",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      icon: Triangle,
      title: "Real-Time Monitoring",
      bgColor: "bg-gradient-to-br from-green-600 to-green-800",
    },
    {
      icon: Shield,
      title: "Anomaly Detection",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-green-50/30 font-[Inter] overflow-hidden">
      {/* Features Bar */}
      <div className="px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 py-3 rounded-xl ${feature.bgColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className="text-center text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                  {feature.title}
                </span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Hero Content */}
      <main className="relative px-4 sm:px-6 lg:px-12 py-8 sm:py-12 md:py-20 lg:py-24">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Hero Heading */}
          <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold text-gray-900">
              <div className="mb-2 sm:mb-4">Monitor Your Home's</div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-2 sm:mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Solar Energy
                </span>
                <div className="relative animate-bounce-slow">
                  <img
                    src={imgWindTurbine}
                    alt="Wind turbine"
                    className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-xl object-cover shadow-lg"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-2 sm:mb-4">
                <span>with Real-Time</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                <span>Insights & Alerts</span>
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg animate-pulse">
                  <Triangle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 fill-current text-white" />
                </div>
              </div>
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}