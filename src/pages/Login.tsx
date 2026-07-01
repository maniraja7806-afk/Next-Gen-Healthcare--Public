import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Activity,
  Fingerprint,
  Lock,
  CheckCircle2,
  Loader2,
  Heart,
  Mail,
  User,
  Users,
  Plus,
  FileText,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import toast from "react-hot-toast";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [greeting, setGreeting] = useState("");

  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.token) {
        setStatus("success");
        localStorage.setItem("cerulean_token", data.token);
        localStorage.setItem("cerulean_user", JSON.stringify(data.user));

        setTimeout(() => {
          const userRole = data.user?.role;
          switch (userRole) {
            case "Super Admin": navigate("/superadmin"); break;
            case "Hospital Admin": navigate("/hospitaladmin"); break;
            case "Doctor": navigate("/doctor"); break;
            case "Nurse": navigate("/nurse"); break;
            case "Receptionist": navigate("/receptionist"); break;
            case "Laboratory": navigate("/laboratory"); break;
            case "Pharmacy": navigate("/pharmacy"); break;
            case "Insurance": navigate("/insurance"); break;
            case "Patient": navigate("/patient"); break;
            default: navigate("/admin"); break;
          }
        }, 1200);
      } else {
        setStatus("error");
        toast.error("Invalid credentials");
        setTimeout(() => setStatus("idle"), 2000);
      }
    } catch (err: any) {
      console.error("Login failed", err);
      setStatus("error");
      if (err.message && err.message.includes("Failed to fetch")) {
        toast.error("Network error: Unable to reach the server.");
      } else {
        toast.error("Connection error: " + (err.message || "Unknown error"));
      }
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const motivationalQuotes = [
    "Every patient deserves exceptional care.",
    "Your next patient is counting on you.",
    "Healthcare powered by compassion.",
    "Innovating for better health outcomes.",
    "Building a healthier tomorrow, together.",
    "Streamlining care, one patient at a time.",
    "Empowering providers with real-time insights.",
    "Precision medicine and personalized care.",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FBFF] dark:bg-[#0D1117] font-sans overflow-hidden">
      {/* LEFT PANEL - ANIMATED HEALTHCARE EXPERIENCE (Hidden on mobile) */}
      <div className="hidden md:flex md:w-[40%] relative overflow-hidden bg-gradient-to-br from-[#0F6CBD] to-[#1565C0] dark:from-[#094275] dark:to-[#0B2138] items-center justify-center p-12">
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: Math.random() * window.innerHeight,
                x: Math.random() * window.innerWidth,
                opacity: 0.1 + Math.random() * 0.3,
              }}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [null, Math.random() * window.innerHeight],
                      x: [null, Math.random() * window.innerWidth],
                      opacity: [
                        null,
                        0.1 + Math.random() * 0.4,
                        0.1 + Math.random() * 0.3,
                      ],
                    }
              }
              transition={{
                duration: 20 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-2 h-2 bg-white rounded-full blur-[1px]"
            />
          ))}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`plus-${i}`}
              initial={{
                y: Math.random() * window.innerHeight,
                x: Math.random() * window.innerWidth,
                opacity: 0.2,
              }}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [null, Math.random() * window.innerHeight],
                      rotate: [0, 360],
                    }
              }
              transition={{
                duration: 30 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute text-white/20"
            >
              <Plus size={40 + Math.random() * 40} />
            </motion.div>
          ))}
        </div>

        {/* Central Graphic */}
        <div className="relative z-10 w-full max-w-lg text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
              {/* Pulse Circles */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : { scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }
                }
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 bg-[#4FC3F7] rounded-full mix-blend-screen"
              />
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : { scale: [1, 1.3, 1.6], opacity: [0.4, 0.1, 0] }
                }
                transition={{
                  duration: 3,
                  delay: 1,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 bg-[#E3F2FD] rounded-full mix-blend-screen"
              />
              <div className="relative z-10 bg-white p-6 rounded-full shadow-2xl text-[#0F6CBD]">
                <Activity size={64} />
              </div>
            </div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-8 drop-shadow-md"
            >
              Cerulean Health
            </motion.h1>

            <div className="h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg md:text-xl font-light italic text-white drop-shadow-sm px-4 text-center"
                >
                  "{motivationalQuotes[quoteIndex]}"
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT PANEL - LOGIN FORM */}
      <div className="w-full md:w-[60%] flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-white dark:bg-[#0D1117] relative z-10 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)]">
        {/* Mobile App Header (Visible only on mobile) */}
        <div className="md:hidden flex items-center justify-center mb-10 text-[#0F6CBD] dark:text-[#4FC3F7]">
          <Activity size={40} className="mr-3" />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Cerulean Health
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto space-y-8"
        >
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {greeting}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Please sign in to your secure account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address or ID
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0F6CBD] dark:group-focus-within:text-[#4FC3F7] transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  className={`form-input pl-12 ${
                    status === "error"
                      ? "border-red-300 dark:border-red-900/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : ""
                  }`}
                  placeholder="name@hospital.org"
                />
              </div>
            </div>

            {/* Password Input */}
            <AnimatePresence>
              {(email.length > 0 || status === "error") && (
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, height: 0 }
                  }
                  animate={{ opacity: 1, height: "auto" }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, height: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="pt-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex justify-between items-center">
                      <span>Secure Password</span>
                      <a
                        href="#"
                        className="text-xs font-medium text-[#0F6CBD] dark:text-[#4FC3F7] hover:underline"
                      >
                        Forgot Password?
                      </a>
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0F6CBD] dark:group-focus-within:text-[#4FC3F7] transition-colors">
                        <Lock size={20} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required={email.length > 0}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                        className={`form-input pl-12 pr-12 ${
                          status === "error"
                            ? "border-red-300 dark:border-red-900/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : ""
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Remember Me */}
            <div className="flex items-center pt-2">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#0F6CBD] focus:ring-[#0F6CBD] border-slate-300 rounded cursor-pointer dark:bg-[#161B22] dark:border-slate-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none"
              >
                Remember this device for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === "loading" || status === "success"}
              whileHover={
                status === "idle" && !shouldReduceMotion ? { scale: 1.01 } : {}
              }
              whileTap={
                status === "idle" && !shouldReduceMotion ? { scale: 0.99 } : {}
              }
              className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-md shadow-blue-500/20 text-sm font-semibold text-white bg-gradient-to-r from-[#0F6CBD] to-[#1565C0] hover:from-[#1565C0] hover:to-[#0F6CBD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F6CBD] transition-all disabled:opacity-80 disabled:cursor-not-allowed overflow-hidden relative mt-2"
            >
              <AnimatePresence mode="wait">
                {status === "loading" ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center"
                  >
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Securing Connection...
                  </motion.div>
                ) : status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center text-white"
                  >
                    <CheckCircle2 size={18} className="mr-2" />
                    Authentication Successful
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <Fingerprint size={18} className="mr-2 opacity-80" />
                    Access Secure Portal
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          {/* Trust Indicators */}
          <div className="pt-8">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center">
                <Shield size={14} className="mr-1.5 text-emerald-500" />
                HIPAA Compliant
              </div>
              <div className="flex items-center">
                <Lock
                  size={14}
                  className="mr-1.5 text-[#0F6CBD] dark:text-[#4FC3F7]"
                />
                End-to-End Encryption
              </div>
              <div className="flex items-center">
                <CheckCircle2 size={14} className="mr-1.5 text-blue-500" />
                Protected PHI
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
