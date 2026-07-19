import {
  useQuery,
} from "@tanstack/react-query";


import {
  getEmployees,
} from "../services/employee.service";


import type {
  EmployeeParams,
} from "../services/employee.service";


import type {
  EmployeeResponse,
} from "../types/employee";



export function useEmployees(
  params?: EmployeeParams
) {


  return useQuery<EmployeeResponse>({

    queryKey: [
      "employees",
      params,
    ],


    queryFn: () =>
      getEmployees(params),


  });


}