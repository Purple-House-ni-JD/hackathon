import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  Clock,
  FilePlus,
  Users,
  User,
  Menu,
  X,
  LogOut, // <--- 1. Import the icon
} from "lucide-react";
import AdminProfile from "./AdminProfile";

interface SidebarProps {
  activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const adminData = {
    email: "osa.admin@ustp.edu.ph",
    role: "Super Admin",
    department: "Student Affairs",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
  };

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/dashboard",
      id: "dashboard",
    },
    {
      icon: <Activity size={20} />,
      label: "Activity",
      path: "/activity",
      id: "activity",
    },
    {
      icon: <Clock size={20} />,
      label: "Pending",
      path: "/pending",
      id: "pending",
    },
    {
      icon: <FilePlus size={20} />,
      label: "New Document",
      path: "/new-document",
      id: "docs",
    },
    {
      icon: <Users size={20} />,
      label: "Organizations",
      path: "/organizations",
      id: "organizations",
    },
    {
      icon: <User size={20} />,
      label: "Profile",
      path: "/profile",
      id: "profile",
    },
  ];

  // 2. Handle Logout Logic
  const handleLogout = () => {
    // Add any cleanup logic here (e.g., localStorage.clear())
    setIsSidebarOpen(false);
    navigate("/"); // Redirect to Login
  };

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-ustp-navy/80 backdrop-blur-xl border-b border-white/5 h-16 px-4 flex items-center justify-between z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all active:scale-95"
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className="flex items-center gap-2">
          <img src="/vistalogo.png" alt="Logo" className="w-7 h-7" />
          <span className="font-bold tracking-tight text-white">VISTA</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* LEFT NAVIGATION */}
      <aside
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:flex w-64 flex flex-col pt-20 lg:pt-12 px-8 pb-8 space-y-10 
          fixed lg:relative inset-y-0 left-0 bg-ustp-navy z-40 transition-transform duration-300 ease-in-out
          overflow-y-auto scrollbar-hide
        `}
            >
                <div className="flex items-center gap-3 pl-2 group cursor-pointer" onClick={() => navigate("/dashboard")}>
                    <div className="w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                        <img src="/vistalogo.png" alt="VISTA" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white">VISTA</span>
                </div>
                <nav className="flex flex-col space-y-6 flex-1">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            active={activeTab === item.id}
                            onClick={() => {
                                setIsSidebarOpen(false);
                                navigate(item.path);
                            }}
                        />
                    ))}
                </nav>
                {/* MOBILE PROFILE */}
                <div className="lg:hidden mt-auto border-t border-white/10 pt-8">
                    <AdminProfile {...adminData} variant="dark" />
                </div>
            </aside>

      {/* OVERLAY for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

// --- Helper Components ---
const NavItem = ({
  icon,
  label,
  active = false,
  onClick,
  className = "", // Added className prop for extra customization
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-4 cursor-pointer group transition-all duration-200 ${
      active
        ? "opacity-100 translate-x-2"
        : "opacity-60 hover:opacity-100 hover:translate-x-1"
    } ${className}`}
  >
    <div
      className={`${
        active ? "text-ustp-gold" : "text-white group-hover:text-ustp-gold"
      }`}
    >
      {icon}
    </div>
    <span
      className={`text-lg font-medium ${
        active ? "text-white" : "text-gray-300 group-hover:text-white"
      }`}
    >
      {label}
    </span>
  </div>
);

export default Sidebar;
