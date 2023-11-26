import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";
export function useDeleteBook() {
  const queryClient = useQueryClient();
  const { mutate: deleteBook, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success(`Successfully Deleted`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("There as an error while deleting.");
    },
  });

  return { deleteBook, isDeleting };
}
