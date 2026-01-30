/**
 * Authentication React Query Hooks
 *
 * Provides hooks for authentication operations with React Query:
 * - useLogin: Mutation hook for user login with automatic token storage
 * - useLogout: Mutation hook for logout with cache invalidation
 * - useRegister: Mutation hook for user registration (admin-only)
 * - useCurrentUser: Query hook for fetching authenticated user data
 *
 * These hooks handle loading states, error handling, and automatic cache updates.
 * The useCurrentUser hook is configured to retry on failure and cache for 5 minutes.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { type LoginCredentials, type RegisterUserData } from "../types";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data) => {
      // 1. Cache the user data immediately
      queryClient.setQueryData(["currentUser"], data.user);

      // 2. CHECK ROLE & REDIRECT
      // Based on your PHP User model, the field is 'user_type'
      const role = data.user.user_type;

      if (role === "student_org") {
        navigate("/user/dashboard");
      } else if (role === "admin") {
        navigate("/dashboard");
      } else {
        // Fallback for unknown roles (safety net)
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      // Optional: Add a toast notification here
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      navigate("/");
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterUserData) => authService.register(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authService.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!authService.getStoredToken(),
  });
};
