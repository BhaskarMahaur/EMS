import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";


import {
  updateEmployee,
} from "../services/employee.service";



export function useUpdateEmployee(){


  const queryClient =
    useQueryClient();



    interface UpdateEmployeePayload {

        id:string;

        data:unknown;

    }



    return useMutation({

        mutationFn:
        (
            {
            id,
            data,
            }:UpdateEmployeePayload
        ) =>
            updateEmployee(
            id,
            data
            ),



        onSuccess:()=>{


        queryClient.invalidateQueries({

            queryKey:[
            "employees"
            ]

        });


        },


    });


}