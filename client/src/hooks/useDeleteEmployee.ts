import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteEmployee,
} from "../services/employee.service";

export function useDeleteEmployee() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: (id: string) =>
      deleteEmployee(id),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });

    },

  });

}