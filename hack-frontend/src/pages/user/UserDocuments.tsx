import React, { useState } from "react";
import UserSidebar from "../../components/UserSidebar";
import { Search, Filter, FileText, ChevronRight, Download } from "lucide-react";

const UserDocuments = () => {
  // Mock Data
  const documents = [
    {
      id: "DOC-001",
      title: "Founders Day Budget",
      type: "Budget Proposal",
      date: "Jan 28, 2026",
      status: "Under Review",
      office: "Budget Office",
    },
    {
      id: "DOC-002",
      title: "General Assembly Design",
      type: "Activity Design",
      date: "Jan 25, 2026",
      status: "Approved",
      office: "OSA Director",
    },
    {
      id: "DOC-003",
      title: "T-Shirt Procurement",
      type: "Purchase Request",
      date: "Jan 20, 2026",
      status: "Rejected",
      office: "Supply Office",
    },
    {
      id: "DOC-004",
      title: "Venue Reservation",
      type: "Letter",
      date: "Jan 15, 2026",
      status: "Approved",
      office: "GSO",
    },
  ];

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
      <UserSidebar activeTab="documents" />

      <main className="flex-1 bg-white text-neutral-dark rounded-[2.5rem] my-4 mr-4 p-8 shadow-2xl flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-ustp-navy">My Documents</h1>
            <p className="text-gray-500">
              Manage and track your organization's submissions.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition">
            <Download size={18} />
            <span className="text-sm font-semibold">Export Log</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by title or tracking number..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-ustp-navy transition"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>

        {/* Documents Table */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-md hover:border-ustp-navy/20 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-ustp-navy flex items-center justify-center">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-ustp-navy transition-colors">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                        {doc.id}
                      </span>
                      <span>•</span>
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
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
                    <p className="text-xs text-gray-400 font-medium">
                      At: {doc.office}
                    </p>
                  </div>
                  <ChevronRight className="text-gray-300 group-hover:text-ustp-navy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDocuments;
