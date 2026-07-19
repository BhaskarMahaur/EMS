import api from "../api/axios";


export interface EmployeeParams {

  page?: number;

  limit?: number;

  search?: string;

  department?: string;

  role?: string;

  status?: string;

  sortBy?: string;

  sortOrder?: "asc" | "desc";

}



export const getEmployees =
async(
  params?: EmployeeParams
)=>{


  const response =
    await api.get(
      "/employees",
      {
        params,
      }
    );


  return response.data;

};





export const getEmployeeById =
async(id:string)=>{

  const response =
    await api.get(
      `/employees/${id}`
    );


  return response.data;

};





export const createEmployee =
async(
  data:unknown
)=>{


  const response =
    await api.post(
      "/employees",
      data
    );


  return response.data;

};





export const updateEmployee =
async(
  id:string,
  data:unknown
)=>{


  const response =
    await api.put(
      `/employees/${id}`,
      data
    );


  return response.data;

};





export const deleteEmployee =
async(
  id:string
)=>{


  const response =
    await api.delete(
      `/employees/${id}`
    );


  return response.data;

};