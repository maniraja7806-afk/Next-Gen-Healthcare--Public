import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { generateDoctors, generatePatients } from "./src/server/seed";

// Seed the data in memory
const doctors = generateDoctors(100);
const patients = generatePatients(1000);

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json());

  // Cerulean Health API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Cerulean Health API Online" });
  });

  app.get("/api/doctors", (req, res) => {
    res.json(doctors);
  });

  app.get("/api/patients", (req, res) => {
    const search = req.query.search as string;
    let filteredPatients = patients;

    if (search) {
      const query = search.toLowerCase();
      filteredPatients = patients.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.id.toLowerCase().includes(query),
      );
    }

    // Pagination for 1000 patients
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    res.json({
      total: filteredPatients.length,
      page,
      limit,
      data: filteredPatients.slice(startIndex, endIndex),
    });
  });

  app.get("/api/dashboard/stats", (req, res) => {
    res.json({
      totalHospitals: 12,
      totalBranches: 45,
      totalDoctors: doctors.length,
      totalPatients: patients.length,
      activeAppointments: 423,
      bedOccupancy: "82%",
      revenue: "$4.2M",
      activeUsers: 1285,
      onlineDoctors: 342,
      serverHealth: "99.9%",
      databaseHealth: "Optimal",
    });
  });

  // Staff Directory Mock Data
  const generateStaff = (count: number) => {
    const roles = ["Super Admin", "Hospital Admin", "Doctor", "Nurse", "Receptionist", "Laboratory", "Pharmacy", "Insurance"];
    const status = ["Online", "Offline", "Away"];
    return Array.from({ length: count }, (_, i) => ({
      id: `STF-${1000 + i}`,
      name: `Staff Member ${i + 1}`,
      email: `staff${i + 1}@hospital.org`,
      role: roles[Math.floor(Math.random() * roles.length)],
      status: status[Math.floor(Math.random() * status.length)],
      lastLogin: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    }));
  };
  const staffMembers = generateStaff(250);

  app.get("/api/staff", (req, res) => {
    const search = req.query.search as string;
    let filteredStaff = staffMembers;

    if (search) {
      const query = search.toLowerCase();
      filteredStaff = staffMembers.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query) ||
          s.role.toLowerCase().includes(query)
      );
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    res.json({
      total: filteredStaff.length,
      page,
      limit,
      data: filteredStaff.slice(startIndex, endIndex),
    });
  });

  // In-Memory Database for Prototype Demo
  const mockAppointments = [
    {
      id: 1,
      time: "09:00 AM",
      patient: "Sarah Jenkins",
      type: "Follow-up",
      risk: 0.1,
      status: "Completed",
    },
    {
      id: 2,
      time: "10:30 AM",
      patient: "Michael Chang",
      type: "Consultation",
      risk: 0.4,
      status: "In Progress",
    },
    {
      id: 3,
      time: "01:00 PM",
      patient: "Elena Rostova",
      type: "Routine Check",
      risk: 0.82,
      status: "Scheduled",
      alert: "High No-Show Risk",
    },
    {
      id: 4,
      time: "03:15 PM",
      patient: "David Smith",
      type: "Vaccination",
      risk: 0.05,
      status: "Scheduled",
    },
  ];

  app.get("/api/appointments/today", (req, res) => {
    res.json(mockAppointments);
  });

  app.post("/api/prescriptions/validate", async (req, res) => {
    try {
      const { medication } = req.body;
      const { GoogleGenAI, Type } = await import("@google/genai");

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const patientContext = "Patient is currently on Aspirin 81mg.";
      const prompt = `Check for drug-to-drug interactions for the new medication: ${medication}. The patient's context: ${patientContext}. Return if it is safe, and any warnings.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              safe: {
                type: Type.BOOLEAN,
                description: "True if it is safe to prescribe, False if there are major interactions.",
              },
              warnings: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: "List of interaction warnings.",
              },
            },
            required: ["safe", "warnings"],
          },
        },
      });

      const jsonStr = response.text?.trim() || "{}";
      const result = JSON.parse(jsonStr);

      res.json(result);
    } catch (e) {
      console.error("Gemini validate error:", e);
      // Fallback
      const { medication } = req.body;
      if (medication && medication.toLowerCase().includes("warfarin")) {
        return res.json({
          safe: false,
          warnings: [
            "Major interaction detected: Patient is currently on Aspirin. Increased bleeding risk.",
          ],
        });
      }
      res.json({ safe: true, warnings: [] });
    }
  });

  app.post("/api/prescriptions/scan", async (req, res) => {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: "Missing imageBase64" });
      }

      const { GoogleGenAI } = await import("@google/genai");

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Remove data:image/jpeg;base64, prefix if present
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          "Extract the prescription details from this image. Return a JSON object with a single key 'medicationName' containing the name of the primary medication prescribed.",
          { inlineData: { data: base64Data, mimeType: "image/jpeg" } },
        ],
        config: {
          responseMimeType: "application/json",
        },
      });

      const result = JSON.parse(response.text);
      res.json(result);
    } catch (error) {
      console.error("Prescription Scan error:", error);
      res.status(500).json({ error: "Failed to scan prescription." });
    }
  });

  // AI Assistant Route
  app.post("/api/assistant/chat", async (req, res) => {
    try {
      const { message } = req.body;
      const { GoogleGenAI } = await import("@google/genai");

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction:
            "You are a helpful and professional AI healthcare assistant for the Cerulean Health app. You assist patients by answering questions about standard medical routines, explaining general lab results, and giving care suggestions based on standard medical databases. Do not provide specific medical diagnoses. Always advise the patient to consult their doctor for serious concerns. Keep responses concise and easy to understand.",
        },
      });

      res.json({ reply: response.text });
    } catch (error) {
      console.error("AI Assistant error:", error);
      res
        .status(500)
        .json({ error: "Failed to get a response from the assistant." });
    }
  });

  // Login simulation
  app.post("/api/auth/login", (req, res) => {
    const { email, password, role } = req.body;

    // Determine the actual role (verify based on email for demo)
    let actualRole = role || "Hospital Admin";
    const emailLower = email.toLowerCase();
    
    if (emailLower.includes("superadmin")) {
      actualRole = "Super Admin";
    } else if (emailLower.includes("patient")) {
      actualRole = "Patient";
    } else if (emailLower.includes("dr") || emailLower.includes("doctor")) {
      actualRole = "Doctor";
    } else if (emailLower.includes("nurse")) {
      actualRole = "Nurse";
    } else if (emailLower.includes("reception")) {
      actualRole = "Receptionist";
    } else if (emailLower.includes("lab")) {
      actualRole = "Laboratory";
    } else if (emailLower.includes("pharmacy")) {
      actualRole = "Pharmacy";
    } else if (emailLower.includes("insurance")) {
      actualRole = "Insurance";
    } else if (emailLower.includes("admin")) {
      actualRole = "Hospital Admin";
    }

    res.json({
      token: "cerulean-jwt-mock-token",
      user: {
        id: "U-1",
        name: actualRole + " User", // Generic for demo
        email: email,
        role: actualRole,
      },
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Cerulean Health Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
