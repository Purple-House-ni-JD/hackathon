import React, { useState } from "react";
import UserSidebar from "../../components/UserSidebar";
import { Search, Filter, FileText, ChevronRight, Download } from "lucide-react";
import { useDocuments } from "../../hooks/useDocuments"; // Import your hook

const UserDocuments = () => {
  // 1. State for Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined,
  );

  // 2. Fetch Data using the Hook
  // Pass current filters to the hook (assuming your API supports ?search= & ?status=)
  const { data: docsData, isLoading } = useDocuments({
    search: searchTerm,
    status: statusFilter,
  });

  // 3. Normalize Data
  // Handle case where API returns array directly OR paginated object { data: [...] }
  const documents = Array.isArray(docsData) ? docsData : docsData?.data || [];

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Wire up search
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-ustp-navy transition"
            />
          </div>

          {/* Simple Toggle Filter for Demo (Cycle: All -> Approved -> Pending) */}
          <button
            onClick={() => {
              if (!statusFilter) setStatusFilter("Approved");
              else if (statusFilter === "Approved")
                setStatusFilter("Under Review");
              else setStatusFilter(undefined);
            }}
            className={`flex items-center gap-2 px-5 py-3 border rounded-xl transition ${statusFilter ? "bg-ustp-navy text-white border-ustp-navy" : "border-gray-200 hover:bg-gray-50 text-gray-600"}`}
          >
            <Filter size={18} />
            <span>{statusFilter || "Filter"}</span>
          </button>
        </div>

        {/* Documents Table */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p>Loading documents...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-2xl">
              <p className="text-gray-400 font-medium">No documents found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc: any) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-md hover:border-ustp-navy/20 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        doc.status === "Approved"
                          ? "bg-green-50 text-green-600"
                          : doc.status === "Rejected"
                            ? "bg-red-50 text-red-600"
                            : "bg-blue-50 text-ustp-navy"
                      }`}
                    >
                      <FileText size={24} />
                    </div>
                    <div>
                      {/* Map fields to your API response structure */}
                      <h3 className="font-bold text-gray-800 text-lg group-hover:text-ustp-navy transition-colors">
                        {doc.event_name || doc.title || "Untitled Document"}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                          DOC-{doc.id}
                        </span>
                        <span>•</span>
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>
                          {new Date(doc.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-1 ${
                          doc.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : doc.status === "Rejected" ||
                                doc.status === "Returned"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {doc.status}
                      </span>
                      <p className="text-xs text-gray-400 font-medium">
                        At: {doc.current_office || "OSA Desk"}
                      </p>
                    </div>
                    <ChevronRight className="text-gray-300 group-hover:text-ustp-navy" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDocuments;
