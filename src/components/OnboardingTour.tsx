import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, ChevronLeft, Check, Sparkles } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const OnboardingTour = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("cerulean_onboarding_completed");
    if (!hasSeenTour) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const completeTour = () => {
    setIsOpen(false);
    localStorage.setItem("cerulean_onboarding_completed", "true");
  };

  const steps: Step[] = [
    {
      title: "Welcome to Cerulean Health",
      description:
        "Your comprehensive patient portal. Let's take a quick tour of your new dashboard to help you get started.",
      icon: <Sparkles className="text-blue-500 w-10 h-10" />,
    },
    {
      title: "Quick Actions",
      description:
        "Use the action buttons at the top to quickly schedule appointments, request medication refills, or find doctors in our network.",
      icon: (
        <div className="grid grid-cols-2 gap-1 w-10 h-10 bg-blue-100 rounded-lg p-2">
          <div className="bg-blue-400 rounded-sm"></div>
          <div className="bg-emerald-400 rounded-sm"></div>
          <div className="bg-purple-400 rounded-sm"></div>
          <div className="bg-amber-400 rounded-sm"></div>
        </div>
      ),
    },
    {
      title: "Track Your Health",
      description:
        "View your upcoming appointments, recent vital signs, and sync your wearable device metrics all in one place.",
      icon: (
        <div className="w-10 h-10 border-2 border-emerald-500 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
        </div>
      ),
    },
    {
      title: "AI Assistant",
      description:
        "Have questions about your lab results or care routines? Tap the floating chat button in the bottom right corner anytime.",
      icon: (
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      ),
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                {steps[currentStep].icon}
              </div>
              <button
                onClick={completeTour}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 min-h-[60px]">
              {steps[currentStep].description}
            </p>

            <div className="flex items-center gap-2 mt-8 mb-6">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentStep ? "w-8 bg-blue-600" : "w-2 bg-slate-200 dark:bg-slate-700"}`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 text-slate-500 font-medium disabled:opacity-50 flex items-center hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                <ChevronLeft size={18} className="mr-1" />
                Back
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={() =>
                    setCurrentStep((prev) =>
                      Math.min(steps.length - 1, prev + 1),
                    )
                  }
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition-colors flex items-center"
                >
                  Next
                  <ChevronRight size={18} className="ml-1" />
                </button>
              ) : (
                <button
                  onClick={completeTour}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-sm transition-colors flex items-center"
                >
                  Get Started
                  <Check size={18} className="ml-1.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
