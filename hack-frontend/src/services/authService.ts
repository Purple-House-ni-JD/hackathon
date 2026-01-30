/**
 * Authentication Service
 * 
 * Handles all authentication-related API calls:
 * - Login: Authenticates user and stores token in localStorage
 * - Logout: Clears session and removes stored credentials
 * - Register: Creates new user accounts (admin-only operation)
 * - getCurrentUser: Fetches authenticated user data
 * 
 * All methods use the configured apiClient which automatically handles
 * token injection and error responses.
 */

import apiClient from '../config/api';
import { type LoginCredentials, type LoginResponse, type RegisterUserData, type User } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
    
    // Store token and user in localStorage
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      // Always clear local storage even if API call fails
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },

  register: async (userData: RegisterUserData): Promise<{ message: string; user: User }> => {
    const { data } = await apiClient.post('/auth/register', userData);
    return data;
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await apiClient.get<{ user: User }>('/auth/me');
    return data.user;
  },

  getStoredUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  getStoredToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },
};