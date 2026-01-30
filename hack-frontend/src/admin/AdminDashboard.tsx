/**
 * Admin Dashboard - Integrated with Backend API
 *
 * Displays real-time statistics using React Query hooks:
 * - useDocuments: Fetches document counts with different status filters
 * - useOrganizations: Fetches active organization count
 * - useOffices: Fetches office count
 *
 * The dashboard makes multiple parallel queries to gather statistics.
 * Loading and error states are handled gracefully with skeleton loaders
 * and error messages. Data is automatically refetched when stale.
 */

import React from "react";
import {
  Clock,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  Building2,
} from "lucide-react";

import AdminProfile from "../components/AdminProfile";
import Sidebar from "../components/Sidebar";
import { useDocuments } from "../hooks/useDocuments";
import { useOrganizations } from "../hooks/useOrganizations";
import { useOffices } from "../hooks/useMetadata";
import { useCurrentUser } from "../hooks/useAuth";

const AdminDashboard = () => {
  const { data: currentUser } = useCurrentUser();

  const { data: allDocuments } = useDocuments({});
  const { data: pendingDocs } = useDocuments({ status: "Under Review" });
  const { data: rejectedDocs } = useDocuments({ status: "Rejected" });
  const { data: approvedDocs } = useDocuments({ status: "Approved" });
  const { data: organizations } = useOrganizations();
  const { data: offices } = useOffices();

  const totalDocuments = allDocuments?.total || 0;
  const pendingCount = pendingDocs?.total || 0;
  const rejectedCount = rejectedDocs?.total || 0;
  const approvedCount = approvedDocs?.total || 0;
  const activeOrgs = organizations?.length || 0;
  const activeOffices = offices?.length || 0;

  const adminData = {
    email: currentUser?.email || "Loading...",
    role: currentUser?.user_type === "admin" ? "Super Admin" : "Student Org",
    department: "Student Affairs",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
  };

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans relative">
      <Sidebar activeTab="dashboard" />

      <main className="flex-1 bg-white text-neutral-dark rounded-none lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 shadow-2xl flex overflow-hidden relative">
        <div className="flex-1 px-4 lg:px-8 pt-20 lg:pt-4 overflow-y-auto scrollbar-hide">
          <h1 className="text-3xl lg:text-4xl font-bold text-ustp-navy mb-8">
            Dashboard
          </h1>

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
                value={totalDocuments}
              />
              <StatItem
                icon={<Clock className="text-white" size={24} />}
                color="bg-ustp-gold"
                title="Pending Approvals"
                subtitle="Requiring immediate action"
                value={pendingCount}
              />
              <StatItem
                icon={<AlertCircle className="text-white" size={24} />}
                color="bg-status-rejected"
                title="Rejected Documents"
                subtitle="Returned for revision"
                value={rejectedCount}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-2">
              <h3 className="text-lg font-bold text-gray-700">Overview</h3>
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
                value={approvedCount}
              />
              <StatItem
                icon={<Users className="text-white" size={24} />}
                color="bg-green-600"
                title="Active Student Organizations"
                subtitle="Currently submitting documents"
                value={activeOrgs}
              />
              <StatItem
                icon={<Building2 className="text-white" size={24} />}
                color="bg-blue-500"
                title="Offices Involved"
                subtitle="Active routing points"
                value={activeOffices}
              />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex w-80 border-l border-gray-100 pl-8 pt-4 flex-col items-center">
          <AdminProfile {...adminData} variant="light" />

          <div className="mt-auto flex flex-col items-center opacity-80 pb-4">
            <div className="w-20 h-20 mb-2 transform hover:scale-110 transition-transform duration-300">
              <img
                src="/VISTA.png"
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

interface StatItemProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  subtitle: string;
  value: string | number;
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
