import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldAlert,
  Pill,
  CircleCheck,
  ChevronRight,
  Camera,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

export const PrescriptionForm: React.FC = () => {
  const [medication, setMedication] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    safe: boolean;
    warnings: string[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleValidate = async () => {
    if (!medication) return;
    setIsValidating(true);

    // Simulate API call to our node backend
    try {
      const res = await fetch("/api/prescriptions/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medication }),
      });
      const data = await res.json();

      setTimeout(() => {
        setValidationResult(data);
        setIsValidating(false);
      }, 800); // Simulate network/DB delay for effect
    } catch (e) {
      setIsValidating(false);
    }
  };

  const handleScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const res = await fetch("/api/prescriptions/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64String }),
        });

        if (!res.ok) throw new Error("Failed to scan prescription");

        const data = await res.json();
        if (data.medicationName) {
          setMedication(data.medicationName);
          setValidationResult(null);
          toast.success("Prescription scanned successfully");
        } else {
          toast.error("Could not extract medication name");
        }
      };
      reader.readAsDataURL(file);
    } catch (e) {
      console.error(e);
      toast.error("Failed to process image");
    } finally {
      setIsScanning(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-4xl mx-auto"
    >
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 flex items-center">
            Smart Prescription
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Auto-checking interactions against national DB. Typing 'Warfarin'
            will trigger an alert.
          </p>
        </div>

        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          onChange={handleScan}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isScanning}
          className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium shadow-sm transition-all flex items-center text-sm"
        >
          {isScanning ? (
            <Loader2 size={16} className="mr-2 animate-spin" />
          ) : (
            <Camera size={16} className="mr-2" />
          )}
          Scan Paper Prescription
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Patient
            </label>
            <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 cursor-not-allowed">
              Anbu Selvan (DOB: 1978-11-20) - Current Meds: Aspirin 81mg
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Medication Name
            </label>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Pill size={16} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  value={medication}
                  onChange={(e) => {
                    setMedication(e.target.value);
                    setValidationResult(null);
                  }}
                  className="form-input pl-10"
                  placeholder="e.g. Lisinopril, Warfarin..."
                />
              </div>
              <button
                onClick={handleValidate}
                disabled={!medication || isValidating}
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-6 py-3 rounded-lg font-medium shadow-sm disabled:opacity-50 transition-all flex items-center"
              >
                {isValidating ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Checking DB...
                  </span>
                ) : (
                  "Validate"
                )}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {validationResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                {validationResult.safe ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-start mt-4">
                    <CircleCheck
                      className="text-emerald-500 mt-0.5 mr-3 flex-shrink-0"
                      size={20}
                    />
                    <div>
                      <h4 className="text-emerald-800 font-medium">
                        Safe to Prescribe
                      </h4>
                      <p className="text-emerald-600 text-sm mt-1">
                        No known interactions with patient's active medication
                        list or allergies.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start mt-4">
                    <ShieldAlert
                      className="text-red-500 mt-0.5 mr-3 flex-shrink-0"
                      size={20}
                    />
                    <div className="w-full">
                      <h4 className="text-red-800 font-medium font-semibold flex items-center justify-between">
                        Interaction Warning
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded uppercase tracking-wider font-bold">
                          Severity: High
                        </span>
                      </h4>
                      <ul className="list-disc pl-4 mt-2 space-y-1 text-sm text-red-700">
                        {(Array.isArray(validationResult.warnings)
                          ? validationResult.warnings
                          : []
                        ).map((warn, i) => (
                          <li key={i}>{warn}</li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t border-red-200 flex justify-end">
                        <button className="text-sm font-medium text-red-700 hover:text-red-800 flex items-center">
                          Acknowledge & Override{" "}
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
