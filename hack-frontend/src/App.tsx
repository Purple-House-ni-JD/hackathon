/**
 * App root: routing and React Query provider. CRUD flows use existing backend APIs;
 * organization and document detail/update routes (/organizations/:id, /documents/:id)
 * are handled here. No backend changes; mutations invalidate queries via hooks.
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/pending" element={<PendingPage />} />
          <Route path="/new-document" element={<NewDocumentPage />} />
          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route path="/organizations/:id" element={<OrganizationDetailPage />} />
          <Route path="/documents/:id" element={<DocumentDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* User Routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/documents" element={<UserDocuments />} />
          <Route path="/user/track" element={<UserTrack />} />
          <Route path="/user/notifications" element={<UserNotifications />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;