import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  UserPlus, 
  LogIn, 
  LayoutDashboard, 
  AlertTriangle, 
  Receipt, 
  Zap,
  CheckCircle2
} from "lucide-react";

const demoSteps = [
  {
    id: 1,
    title: "Create Your Account",
    description: "Get started by creating your account to access all features",
    icon: UserPlus,
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <UserPlus className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Step 1: Sign Up</h3>
          </div>
          <ol className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600 mt-1">1.</span>
              <span>Click on the <strong>"Sign Up"</strong> button in the navigation bar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600 mt-1">2.</span>
              <span>Enter your email address and create a secure password</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600 mt-1">3.</span>
              <span>Verify your email address through the confirmation link</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600 mt-1">4.</span>
              <span>Complete your profile setup</span>
            </li>
          </ol>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900">Tip</p>
              <p className="text-xs text-green-700 mt-1">Your account is secured with Clerk authentication for maximum security.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Sign In to Your Account",
    description: "Access your dashboard after creating your account",
    icon: LogIn,
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <LogIn className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Step 2: Sign In</h3>
          </div>
          <ol className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-1">1.</span>
              <span>Click on the <strong>"Sign In"</strong> button in the navigation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-1">2.</span>
              <span>Enter your registered email and password</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-1">3.</span>
              <span>You'll be automatically redirected to your dashboard</span>
            </li>
          </ol>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Quick Access</p>
              <p className="text-xs text-blue-700 mt-1">Once signed in, you can bookmark your dashboard for quick access.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Explore Your Dashboard",
    description: "Monitor your solar energy production in real-time",
    icon: LayoutDashboard,
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <LayoutDashboard className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Step 3: Dashboard Overview</h3>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What You'll See:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Weather Conditions:</strong> Real-time temperature and wind speed for your location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Capacity Factor:</strong> Visual gauge showing your solar system's efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Energy Production Chart:</strong> Daily, weekly, and monthly energy generation trends</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <p className="text-xs text-gray-600">
                <strong>Pro Tip:</strong> Use the time range selector (1 Day, 7 Days, 30 Days) to view different periods of energy production.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Monitor Anomalies",
    description: "Detect and resolve issues with your solar system",
    icon: AlertTriangle,
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border-2 border-orange-200">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Step 4: Anomaly Detection</h3>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Features Available:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span><strong>Automatic Detection:</strong> System automatically detects anomalies in energy production</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span><strong>Filter Options:</strong> Filter by type (Mechanical, Temperature, Shading, Sensor Error), severity, and status</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span><strong>Visual Analytics:</strong> Pie chart showing distribution of anomaly types</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span><strong>Resolve Issues:</strong> Mark anomalies as resolved when issues are fixed</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <p className="text-xs text-gray-600">
                <strong>Note:</strong> Anomalies are detected using advanced algorithms that compare your current production with historical patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Manage Invoices",
    description: "View and pay your energy bills",
    icon: Receipt,
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 border-2 border-indigo-200">
          <div className="flex items-center gap-3 mb-4">
            <Receipt className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Step 5: Invoice Management</h3>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Invoice Features:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span><strong>View All Invoices:</strong> See all your energy bills in one place</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span><strong>Status Tracking:</strong> Monitor pending, paid, and failed payments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span><strong>Secure Payment:</strong> Pay invoices securely using Stripe checkout</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span><strong>Statistics:</strong> View total invoices, pending count, and total amount</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="text-xs text-gray-600">
                <strong>Payment Process:</strong> Click "Pay Now" on any pending invoice, complete the secure Stripe checkout, and your invoice will be automatically updated.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Get Started Now",
    description: "You're all set! Start monitoring your solar energy today",
    icon: CheckCircle2,
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-200 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-500 p-4">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Get Started?</h3>
          <p className="text-sm text-gray-700 mb-4">
            You now know how to use all the features of the Solar Energy Management System!
          </p>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-gray-900 mb-2">Quick Summary:</h4>
            <ul className="text-left space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Create your account and sign in</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Monitor energy production on your dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Detect and resolve anomalies automatically</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Manage and pay your invoices securely</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
];

export default function DemoTutorial({ open, onOpenChange }) {
  const [currentStep, setCurrentStep] = useState(0);
  const currentStepData = demoSteps[currentStep];
  const Icon = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg">
              <Icon className="h-5 w-5 text-white" />
            </div>
            {currentStepData.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {currentStepData.description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {currentStepData.content}
        </div>

        {/* Progress Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Step {currentStep + 1} of {demoSteps.length}</span>
            <span>{Math.round(((currentStep + 1) / demoSteps.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {demoSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentStep
                    ? "bg-blue-600 w-8"
                    : index < currentStep
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {currentStep < demoSteps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleClose}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Get Started
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
