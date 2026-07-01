import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  User,
  Shield,
  Bell,
  Key,
  Globe,
  Palette,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "../contexts/LanguageContext";

export const Settings = () => {
  const { language, setLanguage, t } = useLanguage();
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("cerulean_user") || "{}"),
  );
  const [activeTab, setActiveTab] = useState("Profile");

  // Profile State
  const [firstName, setFirstName] = useState(user.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(
    user.name?.split(" ").slice(1).join(" ") || "",
  );
  const [email, setEmail] = useState(user.email || "");

  // Security State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Notifications State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);

  // Appearance State
  const [theme, setTheme] = useState(
    localStorage.getItem("cerulean_theme") || "light",
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name: `${firstName} ${lastName}`.trim(),
      email,
    };

    localStorage.setItem("cerulean_user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    window.dispatchEvent(new Event("user-updated"));

    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: "Saving profile...",
      success: "Profile updated successfully!",
      error: "Error saving profile.",
    });
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: "Updating security settings...",
      success: "Security settings updated successfully!",
      error: "Error updating security settings.",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved");
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("cerulean_theme", newTheme);
    if (
      newTheme === "dark" ||
      (newTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.dispatchEvent(new Event("theme-changed"));
  };

  const tabs = [
    { id: "Profile", label: "Profile", icon: User },
    { id: "Security", label: "Security", icon: Shield },
    { id: "Notifications", label: "Notifications", icon: Bell },
    {
      id: "Language & Region",
      label: t("settings.language_region"),
      icon: Globe,
    },
    { id: "Appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t("settings.title")}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your Cerulean Health preferences and account settings.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-64 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <nav className="p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#e0f2fe] dark:bg-[#0369a1]/20 text-[#0369a1] dark:text-[#38bdf8]"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <tab.icon size={18} className="mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 p-8">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>

            {activeTab === "Profile" && (
              <>
                <div className="flex items-center space-x-6 mb-8">
                  <div className="h-24 w-24 rounded-full bg-[#e0f2fe] dark:bg-slate-700 flex items-center justify-center text-[#0369a1] dark:text-[#38bdf8] font-bold text-3xl border border-[#0284c7]/20 shadow-sm">
                    {user.name
                      ? user.name
                          .substring(0, 2)
                          .toUpperCase()
                          .replace("DR", "D")
                      : "AD"}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        toast.success("Avatar selection dialogue opened")
                      }
                      className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
                    >
                      Change Avatar
                    </button>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>

                <form
                  className="space-y-6 max-w-lg"
                  onSubmit={handleSaveProfile}
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="form-input mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="form-input mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm bg-slate-50 dark:bg-slate-800 cursor-not-allowed text-slate-500 dark:text-slate-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Role
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm bg-slate-50 dark:bg-slate-800 cursor-not-allowed text-slate-500 dark:text-slate-400 transition-colors"
                      defaultValue={user.role}
                      disabled
                    />
                  </div>

                  <div className="pt-5 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setFirstName(user.name?.split(" ")[0] || "");
                          setLastName(
                            user.name?.split(" ").slice(1).join(" ") || "",
                          );
                          setEmail(user.email || "");
                        }}
                        className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors mr-3"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#0284c7] border border-transparent text-white hover:bg-[#0369a1] px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}

            {activeTab === "Security" && (
              <form
                className="space-y-6 max-w-lg"
                onSubmit={handleSaveSecurity}
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="form-input mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="form-input mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="form-input mt-1"
                  />
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`${twoFactorEnabled ? "bg-green-500" : "bg-slate-200 dark:bg-slate-700"} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span
                      className={`${twoFactorEnabled ? "translate-x-5" : "translate-x-0"} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
                <div className="pt-5 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#0284c7] text-white hover:bg-[#0369a1] px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            )}

            {activeTab === "Notifications" && (
              <div className="space-y-6 max-w-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receive daily summaries and critical alerts via email.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmailNotifs(!emailNotifs)}
                    className={`${emailNotifs ? "bg-[#0284c7]" : "bg-slate-200 dark:bg-slate-700"} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
                  >
                    <span
                      className={`${emailNotifs ? "translate-x-5" : "translate-x-0"} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                      Push Notifications
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Get instant alerts on your desktop for new appointments.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPushNotifs(!pushNotifs)}
                    className={`${pushNotifs ? "bg-[#0284c7]" : "bg-slate-200 dark:bg-slate-700"} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
                  >
                    <span
                      className={`${pushNotifs ? "translate-x-5" : "translate-x-0"} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                      SMS Alerts
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receive text messages for emergency situations.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSmsNotifs(!smsNotifs)}
                    className={`${smsNotifs ? "bg-[#0284c7]" : "bg-slate-200 dark:bg-slate-700"} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
                  >
                    <span
                      className={`${smsNotifs ? "translate-x-5" : "translate-x-0"} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
                <div className="pt-5 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNotifications}
                      className="bg-[#0284c7] text-white hover:bg-[#0369a1] px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Language & Region" && (
              <div className="space-y-6 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t("settings.display_language")}
                  </label>
                  <select
                    className="form-input mt-1"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as "en" | "ta")}
                  >
                    <option value="en">{t("settings.english")}</option>
                    <option value="ta">{t("settings.tamil")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Timezone
                  </label>
                  <select className="form-input mt-1">
                    <option>Pacific Time (PT)</option>
                    <option>Eastern Time (ET)</option>
                    <option>Central European Time (CET)</option>
                    <option>Indian Standard Time (IST)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Date Format
                  </label>
                  <select className="form-input mt-1">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="pt-5 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-end">
                    <button
                      onClick={() => toast.success("Region settings saved")}
                      className="bg-[#0284c7] text-white hover:bg-[#0369a1] px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Appearance" && (
              <div className="space-y-6 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Theme Preference
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleThemeChange("light")}
                      className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-colors ${theme === "light" ? "border-[#0284c7] bg-[#e0f2fe]/50 dark:bg-[#0284c7]/10 text-[#0284c7] dark:text-[#38bdf8]" : "border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-600 dark:text-slate-400"}`}
                    >
                      <Sun className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">Light</span>
                    </button>
                    <button
                      onClick={() => handleThemeChange("dark")}
                      className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-colors ${theme === "dark" ? "border-[#0284c7] bg-[#e0f2fe]/50 dark:bg-[#0284c7]/10 text-[#0284c7] dark:text-[#38bdf8]" : "border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-600 dark:text-slate-400"}`}
                    >
                      <Moon className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">Dark</span>
                    </button>
                    <button
                      onClick={() => handleThemeChange("system")}
                      className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-colors ${theme === "system" ? "border-[#0284c7] bg-[#e0f2fe]/50 dark:bg-[#0284c7]/10 text-[#0284c7] dark:text-[#38bdf8]" : "border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-600 dark:text-slate-400"}`}
                    >
                      <Monitor className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">System</span>
                    </button>
                  </div>
                </div>

                <div className="pt-6">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Accent Color (Coming Soon)
                  </label>
                  <div className="flex space-x-3">
                    {[
                      "#0284c7",
                      "#16a34a",
                      "#8b5cf6",
                      "#e11d48",
                      "#f59e0b",
                    ].map((color) => (
                      <button
                        key={color}
                        className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900"
                        style={{ backgroundColor: color }}
                        onClick={() =>
                          toast("Custom accents coming in v2.1", { icon: "🎨" })
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
