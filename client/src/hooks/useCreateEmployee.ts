import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";


import type {
  AxiosError,
} from "axios";


import {
  createEmployee,
} from "../services/employee.service";



export function useCreateEmployee() {


  const queryClient =
    useQueryClient();



  return useMutation<
    unknown,
    AxiosError,
    unknown
  >({

    mutationFn:
      createEmployee,


    onSuccess:()=>{


      queryClient.invalidateQueries({

        queryKey:[
          "employees"
        ],

      });


    },


  });


}