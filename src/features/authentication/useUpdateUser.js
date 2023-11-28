import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateUserApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useUpdateuser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: ({user}) => {
      toast.success("User account successfully updated");

      queryClient.setQueryData(["user"], user)
      
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateUser, isUpdating };
}
