/**
 * App root: routing and React Query provider.
 * - Single entry point at / (login). Role-based redirect after login.
 * - Admin routes: only admin can access; student_org is redirected to /user/dashboard.
 * - User routes: only student_org can access; admin is redirected to /dashboard.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ActivityPage from "./admin/ActivityPage";
import PendingPage from "./admin/PendingPage";
import NewDocumentPage from "./admin/NewDocumentPage";
import OrganizationsPage from "./admin/OrganizationsPage";
import OrganizationDetailPage from "./admin/OrganizationDetailPage";
import DocumentDetailPage from "./admin/DocumentDetailPage";
import ProfilePage from "./admin/ProfilePage";
import UserDashboard from "./pages/user/UserDashboard";
import UserDocuments from "./pages/user/UserDocuments";
import UserTrack from "./pages/user/UserTrack";
import UserNotifications from "./pages/user/UserNotifications";
import { AdminRoute, UserRoute, RequireAuth } from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Admin-only routes: only admin can access */}
          <Route path="/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/activity" element={<AdminRoute><ActivityPage /></AdminRoute>} />
          <Route path="/pending" element={<AdminRoute><PendingPage /></AdminRoute>} />
          <Route path="/new-document" element={<AdminRoute><NewDocumentPage /></AdminRoute>} />
          <Route path="/organizations" element={<AdminRoute><OrganizationsPage /></AdminRoute>} />
          <Route path="/organizations/:id" element={<AdminRoute><OrganizationDetailPage /></AdminRoute>} />
          <Route path="/documents/:id" element={<RequireAuth><DocumentDetailPage /></RequireAuth>} />
          <Route path="/profile" element={<AdminRoute><ProfilePage /></AdminRoute>} />

          {/* User (student org) routes: only student_org can access */}
          <Route path="/user/dashboard" element={<UserRoute><UserDashboard /></UserRoute>} />
          <Route path="/user/documents" element={<UserRoute><UserDocuments /></UserRoute>} />
          <Route path="/user/track" element={<UserRoute><UserTrack /></UserRoute>} />
          <Route path="/user/notifications" element={<UserRoute><UserNotifications /></UserRoute>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;