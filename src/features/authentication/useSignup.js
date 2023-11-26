import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";
export function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email addres."
      );
    },
  });
  return { signup, isLoading };
}
