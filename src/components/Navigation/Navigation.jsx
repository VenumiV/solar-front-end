import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import solarLogo from "@/assets/images/solar-logo.svg";
import { LayoutDashboard, Menu, X, PlayCircle } from "lucide-react";
import { useState } from "react";
import DemoTutorial from "@/components/DemoTutorial/DemoTutorial";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src={solarLogo}
              alt="SolarFlux Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              SolarFlux
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDemoOpen(true)}
              className="flex items-center gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Watch Demo</span>
            </Button>
            <SignedIn>
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </SignedIn>
            <div className="flex items-center gap-3">
              <SignedOut>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/sign-in">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDemoOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Watch Demo</span>
            </Button>
            <SignedIn>
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </SignedIn>
            <div className="flex flex-col gap-2 pt-2">
              <SignedOut>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <div className="px-4">
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </div>

      {/* Demo Tutorial Modal */}
      <DemoTutorial open={demoOpen} onOpenChange={setDemoOpen} />
    </nav>
  );
};

export default Navigation;