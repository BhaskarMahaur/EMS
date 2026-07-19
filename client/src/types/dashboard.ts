export interface DepartmentStat {
  department: string;
  employees: number;
}

export interface DashboardData {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  departmentCount: number;
  departmentStats: DepartmentStat[];
}