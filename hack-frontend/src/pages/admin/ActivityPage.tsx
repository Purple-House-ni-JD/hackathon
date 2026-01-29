import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  Clock,
  FilePlus,
  AlertCircle,
  CheckCircle,
  Users,
  FileText,
  User,
} from "lucide-react";

const ActivityPage = () => {
  const navigate = useNavigate();

  // Sample data for activity feed
  const activities = [
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
  ];

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
      {/* LEFT NAVIGATION */}
      <aside className="w-64 flex flex-col pt-12 pl-8 pb-8 space-y-10">
        <h2 className="text-xl font-medium text-gray-400 uppercase tracking-widest pl-2">
          Dashboard
        </h2>
        <nav className="flex flex-col space-y-6">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            onClick={() => navigate("/dashboard")}
          />
          <NavItem
            icon={<Activity size={20} />}
            label="Activity"
            active
            onClick={() => navigate("/activity")}
          />
          <NavItem icon={<Clock size={20} />} label="Pending" />
          <NavItem
            icon={<FilePlus size={20} />}
            label="New Document"
            onClick={() => navigate("/docs")}
          />
          <NavItem icon={<Users size={20} />} label="Organizations" />
          <NavItem icon={<User size={20} />} label="Profile" />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-white text-neutral-dark rounded-[2.5rem] my-4 mr-4 p-8 shadow-2xl flex overflow-hidden relative">
        <div className="flex-1 px-8 pt-4 overflow-y-auto scrollbar-hide">
          <h1 className="text-4xl font-bold text-ustp-navy mb-8">Activity</h1>

          {/* Activity Feed */}
          <div className="space-y-6">
            {activities.map((item) => (
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
        </div>

        {/* RIGHT PANEL: Profile & Logo */}
        <div className="w-80 border-l border-gray-100 pl-8 pt-4 flex flex-col">
          <div className="flex flex-col items-center mb-12">
            <div className="relative mb-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
                alt="Profile"
                className="w-24 h-24 rounded-2xl object-cover shadow-lg"
              />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                4
              </div>
            </div>
            <h3 className="text-xl font-bold text-ustp-navy">Admin Staff</h3>
            <p className="text-gray-500 text-sm underline cursor-pointer hover:text-ustp-gold">
              osa.admin@ustp.edu.ph
            </p>
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Role
              </label>
              <p className="text-sm font-semibold text-ustp-navy">
                Super Admin
              </p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Department
              </label>
              <p className="text-sm font-semibold text-ustp-navy">
                Student Affairs
              </p>
            </div>
          </div>

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
    className={`flex items-center gap-4 cursor-pointer group transition-all duration-200 ${
      active
        ? "opacity-100 translate-x-2"
        : "opacity-60 hover:opacity-100 hover:translate-x-1"
    }`}
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

export default ActivityPage;
