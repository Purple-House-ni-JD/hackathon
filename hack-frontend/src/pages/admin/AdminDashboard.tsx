import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  Clock,
  FilePlus,
  Users,
  User,
  FileText,
  AlertCircle,
  CheckCircle,
  Building2,
  Menu,
  X,
} from "lucide-react";

import AdminProfile from "../../components/AdminProfile";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const adminData = {
    email: "osa.admin@ustp.edu.ph",
    role: "Super Admin",
    department: "Student Affairs",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
  };

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans relative">
      {/* MOBILE HEADER - Improved for better visibility */}
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
        <div className="w-10"></div> {/* Spacer for symmetry */}
      </div>

      {/* 1. LEFT NAVIGATION (Floating on Blue) */}
      <aside
        className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:flex w-64 flex flex-col pt-12 px-8 pb-8 space-y-10 
        fixed lg:relative inset-y-0 left-0 bg-ustp-navy z-40 transition-transform duration-300 ease-in-out
      `}
      >
        <h2 className="text-xl font-medium text-gray-400 uppercase tracking-widest pl-2">
          Dashboard
        </h2>

        <nav className="flex flex-col space-y-6 flex-1">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active
            onClick={() => {
              setIsSidebarOpen(false);
              navigate("/dashboard");
            }}
          />
          <NavItem
            icon={<Activity size={20} />}
            label="Activity"
            onClick={() => {
              setIsSidebarOpen(false);
              navigate("/activity");
            }}
          />
          <NavItem
            icon={<Clock size={20} />}
            label="Pending"
            onClick={() => {
              setIsSidebarOpen(false);
              navigate("/pending");
            }}
          />
          <NavItem
            icon={<FilePlus size={20} />}
            label="New Document"
            onClick={() => {
              setIsSidebarOpen(false);
              navigate("/new-document");
            }}
          />
          <NavItem
            icon={<Users size={20} />}
            label="Organizations"
            onClick={() => {
              setIsSidebarOpen(false);
              navigate("/organizations");
            }}
          />
          <NavItem
            icon={<User size={20} />}
            label="Profile"
            onClick={() => {
              setIsSidebarOpen(false);
              navigate("/profile");
            }}
          />
        </nav>

        {/* ADMIN PROFILE IN SIDEBAR (Mobile/Tablet Only) */}
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

      {/* 2. MAIN CARD CONTAINER */}
      <main className="flex-1 bg-white text-neutral-dark rounded-none lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 shadow-2xl flex flex-col lg:flex-row overflow-hidden relative">
        {/* CENTER CONTENT: Stats & Lists */}
        <div className="flex-1 px-2 lg:px-8 pt-12 lg:pt-4 overflow-y-auto scrollbar-hide">
          <h1 className="text-3xl lg:text-4xl font-bold text-ustp-navy mb-8">
            Dashboard
          </h1>

          {/* Section: Today */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-2">
              <h3 className="text-lg font-bold text-gray-700">Today</h3>
              <span className="text-gray-400 text-2xl pb-1 leading-none cursor-pointer hover:text-ustp-navy transition-colors">
                ...
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
              <StatItem
                icon={<FileText className="text-white" size={24} />}
                color="bg-purple-500"
                title="Total Documents"
                subtitle="All submissions logged"
                value="12"
              />
              <StatItem
                icon={<Clock className="text-white" size={24} />}
                color="bg-ustp-gold"
                title="Pending Approvals"
                subtitle="Requiring immediate action"
                value="21"
              />
              <StatItem
                icon={<AlertCircle className="text-white" size={24} />}
                color="bg-status-rejected"
                title="Rejected Documents"
                subtitle="Returned for revision"
                value="46"
              />
            </div>
          </div>

          {/* Section: Upcoming (Friday) */}
          <div>
            <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-2">
              <h3 className="text-lg font-bold text-gray-700">
                Friday, 30 January 2026
              </h3>
              <span className="text-gray-400 text-2xl pb-1 leading-none cursor-pointer hover:text-ustp-navy transition-colors">
                ...
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
              <StatItem
                icon={<CheckCircle className="text-white" size={24} />}
                color="bg-status-approved"
                title="Documents Approved"
                subtitle="Cleared for release"
                value="156"
                isCurrency={false}
              />
              <StatItem
                icon={<Users className="text-white" size={24} />}
                color="bg-green-600"
                title="Active Student Organizations"
                subtitle="Currently submitting documents"
                value="35"
                isCurrency={false}
              />
              <StatItem
                icon={<Building2 className="text-white" size={24} />}
                color="bg-blue-500"
                title="Offices Involved"
                subtitle="Active routing points"
                value="8"
                isCurrency={false}
              />
            </div>
          </div>
        </div>

        {/* 3. RIGHT PANEL: Profile & Logo (Desktop Only) */}
        <div className="hidden lg:flex w-80 border-l border-gray-100 pl-8 pt-4 flex-col items-center">
          <AdminProfile {...adminData} variant="light" />

          {/* VISTA Logo at Bottom Right */}
          <div className="mt-auto flex flex-col items-center opacity-80 pb-4">
            <div className="w-20 h-20 mb-2 transform hover:scale-110 transition-transform duration-300">
              <img
                src="/vistalogo.png"
                alt="VISTA"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-black text-ustp-navy tracking-tighter">
              VISTA
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              Track Your Docs.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Helper Components ---

const NavItem = ({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-4 cursor-pointer group transition-all duration-200 ${active
      ? "opacity-100 translate-x-2"
      : "opacity-60 hover:opacity-100 hover:translate-x-1"
      }`}
  >
    <div
      className={`${active ? "text-ustp-gold" : "text-white group-hover:text-ustp-gold"
        }`}
    >
      {icon}
    </div>
    <span
      className={`text-lg font-medium ${active ? "text-white" : "text-gray-300 group-hover:text-white"
        }`}
    >
      {label}
    </span>
  </div>
);

interface StatItemProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  subtitle: string;
  value: string | number;
  isCurrency?: boolean;
}

const StatItem = ({ icon, color, title, subtitle, value }: StatItemProps) => (
  <div className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-3 rounded-xl transition-colors">
    <div className="flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${color}`}
      >
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-gray-800 text-lg">{title}</h4>
        <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
          {/* Tiny dot */}
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          {subtitle}
        </p>
      </div>
    </div>
    <div className="text-right">
      <span className="block font-bold text-lg text-gray-800">{value}</span>
    </div>
  </div>
);

export default AdminDashboard;
