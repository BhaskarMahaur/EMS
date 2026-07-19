export type EmployeeStatus =
  | "ACTIVE"
  | "INACTIVE";


export type UserRole =
  | "SUPER_ADMIN"
  | "HR_MANAGER"
  | "EMPLOYEE";


export interface Employee {

  _id: string;

  employeeId: string;

  name: string;

  email: string;

  phone: string;

  department: string;

  designation: string;

  salary: number;

  joiningDate: string;

  status: EmployeeStatus;

  role: UserRole;

  reportingManager?: Employee | null;

  profileImage?: string;

}

export interface EmployeeResponse {

  success: boolean;

  data?: Employee[] | {
    employees: Employee[];
  };

  employees?: Employee[];

  total?: number;

  page?: number;

  limit?: number;

}