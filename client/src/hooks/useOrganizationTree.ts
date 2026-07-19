import {
  useQuery,
} from "@tanstack/react-query";


import {
  getOrganizationTree,
} from "../services/organization.service";



export function useOrganizationTree(){

  return useQuery({

    queryKey:[
      "organization-tree",
    ],

    queryFn:
      getOrganizationTree,

  });

}