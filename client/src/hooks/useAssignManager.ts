import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";


import {
  assignManager,
} from "../services/organization.service";



interface AssignManagerPayload {

  employeeId:string;

  managerId:string;

}



export function useAssignManager(){


  const queryClient =
    useQueryClient();



  return useMutation({

    mutationFn:
      (
        data:AssignManagerPayload
      ) =>
        assignManager(
          data.employeeId,
          data.managerId
        ),



    onSuccess:()=>{


      queryClient.invalidateQueries({

        queryKey:[
          "organization-tree"
        ]

      });



      queryClient.invalidateQueries({

        queryKey:[
          "reportees"
        ]

      });


    },


  });


}