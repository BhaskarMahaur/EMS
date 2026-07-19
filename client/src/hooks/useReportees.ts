import {
  useQuery,
} from "@tanstack/react-query";


import {
  getReportees,
} from "../services/organization.service";


import type {
  OrganizationEmployee,
} from "../types/organization";



export function useReportees(
  employeeId?: string
){


  return useQuery<OrganizationEmployee[]>({

    queryKey:[
      "reportees",
      employeeId,
    ],


    queryFn:()=>{

      if(!employeeId){

        throw new Error(
          "Employee ID missing"
        );

      }


      return getReportees(
        employeeId
      );

    },


    enabled:
      Boolean(employeeId),


  });


}