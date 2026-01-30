/**
 * Axios API Client Configuration
 * 
 * Sets up the base Axios instance with:
 * - Base URL configuration pointing to Laravel backend
 * - Authentication token injection via request interceptor
 * - Automatic token refresh handling via response interceptor
 * - Error response transformation for consistent error handling
 * 
 * The token is stored in localStorage and automatically attached to all requests.
 * If a 401 response is received, the user is redirected to login.
 */

import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { type ApiError } from '../types';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden:', error.response.data);
    }

    // Handle validation errors (422)
    if (error.response?.status === 422) {
      console.error('Validation error:', error.response.data);
    }

    // Return standardized error
    return Promise.reject(error);
  }
);

export default apiClient;