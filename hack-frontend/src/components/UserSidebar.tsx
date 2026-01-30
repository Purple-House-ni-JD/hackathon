import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Search,
  User,
  Menu,
  X,
  LogOut,
  Bell,
} from "lucide-react";
import { useLogout } from "../hooks/useAuth";
import AdminProfile from "./AdminProfile"; // We can reuse this or rename to UserProfile later

interface SidebarProps {
  activeTab: string;
}

const UserSidebar: React.FC<SidebarProps> = ({ activeTab }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const logoutMutation = useLogout();

  const handleLogout = () => {
        logoutMutation.mutate();
        setIsSidebarOpen(false);
  };

  // Hardcoded Student Data for Demo
  const studentData = {
    email: "csc.pres@ustp.edu.ph",
    role: "Student Org",
    department: "Computer Society",
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
  };

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "My Dashboard",
      path: "/user/dashboard",
      id: "dashboard",
    },
    {
      icon: <FileText size={20} />,
      label: "My Documents",
      path: "/user/documents",
      id: "documents",
    },
    {
      icon: <Search size={20} />,
      label: "Track Status",
      path: "/user/track",
      id: "track",
    },
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      path: "/user/notifications",
      id: "notifications",
    },
    {
      icon: <User size={20} />,
      label: "Org Profile",
      path: "/user/profile",
      id: "profile",
    },
  ];

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-ustp-navy/80 backdrop-blur-xl border-b border-white/5 h-16 px-4 flex items-center justify-between z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all active:scale-95"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className="flex items-center gap-2">
          <img src="/VISTA.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold tracking-tight text-white">VISTA</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:flex w-64 flex flex-col pt-20 lg:pt-12 px-8 pb-8 space-y-10 
          fixed lg:relative inset-y-0 left-0 bg-ustp-navy z-40 transition-transform duration-300 ease-in-out
          overflow-y-auto scrollbar-hide
        `}
      >
        <div className="flex items-center gap-3 pl-2">
          <img src="/VISTA.png" alt="VISTA Logo" className="w-8 h-8 object-contain" />
          <span className="text-2xl font-bold tracking-tight text-white">VISTA</span>
        </div>

        <nav className="flex flex-col space-y-6 flex-1">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setIsSidebarOpen(false);
                navigate(item.path);
              }}
              className={`flex items-center gap-4 cursor-pointer group transition-all duration-200 ${activeTab === item.id
                ? "opacity-100 translate-x-2"
                : "opacity-60 hover:opacity-100 hover:translate-x-1"
                }`}
            >
              <div
                className={`${activeTab === item.id ? "text-ustp-gold" : "text-white group-hover:text-ustp-gold"}`}
              >
                {item.icon}
              </div>
              <span
                className={`text-lg font-medium ${activeTab === item.id ? "text-white" : "text-gray-300 group-hover:text-white"}`}
              >
                {item.label}
              </span>
            </div>
          ))}

          <div className="pt-6 mt-6 border-t border-white/10">
            <div
              onClick={handleLogout}
              className="flex items-center gap-4 cursor-pointer group opacity-60 hover:opacity-100 hover:text-red-400 transition-all"
            >
              <LogOut
                size={20}
                className="text-white group-hover:text-red-400"
              />
              <span className="text-lg font-medium text-gray-300 group-hover:text-red-400">
                Logout
              </span>
            </div>
          </div>
        </nav>

        {/* PROFILE REUSE */}
        <div className="lg:hidden mt-auto border-t border-white/10 pt-8">
          <div className="flex flex-col items-center opacity-80 pb-4">
            <img src="/VISTA.png" alt="VISTA" className="w-16 h-16 object-contain mb-2" />
            <span className="text-xl font-bold text-white tracking-tight">VISTA</span>
          </div>
          <AdminProfile {...studentData} variant="dark" />
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default UserSidebar;
