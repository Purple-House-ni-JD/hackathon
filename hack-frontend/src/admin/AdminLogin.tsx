/**
 * Admin Login Page - Integrated with Backend API
 * 
 * Handles user authentication using React Query and Axios:
 * - Form submission triggers useLogin mutation hook
 * - Success: Stores JWT token in localStorage and redirects to dashboard
 * - Error: Displays validation or authentication errors to user
 * - Loading state: Shows spinner during API call
 * 
 * The login mutation automatically handles token storage and cache updates
 * through the useLogin hook, which uses authService for API communication.
 */

import React, { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { type LoginCredentials } from "../types";
import { AxiosError } from "axios";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(credentials);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex w-full font-sans">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#1e4b75] via-ustp-navy to-[#05111f] flex-col justify-center items-center text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-ustp-gold rounded-full blur-[128px] opacity-40 mix-blend-overlay"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px] opacity-20"></div>
          <div className="absolute inset-0 bg-white opacity-[0.02]"></div>
        </div>

        <div className="z-10 relative">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-12 rounded-3xl shadow-2xl text-center max-w-lg transform hover:scale-[1.02] transition-transform duration-500">
            <div className="w-32 h-32 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-white/20">
              <img
                src="/VISTA.png"
                alt="VISTA Logo"
                className="w-24 h-24 object-contain drop-shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove("hidden");
                }}
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden h-14 w-14 text-ustp-gold drop-shadow-md"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-ustp-gold drop-shadow-sm">
                V.I.S.T.A
              </h1>

              <div className="flex items-center justify-center gap-2 opacity-50 my-4">
                <div className="h-[1px] w-12 bg-white"></div>
                <div className="h-1 w-1 rounded-full bg-ustp-gold"></div>
                <div className="h-[1px] w-12 bg-white"></div>
              </div>

              <p className="font-mono text-sm uppercase tracking-[0.2em] text-blue-200 leading-relaxed">
                Visibility & Information System <br />
                <span className="text-white font-bold opacity-80">
                  for Tracking Approvals
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center opacity-40 font-mono text-xs text-white">
            <p>Authorized Access Only • USTP-2026</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-8 bg-neutral-50">
        <div className="w-full max-w-md bg-white p-6 lg:p-10 rounded-2xl shadow-lg border border-gray-100">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-ustp-navy">Admin Login</h2>
            <p className="text-gray-500 mt-2">
              Enter your official credentials to access the dashboard.
            </p>
          </div>

          {loginMutation.isError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 font-medium">
                {loginMutation.error instanceof AxiosError
                  ? loginMutation.error.response?.data?.message || "Invalid credentials. Please try again."
                  : "An error occurred. Please try again."}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="admin@ustp.edu.ph"
                value={credentials.email}
                onChange={handleChange}
                disabled={loginMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="••••••••"
                value={credentials.password}
                onChange={handleChange}
                disabled={loginMutation.isPending}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300 text-ustp-navy focus:ring-ustp-navy"
                />
                Keep me logged in
              </label>
              <a
                href="#"
                className="text-ustp-navy font-semibold hover:text-ustp-gold transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-ustp-navy text-white font-bold py-3.5 rounded-lg hover:bg-[#0c2136] active:scale-[0.98] transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Verifying...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;