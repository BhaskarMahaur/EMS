import api from "../api/axios";

import type {
  OrganizationEmployee,
} from "../types/organization";



export const getOrganizationTree =
async (): Promise<OrganizationEmployee[]> => {

  const response =
    await api.get<{
      success: boolean;
      tree: OrganizationEmployee[];
    }>(
      "/organization/tree"
    );

  return response.data.tree;

};





export const getReportees =
async (
  employeeId: string
): Promise<OrganizationEmployee[]> => {

  const response =
    await api.get<{
      success: boolean;
      employees: OrganizationEmployee[];
    }>(
      `/employees/${employeeId}/reportees`
    );

  return response.data.employees;

};





export const assignManager =
async (
  employeeId: string,
  managerId: string
): Promise<OrganizationEmployee> => {

  const response =
    await api.patch<{
      success: boolean;
      employee: OrganizationEmployee;
    }>(
      `/employees/${employeeId}/manager`,
      {
        managerId,
      }
    );

  return response.data.employee;

};