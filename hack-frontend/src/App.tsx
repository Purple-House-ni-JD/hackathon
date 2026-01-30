import { BrowserRouter, Routes, Route } from "react-router-dom";  // Correct imports
import Login from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard"; // Import the new file
import ActivityPage from "./admin/ActivityPage";
import PendingPage from "./admin/PendingPage";
import NewDocumentPage from "./admin/NewDocumentPage";
import OrganizationsPage from "./admin/OrganizationsPage";
import ProfilePage from "./admin/ProfilePage";
import UserDashboard from "./pages/user/UserDashboard";
import UserDocuments from "./pages/user/UserDocuments";
import UserTrack from "./pages/user/UserTrack";
import UserNotifications from "./pages/user/UserNotifications";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>  {/* Wrap with BrowserRouter */}
        <Routes>  {/* Then Routes */}
          {/* Route 1: The Login Page (Default) */}
          <Route path="/" element={<Login />} />

          {/* Route 2: The Dashboard */}
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/pending" element={<PendingPage />} />
          <Route path="/new-document" element={<NewDocumentPage />} />
          <Route path="/organizations" element={<OrganizationsPage />} />
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