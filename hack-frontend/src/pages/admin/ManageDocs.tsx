// ManageDocs.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  Clock,
  FilePlus,
  Users,
  User,
} from "lucide-react";

const ManageDocs = () => {
  const navigate = useNavigate();

  // Form state
  const [orgName, setOrgName] = useState("");
  const [docTitle, setDocTitle] = useState("");
  const [docType, setDocType] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with API call or state update
    console.log({ orgName, docTitle, docType, remarks });
    alert("New document logged successfully!");
    // Navigate to activity or dashboard after submission
    navigate("/activity");
  };

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
            onClick={() => navigate("/activity")}
          />
          <NavItem icon={<Clock size={20} />} label="Pending" />
          <NavItem icon={<FilePlus size={20} />} label="New Document" active />
          <NavItem icon={<Users size={20} />} label="Organizations" />
          <NavItem icon={<User size={20} />} label="Profile" />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-white text-neutral-dark rounded-[2.5rem] my-4 mr-4 p-8 shadow-2xl flex overflow-hidden relative">
        <div className="flex-1 px-8 pt-4 overflow-y-auto scrollbar-hide">
          <h1 className="text-4xl font-bold text-ustp-navy mb-8">
            Log New Document
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
            {/* Organization Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Student Organization
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Enter organization name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ustp-navy"
                required
              />
            </div>

            {/* Document Title */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Document Title
              </label>
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                placeholder="Enter document title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ustp-navy"
                required
              />
            </div>

            {/* Document Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Document Type
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ustp-navy"
                required
              >
                <option value="">Select type</option>
                <option value="Event Proposal">Event Proposal</option>
                <option value="Fund Request">Fund Request</option>
                <option value="Meeting Request">Meeting Request</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Remarks (Optional)
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add remarks or notes..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ustp-navy"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-ustp-navy hover:bg-ustp-gold text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Log Document
            </button>
          </form>
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

// --- Helper Component ---
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

export default ManageDocs;
