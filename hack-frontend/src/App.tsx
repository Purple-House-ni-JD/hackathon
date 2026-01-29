import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard"; // Import the new file
import ActivityPage from "./pages/admin/ActivityPage";
import PendingPage from "./pages/admin/PendingPage";
import NewDocumentPage from "./pages/admin/NewDocumentPage";
import OrganizationsPage from "./pages/admin/OrganizationsPage";
import ProfilePage from "./pages/admin/ProfilePage";

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
      </Routes>
    </Router>
  );
}

export default App;
