import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  Clock,
  FilePlus,
  Users,
  User,
  AlertCircle,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";

import AdminProfile from "../../components/AdminProfile";

const ActivityPage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const adminData = {
    email: "osa.admin@ustp.edu.ph",
    role: "Super Admin",
    department: "Student Affairs",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
  };

  // Sample data for activity feed (expanded for pagination demo)
  const allActivities = [
    {
      id: 1,
      docTitle: "Event Proposal - Org A",
      orgName: "Org A",
      action: "Submitted",
      status: "Received",
      timestamp: "2026-01-30 09:15 AM",
      icon: <FilePlus size={20} />,
      color: "bg-purple-500",
    },
    {
      id: 2,
      docTitle: "Fund Request - Org B",
      orgName: "Org B",
      action: "Rejected",
      status: "Revisions Needed",
      timestamp: "2026-01-30 10:22 AM",
      icon: <AlertCircle size={20} />,
      color: "bg-status-rejected",
    },
    {
      id: 3,
      docTitle: "Meeting Request - Org C",
      orgName: "Org C",
      action: "Approved",
      status: "Cleared",
      timestamp: "2026-01-30 11:05 AM",
      icon: <CheckCircle size={20} />,
      color: "bg-status-approved",
    },
    {
      id: 4,
      docTitle: "Permit to Use - Org D",
      orgName: "Org D",
      action: "Submitted",
      status: "Pending",
      timestamp: "2026-01-30 01:45 PM",
      icon: <FilePlus size={20} />,
      color: "bg-blue-500",
    },
    {
      id: 5,
      docTitle: "Activity Report - Org E",
      orgName: "Org E",
      action: "Approved",
      status: "Verified",
      timestamp: "2026-01-30 03:20 PM",
      icon: <CheckCircle size={20} />,
      color: "bg-green-600",
    },
    {
      id: 6,
      docTitle: "Liquidation - Org F",
      orgName: "Org F",
      action: "Rejected",
      status: "Fix Errors",
      timestamp: "2026-01-30 04:10 PM",
      icon: <AlertCircle size={20} />,
      color: "bg-red-500",
    },
  ];

  const totalPages = Math.ceil(allActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentActivities = allActivities.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans relative">
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-ustp-navy/80 backdrop-blur-xl border-b border-white/5 h-16 px-4 flex items-center justify-between z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all active:scale-95"
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
        <h2 className="text-xl font-medium text-gray-400 uppercase tracking-widest pl-2">
          Dashboard
        </h2>
        <nav className="flex flex-col space-y-6 flex-1">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            onClick={() => {
              setIsSidebarOpen(false);
              navigate("/dashboard");
            }}
          />
          <NavItem
            icon={<Activity size={20} />}
            label="Activity"
            active
            onClick={() => setIsSidebarOpen(false)}
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

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-white text-neutral-dark rounded-none lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 shadow-2xl flex overflow-hidden relative">
        <div className="flex-1 px-4 lg:px-8 pt-20 lg:pt-4 overflow-y-auto scrollbar-hide">
          <h1 className="text-4xl font-bold text-ustp-navy mb-8">Activity</h1>

          {/* Activity Feed */}
          <div className="space-y-6">
            {currentActivities.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-4 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">
                      {item.docTitle}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      {item.action} by {item.orgName} - Status: {item.status}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-sm text-gray-500">
                    {item.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-8 pb-4">
            <p className="text-xs text-gray-400 font-medium">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-xs font-bold transition-all ${currentPage === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-ustp-navy'}`}
              >
                Prev
              </button>
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-ustp-navy text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-xs font-bold transition-all ${currentPage === totalPages ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-ustp-navy'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Profile & Logo */}
        <div className="hidden lg:flex w-80 border-l border-gray-100 pl-8 pt-4 flex-col items-center">
          <AdminProfile {...adminData} variant="light" />

          <div className="mt-auto flex flex-col items-center opacity-80 pb-4">
            <div className="w-20 h-20 mb-2">
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

export default ActivityPage;
