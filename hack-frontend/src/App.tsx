import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard"; // Import the new file
import ActivityPage from "./pages/admin/ActivityPage";
import PendingPage from "./pages/admin/PendingPage";
import NewDocumentPage from "./pages/admin/NewDocumentPage";
import OrganizationsPage from "./pages/admin/OrganizationsPage";
import ProfilePage from "./pages/admin/ProfilePage";
import UserDashboard from "./pages/user/UserDashboard";
import UserDocuments from "./pages/user/UserDocuments";
import UserTrack from "./pages/user/UserTrack";
import UserNotifications from "./pages/user/UserNotifications";

function App() {
  return (
    <Router>
      <Routes>
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
    </Router>
  );
}

export default App;
