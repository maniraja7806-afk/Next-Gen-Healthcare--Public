import { useState, useEffect } from "react";

export type Permission = 
  | "view_staff_directory"
  | "manage_staff"
  | "view_patient_volume"
  | "view_department_efficiency"
  | "view_staff_activity"
  | "view_system_alerts"
  | "manage_appointments"
  | "view_revenue";

export type Role = 
  | "Super Admin" 
  | "Hospital Admin" 
  | "Doctor" 
  | "Nurse" 
  | "Receptionist" 
  | "Laboratory" 
  | "Pharmacy" 
  | "Insurance" 
  | "Patient";

const rolePermissions: Record<Role, Permission[]> = {
  "Super Admin": [
    "view_staff_directory",
    "manage_staff",
    "view_patient_volume",
    "view_department_efficiency",
    "view_staff_activity",
    "view_system_alerts",
    "manage_appointments",
    "view_revenue"
  ],
  "Hospital Admin": [
    "view_staff_directory",
    "manage_staff",
    "view_patient_volume",
    "view_department_efficiency",
    "view_staff_activity",
    "manage_appointments",
    "view_revenue" // Hospital admins can view revenue but maybe not system alerts
  ],
  "Doctor": [
    "view_patient_volume",
    "manage_appointments"
  ],
  "Nurse": [
    "view_patient_volume",
    "manage_appointments"
  ],
  "Receptionist": [
    "view_patient_volume",
    "manage_appointments"
  ],
  "Laboratory": [],
  "Pharmacy": [],
  "Insurance": [],
  "Patient": []
};

export const useRBAC = () => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("cerulean_user") || "{}")
  );

  useEffect(() => {
    const handleUserUpdate = () => {
      setUser(JSON.parse(localStorage.getItem("cerulean_user") || "{}"));
    };
    window.addEventListener("user-updated", handleUserUpdate);
    return () => window.removeEventListener("user-updated", handleUserUpdate);
  }, []);

  const role = (user.role as Role) || "Patient";

  const hasPermission = (permission: Permission) => {
    const permissions = rolePermissions[role] || [];
    return permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]) => {
    return permissions.some(hasPermission);
  };

  const hasAllPermissions = (permissions: Permission[]) => {
    return permissions.every(hasPermission);
  };

  return {
    user,
    role,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};
