import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard"; // Import the new file

function App() {
  return (
    <Router>
      <Routes>
        {/* Route 1: The Login Page (Default) */}
        <Route path="/" element={<Login />} />

        {/* Route 2: The Dashboard */}
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
