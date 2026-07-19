import { useAuth } from "../context/AuthContext";

export function usePermission() {
  const { user } = useAuth();

  const role = user?.role;

  return {
    isSuperAdmin: role === "Super Admin",

    isHRManager: role === "HR Manager",

    isEmployee: role === "Employee",

    canCreateEmployee: role === "Super Admin" || role === "HR Manager",

    canEditEmployee: role === "Super Admin" || role === "HR Manager",

    canDeleteEmployee: role === "Super Admin",

    canAssignManager: role === "Super Admin",
  };
}
