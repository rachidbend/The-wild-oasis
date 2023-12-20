import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingAPI } from '../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingAPI,
    onSuccess: () => {
      toast.success('Booking sccessfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: error => toast.error(error.message),
  });

  return { isDeleting, deleteBooking };
}
