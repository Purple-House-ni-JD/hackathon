import React from "react";
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
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
      {/* 1. LEFT NAVIGATION (Floating on Blue) */}
      <aside className="w-64 flex flex-col pt-12 pl-8 pb-8 space-y-10">
        <h2 className="text-xl font-medium text-gray-400 uppercase tracking-widest pl-2">
          Dashboard
        </h2>

        <nav className="flex flex-col space-y-6">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active
          />
          <NavItem icon={<Activity size={20} />} label="Activity" />
          <NavItem icon={<Clock size={20} />} label="Pending" />
          <NavItem icon={<FilePlus size={20} />} label="New Document" />
          <NavItem icon={<Users size={20} />} label="Organizations" />
          <NavItem icon={<User size={20} />} label="Profile" />
        </nav>
      </aside>

      {/* 2. MAIN CARD CONTAINER */}
      <main className="flex-1 bg-white text-neutral-dark rounded-[2.5rem] my-4 mr-4 p-8 shadow-2xl flex overflow-hidden relative">
        {/* CENTER CONTENT: Stats & Lists */}
        <div className="flex-1 px-8 pt-4 overflow-y-auto scrollbar-hide">
          <h1 className="text-4xl font-bold text-ustp-navy mb-8">Dashboard</h1>

          {/* Section: Today */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-2">
              <h3 className="text-lg font-bold text-gray-700">Today</h3>
              <span className="text-gray-400 text-2xl pb-1 leading-none">
                ...
              </span>
            </div>

            <div className="space-y-6">
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
              <span className="text-gray-400 text-2xl pb-1 leading-none">
                ...
              </span>
            </div>

            <div className="space-y-6">
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

        {/* 3. RIGHT PANEL: Profile & Logo */}
        <div className="w-80 border-l border-gray-100 pl-8 pt-4 flex flex-col">
          {/* Profile Section */}
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

          {/* User Details (Read Only) */}
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

          {/* VISTA Logo at Bottom Right */}
          <div className="mt-auto flex flex-col items-center opacity-80 pb-4">
            {/* Replace this with your <img src="/vistalogo.png" /> */}
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
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => (
  <div
    className={`flex items-center gap-4 cursor-pointer group transition-all duration-200 ${active ? "opacity-100 translate-x-2" : "opacity-60 hover:opacity-100 hover:translate-x-1"}`}
  >
    <div
      className={`${active ? "text-ustp-gold" : "text-white group-hover:text-ustp-gold"}`}
    >
      {icon}
    </div>
    <span
      className={`text-lg font-medium ${active ? "text-white" : "text-gray-300 group-hover:text-white"}`}
    >
      {label}
    </span>
  </div>
);

const StatItem = ({ icon, color, title, subtitle, value }: any) => (
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
