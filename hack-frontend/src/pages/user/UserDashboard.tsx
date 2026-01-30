import React from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar";
import AdminProfile from "../../components/AdminProfile"; // Reuse this component
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

// IMPORTANT: Import the hooks you just shared
import { useCurrentUser } from "../../hooks/useAuth";
import { useDocuments } from "../../hooks/useDocuments";

const UserDashboard = () => {
  const navigate = useNavigate();

  // 1. Fetch User Data
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();

  // 2. Fetch Stats using useDocuments with filters
  // Note: React Query executes these in parallel
  const { data: pendingDocs } = useDocuments({ status: "Under Review" });
  const { data: approvedDocs } = useDocuments({ status: "Approved" });
  const { data: rejectedDocs } = useDocuments({ status: "Rejected" }); // Adjust string to match your DB exactly

  // 3. Fetch Recent Docs (We fetch 'All' and just take the top 5)
  // You might want to add a 'limit: 5' to your API params later
  const { data: recentDocsData, isLoading: docsLoading } = useDocuments({});

  // Helper to safely get counts (Handles if API returns { data: [], total: 10 } or just [])
  const getCount = (data: any) => {
    if (!data) return 0;
    return data.total !== undefined ? data.total : data.length || 0;
  };

  const getRecentList = (data: any) => {
    if (!data) return [];
    // If API returns wrapped data { data: [...] }, use that. Otherwise use data directly.
    const list = Array.isArray(data) ? data : data.data || [];
    return list.slice(0, 5); // Take top 5
  };

  // Prepare Data for Render
  const pendingCount = getCount(pendingDocs);
  const approvedCount = getCount(approvedDocs);
  const rejectedCount = getCount(rejectedDocs);
  const recentList = getRecentList(recentDocsData);

  // Profile Object
  const userProfile = {
    email: currentUser?.email || "loading...",
    role: "Student Organization",
    department: currentUser?.organization?.department || "Student Affairs",
    avatarUrl:
      currentUser?.avatar ||
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    name: currentUser?.full_name || "Student Leader", // Using 'full_name' from your User Model
    organization: currentUser?.organization?.name || "Organization",
  };

  if (userLoading) {
    return (
      <div className="h-screen w-full bg-ustp-navy flex items-center justify-center text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
      {/* SIDEBAR */}
      <UserSidebar activeTab="dashboard" />

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-white text-neutral-dark rounded-[2.5rem] my-4 mr-4 p-8 shadow-2xl flex overflow-hidden relative">
        <div className="flex-1 px-8 pt-4 overflow-y-auto scrollbar-hide">
          {/* HEADER */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-ustp-navy">
                Hello, {userProfile.organization}!
              </h1>
              <p className="text-gray-500 mt-1">
                Welcome back, {userProfile.name}. Here is your document status.
              </p>
            </div>
            <button
              onClick={() => navigate("/user/documents")}
              className="bg-ustp-navy text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-900 transition flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FileText size={20} />
              View All Docs
            </button>
          </header>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatusCard
              icon={<Clock size={24} className="text-white" />}
              bg="bg-ustp-gold"
              label="Pending Review"
              count={pendingCount}
              sub="Currently in offices"
            />
            <StatusCard
              icon={<CheckCircle size={24} className="text-white" />}
              bg="bg-status-approved"
              label="Approved"
              count={approvedCount}
              sub="Ready for release"
            />
            <StatusCard
              icon={<AlertCircle size={24} className="text-white" />}
              bg="bg-status-rejected"
              label="Returned"
              count={rejectedCount}
              sub="Action required"
            />
          </div>

          {/* RECENT ACTIVITY */}
          <div>
            <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Recent Updates
              </h3>
              <span
                onClick={() => navigate("/user/documents")}
                className="text-ustp-navy text-sm font-bold cursor-pointer hover:underline"
              >
                See History
              </span>
            </div>

            <div className="space-y-4">
              {docsLoading ? (
                <p className="text-gray-400">Loading documents...</p>
              ) : recentList.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                  <p className="text-gray-400">No documents submitted yet.</p>
                  <button
                    onClick={() => navigate("/user/new-document")}
                    className="text-ustp-navy font-bold text-sm mt-2 hover:underline"
                  >
                    Submit one now
                  </button>
                </div>
              ) : (
                recentList.map((doc: any) => (
                  <div
                    key={doc.id}
                    className="group flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-ustp-navy/10 hover:shadow-md transition-all bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${doc.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : doc.status === "Rejected" ||
                              doc.status === "Returned"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                      >
                        <FileText size={20} />
                      </div>
                      <div>
                        {/* Adjust these field names based on your Document Model */}
                        <h4 className="font-bold text-gray-800 text-lg group-hover:text-ustp-navy transition-colors">
                          {doc.event_name || doc.title || "Untitled Document"}
                        </h4>
                        <p className="text-sm text-gray-400 font-medium">
                          {doc.type} •{" "}
                          <span className="text-gray-500">
                            {doc.current_office || "OSA Desk"}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-1 ${doc.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : doc.status === "Rejected" ||
                              doc.status === "Returned"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                      >
                        {doc.status}
                      </span>
                      <p className="text-xs text-gray-400">
                        {new Date(doc.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (Profile) */}
        <div className="hidden xl:flex w-80 border-l border-gray-100 pl-8 pt-4 flex-col items-center">
          <AdminProfile
            email={userProfile.email}
            role={userProfile.role}
            department={userProfile.department}
            avatarUrl={userProfile.avatarUrl}
            variant="light"
          />

          {/* Notifications Placeholder */}
          <div className="flex-1 w-full mt-8">
            <h4 className="font-bold text-gray-400 text-xs uppercase mb-4 tracking-wider">
              Notifications
            </h4>
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500 shrink-0"></div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 leading-tight">
                    Welcome to V.I.S.T.A.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">System Message</p>
                </div>
              </div>
            </div>
          </div>

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

// HELPER COMPONENT (No changes needed here)
const StatusCard = ({ icon, bg, label, count, sub }: any) => (
  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <div
        className={`p-3 rounded-xl shadow-sm ${bg} transition-transform group-hover:scale-110`}
      >
        {icon}
      </div>
      <ArrowRight
        className="text-gray-300 group-hover:text-ustp-navy transition-colors"
        size={20}
      />
    </div>
    <h3 className="text-3xl font-bold text-ustp-navy mb-1">{count}</h3>
    <p className="font-bold text-gray-700">{label}</p>
    <p className="text-xs text-gray-400 mt-1">{sub}</p>
  </div>
);

export default UserDashboard;
