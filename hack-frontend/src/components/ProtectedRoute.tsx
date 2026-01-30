/**
 * Role-based route protection.
 * - AdminRoute: only admin can access; student_org is redirected to /user/dashboard.
 * - UserRoute: only student_org can access; admin is redirected to /dashboard.
 * - RequireAuth: any logged-in user (admin or student_org) can access; unauthenticated → /.
 * Unauthenticated users are always sent to /.
 */

import { Navigate, useLocation } from "react-router-dom";
import { useCurrentUser } from "../hooks/useAuth";

type Role = "admin" | "student_org";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRole="admin">
      {children}
    </ProtectedRoute>
  );
}

export function UserRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRole="student_org">
      {children}
    </ProtectedRoute>
  );
}

/** Any authenticated user (admin or student_org) can access. Used e.g. for /documents/:id. */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { data: user, isLoading } = useCurrentUser();
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ustp-navy">
        <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const location = useLocation();
  const { data: user, isLoading } = useCurrentUser();
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ustp-navy">
        <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  const userType = user?.user_type;

  if (allowedRole === "admin" && userType !== "admin") {
    return <Navigate to="/user/dashboard" replace />;
  }

  if (allowedRole === "student_org" && userType !== "student_org") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
