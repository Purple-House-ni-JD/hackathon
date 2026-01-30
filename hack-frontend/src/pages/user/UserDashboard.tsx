import React from "react";
import UserSidebar from "../../components/UserSidebar"; // Import the new sidebar
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const UserDashboard = () => {
  // Mock Data for Student View
  const recentDocs = [
    {
      id: 1,
      name: "Founders Day Budget",
      type: "Budget Proposal",
      status: "Under Review",
      office: "Budget Office",
      date: "2 hrs ago",
    },
    {
      id: 2,
      name: "General Assembly Design",
      type: "Activity Design",
      status: "Approved",
      office: "OSA Director",
      date: "Yesterday",
    },
    {
      id: 3,
      name: "T-Shirt Procurement",
      type: "Purchase Request",
      status: "Rejected",
      office: "Supply Office",
      date: "Jan 28",
    },
  ];

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
      {/* 1. USER SIDEBAR */}
      <UserSidebar activeTab="dashboard" />

      {/* 2. MAIN CARD */}
      <main className="flex-1 bg-white text-neutral-dark rounded-[2.5rem] my-4 mr-4 p-8 shadow-2xl flex overflow-hidden relative">
        <div className="flex-1 px-8 pt-4 overflow-y-auto scrollbar-hide">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-ustp-navy">Hello, CSC!</h1>
              <p className="text-gray-500 mt-1">
                Here is the status of your organization's documents.
              </p>
            </div>
            <button className="bg-ustp-navy text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-900 transition flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <FileText size={20} />
              View All Docs
            </button>
          </header>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatusCard
              icon={<Clock size={24} className="text-white" />}
              bg="bg-ustp-gold"
              label="Pending Review"
              count="3"
              sub="Currently in offices"
            />
            <StatusCard
              icon={<CheckCircle size={24} className="text-white" />}
              bg="bg-status-approved"
              label="Approved"
              count="12"
              sub="Ready for release"
            />
            <StatusCard
              icon={<AlertCircle size={24} className="text-white" />}
              bg="bg-status-rejected"
              label="Returned"
              count="1"
              sub="Action required"
            />
          </div>

          {/* Recent Activity List */}
          <div>
            <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Recent Updates
              </h3>
              <span className="text-ustp-navy text-sm font-bold cursor-pointer hover:underline">
                See History
              </span>
            </div>

            <div className="space-y-4">
              {recentDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="group flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-ustp-navy/10 hover:shadow-md transition-all bg-white"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        doc.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : doc.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg group-hover:text-ustp-navy transition-colors">
                        {doc.name}
                      </h4>
                      <p className="text-sm text-gray-400 font-medium">
                        {doc.type} •{" "}
                        <span className="text-gray-500">{doc.office}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-1 ${
                        doc.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : doc.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {doc.status}
                    </span>
                    <p className="text-xs text-gray-400">{doc.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. RIGHT PANEL (Simplified for Student) */}
        <div className="w-80 border-l border-gray-100 pl-8 pt-4 flex flex-col hidden xl:flex">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative mb-4">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
                alt="Profile"
                className="w-24 h-24 rounded-2xl object-cover shadow-lg"
              />
            </div>
            <h3 className="text-xl font-bold text-ustp-navy">
              Computer Society
            </h3>
            <p className="text-gray-500 text-sm">Recognized Student Org</p>
          </div>

          {/* Notifications / Mini Feed */}
          <div className="flex-1">
            <h4 className="font-bold text-gray-400 text-xs uppercase mb-4 tracking-wider">
              Notifications
            </h4>
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0"></div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 leading-tight">
                    Your 'Purchase Request' was returned by Finance.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">10 mins ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500 shrink-0"></div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 leading-tight">
                    OSA Director approved 'Gen Assembly'.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* VISTA Logo */}
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

// Helper Component for the Top Cards
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
