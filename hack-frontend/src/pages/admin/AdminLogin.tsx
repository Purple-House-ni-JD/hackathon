import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Login
    setTimeout(() => {
      console.log("Login attempt:", { email, password });
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex w-full font-sans">
      {/* LEFT SIDE - CREATIVE V.I.S.T.A. BRANDING */}
      {/* Updated: Now using a rich gradient background instead of solid color */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#1e4b75] via-ustp-navy to-[#05111f] flex-col justify-center items-center text-white p-12 relative overflow-hidden">
        {/* Background Decorative "Linear" Grids/Blobs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {/* A large diagonal sheen */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-ustp-gold rounded-full blur-[128px] opacity-40 mix-blend-overlay"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px] opacity-20"></div>
          {/* Subtle noise texture for "Tracking" vibe (optional) */}
          <div className="absolute inset-0 bg-white opacity-[0.02]"></div>
        </div>

        <div className="z-10 relative">
          {/* Glassmorphism Card for Logo/Title */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-12 rounded-3xl shadow-2xl text-center max-w-lg transform hover:scale-[1.02] transition-transform duration-500">
            {/* LOGO AREA */}
            <div className="w-32 h-32 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-white/20">
              {/* Image Logic: Uses public folder path or fallback icon */}
              <img
                src="/vista-logo.png"
                alt="VISTA Logo"
                className="w-97 h-97 object-contain drop-shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = "none"; // Hide broken image
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden",
                  ); // Show fallback
                }}
              />

              {/* Fallback Icon (Hidden by default, shows if image fails) */}
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

            {/* TYPOGRAPHY MAGIC */}
            <div className="space-y-4">
              {/* Big Gradient Title */}
              <h1 className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-ustp-gold drop-shadow-sm">
                V.I.S.T.A
              </h1>

              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-2 opacity-50 my-4">
                <div className="h-[1px] w-12 bg-white"></div>
                <div className="h-1 w-1 rounded-full bg-ustp-gold"></div>
                <div className="h-[1px] w-12 bg-white"></div>
              </div>

              {/* Monospace Subtitle for "System" feel */}
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

      {/* RIGHT SIDE - ADMIN LOGIN FORM (Kept Clean) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-neutral-50">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-ustp-navy">Admin Login</h2>
            <p className="text-gray-500 mt-2">
              Enter your official credentials to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="admin@ustp.edu.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              disabled={isLoading}
              className="w-full bg-ustp-navy text-white font-bold py-3.5 rounded-lg hover:bg-[#0c2136] active:scale-[0.98] transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2"
            >
              {isLoading ? (
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
                "Access Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
