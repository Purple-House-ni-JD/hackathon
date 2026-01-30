import apiClient from '../config/api';
import type { Notification } from '../types';

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    const { data } = await apiClient.get<Notification[]>('/notifications');
    return data;
  },
};
