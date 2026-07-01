import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Language = "en" | "ta";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.appointments": "Appointments",
    "nav.prescriptions": "Prescriptions",
    "nav.patients": "Patients",
    "nav.settings": "Settings",

    // Patient Dashboard
    "dashboard.welcome": "Welcome back",
    "dashboard.upcoming": "Upcoming Appointments",
    "dashboard.recent_vitals": "Recent Vitals",
    "dashboard.blood_pressure": "Blood Pressure",
    "dashboard.heart_rate": "Heart Rate",
    "dashboard.weight": "Weight",
    "dashboard.glucose": "Glucose",
    "dashboard.schedule_appt": "Schedule Appointment",
    "dashboard.request_refill": "Request Refill",
    "dashboard.find_doctor": "Find a Doctor",
    "dashboard.lab_results": "Lab Results",

    // Settings
    "settings.title": "Settings",
    "settings.language_region": "Language & Region",
    "settings.display_language": "Display Language",
    "settings.english": "English",
    "settings.tamil": "Tamil (தமிழ்)",

    // Medical Terms
    "medical.cardiologist": "Cardiologist",
    "medical.endocrinologist": "Endocrinologist",
    "medical.general_practice": "General Practice",
    "medical.follow_up": "Follow-up",
    "medical.consultation": "Consultation",
    "medical.check_up": "Check-up",
    "medical.prescription": "Prescription",
    "medical.diagnosis": "Diagnosis",
    "medical.symptoms": "Symptoms",
    "medical.medication": "Medication",
    "medical.dosage": "Dosage",
    "medical.status": "Status",
    "medical.active": "Active",
    "medical.completed": "Completed",
    "medical.upcoming": "Upcoming",
  },
  ta: {
    // Navigation
    "nav.dashboard": "முகப்பு (Dashboard)",
    "nav.appointments": "நியமனங்கள் (Appointments)",
    "nav.prescriptions": "பரிந்துரைகள் (Prescriptions)",
    "nav.patients": "நோயாளிகள் (Patients)",
    "nav.settings": "அமைப்புகள் (Settings)",

    // Patient Dashboard
    "dashboard.welcome": "மீண்டும் வருக",
    "dashboard.upcoming": "வரவிருக்கும் நியமனங்கள்",
    "dashboard.recent_vitals": "சமீபத்திய உடல்நிலைக் குறியீடுகள் (Vitals)",
    "dashboard.blood_pressure": "இரத்த அழுத்தம் (Blood Pressure)",
    "dashboard.heart_rate": "இதயத் துடிப்பு (Heart Rate)",
    "dashboard.weight": "எடை (Weight)",
    "dashboard.glucose": "குளுக்கோஸ் (Glucose)",
    "dashboard.schedule_appt": "நியமனத்தை அட்டவணையிடு (Schedule Appt)",
    "dashboard.request_refill": "மருந்து நிரப்ப கோரிக்கை (Request Refill)",
    "dashboard.find_doctor": "மருத்துவரைக் கண்டுபிடி (Find a Doctor)",
    "dashboard.lab_results": "ஆய்வக முடிவுகள் (Lab Results)",

    // Settings
    "settings.title": "அமைப்புகள் (Settings)",
    "settings.language_region": "மொழி & பகுதி",
    "settings.display_language": "காட்சி மொழி",
    "settings.english": "ஆங்கிலம் (English)",
    "settings.tamil": "தமிழ் (Tamil)",

    // Medical Terms - keep medical terms accurate, often transliterated or commonly used terms in Tamil Nadu
    "medical.cardiologist": "இதய நோய் நிபுணர் (Cardiologist)",
    "medical.endocrinologist": "நாளமில்லாச் சுரப்பி நிபுணர் (Endocrinologist)",
    "medical.general_practice": "பொது மருத்துவம் (General Practice)",
    "medical.follow_up": "பின்தொடர்தல் (Follow-up)",
    "medical.consultation": "கலந்தாய்வு (Consultation)",
    "medical.check_up": "பரிசோதனை (Check-up)",
    "medical.prescription": "மருந்துச் சீட்டு (Prescription)",
    "medical.diagnosis": "கண்டறிதல் (Diagnosis)",
    "medical.symptoms": "அறிகுறிகள் (Symptoms)",
    "medical.medication": "மருந்து (Medication)",
    "medical.dosage": "மருந்தளவு (Dosage)",
    "medical.status": "நிலை (Status)",
    "medical.active": "செயலில் (Active)",
    "medical.completed": "முடிந்தது (Completed)",
    "medical.upcoming": "வரவிருக்கும் (Upcoming)",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("cerulean_language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "ta")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("cerulean_language", lang);
  };

  const t = (key: string): string => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
