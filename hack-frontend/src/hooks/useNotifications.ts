import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../services/notificationService";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: notificationService.getNotifications,
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useClearNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationService.clearAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
