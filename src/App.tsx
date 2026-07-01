/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Login } from "./pages/Login";
import { AppLayout } from "./layouts/AppLayout";
import { AdminDashboard } from "./pages/AdminDashboard";
import { DoctorList } from "./pages/DoctorList";
import { PatientList } from "./pages/PatientList";
import { Settings } from "./pages/Settings";
import { SmartScheduling } from "./components/SmartScheduling";
import { TimeTravelRecord } from "./components/TimeTravelRecord";
import { PrescriptionForm } from "./components/PrescriptionForm";
import { PharmacyInventory } from "./pages/PharmacyInventory";
import { Notifications } from "./pages/Notifications";

import { PatientDashboard } from "./pages/PatientDashboard";
import { PatientPrescriptions } from "./pages/PatientPrescriptions";
import { PatientAppointments } from "./pages/PatientAppointments";

import { SuperAdminDashboard } from "./pages/dashboards/SuperAdminDashboard";
import { DoctorDashboard } from "./pages/dashboards/DoctorDashboard";
import { NurseDashboard } from "./pages/dashboards/NurseDashboard";
import { ReceptionistDashboard } from "./pages/dashboards/ReceptionistDashboard";
import { LaboratoryDashboard } from "./pages/dashboards/LaboratoryDashboard";
import { InsuranceDashboard } from "./pages/dashboards/InsuranceDashboard";
import { PharmacyDashboard } from "./pages/dashboards/PharmacyDashboard";
import { StaffDirectory } from "./pages/dashboards/StaffDirectory";

import { LanguageProvider } from "./contexts/LanguageContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("cerulean_token");
  if (!token) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Admin / General Staff Routes */}
          <Route path="/admin" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="staff" element={<StaffDirectory />} />
            <Route path="doctors" element={<DoctorList />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="appointments" element={<SmartScheduling />} />
            <Route path="prescriptions" element={<PrescriptionForm />} />
            <Route path="pharmacy" element={<PharmacyInventory />} />
            <Route path="reports" element={<TimeTravelRecord />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/superadmin" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<SuperAdminDashboard />} />
            <Route path="staff" element={<StaffDirectory />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="/hospitaladmin" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="staff" element={<StaffDirectory />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/doctor" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<DoctorDashboard />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="appointments" element={<SmartScheduling />} />
            <Route path="prescriptions" element={<PrescriptionForm />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/nurse" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<NurseDashboard />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/receptionist" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<ReceptionistDashboard />} />
            <Route path="appointments" element={<SmartScheduling />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/laboratory" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<LaboratoryDashboard />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/pharmacy" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<PharmacyDashboard />} />
            <Route path="inventory" element={<PharmacyInventory />} />
            <Route path="prescriptions" element={<PrescriptionForm />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/insurance" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<InsuranceDashboard />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Patient specific routes */}
          <Route
            path="/patient"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<PatientDashboard />} />
            <Route path="doctors" element={<DoctorList />} />
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="prescriptions" element={<PatientPrescriptions />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
