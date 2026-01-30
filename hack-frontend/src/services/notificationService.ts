import axios from "axios";
import { type Notification } from "../types";

// Adjust URL to match your Laravel route (e.g., Route::get('/notifications', ...))
const API_URL = "/api/notifications";

export const notificationService = {
  // Fetch all notifications for the logged-in user
  getNotifications: async (): Promise<Notification[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Mark specific notification as read
  markAsRead: async (id: number) => {
    await axios.patch(`${API_URL}/${id}/read`);
  },

  // Clear all notifications
  clearAll: async () => {
    await axios.delete(`${API_URL}/clear-all`);
  },
};
