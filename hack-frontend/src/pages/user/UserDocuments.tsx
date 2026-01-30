import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar";
import { Search, Filter, FileText, ChevronRight, Download } from "lucide-react";
import { useDocuments } from "../../hooks/useDocuments";
import { useCurrentUser } from "../../hooks/useAuth";
import type { Document as DocumentType, DocumentStatus } from "../../types";
import { format } from "date-fns";

const STATUS_OPTIONS: { value: DocumentStatus | ""; label: string }[] = [
  { value: "", label: "All statuses" },
  { value: "Received", label: "Received" },
  { value: "Under Review", label: "Under Review" },
  { value: "Forwarded", label: "Forwarded" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
];

const UserDocuments = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DocumentStatus | "">("");

  const { data: currentUser } = useCurrentUser();
  const { data: documentsData, isLoading, isError } = useDocuments({
    per_page: 500,
    sort_by: "updated_at",
    sort_order: "desc",
  });

  const list = documentsData?.data ?? [];

  const filteredDocuments = useMemo(() => {
    let result = list;
    if (statusFilter) {
      result = result.filter((d) => d.status === statusFilter);
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((d) => {
        const event = (d.event_name || "").toString().toLowerCase();
        const typeName = ((d.document_type ?? d.documentType)?.name ?? "").toString().toLowerCase();
        const idStr = (d.id ?? "").toString();
        const docId = `doc-${d.id}`;
        return event.includes(q) || typeName.includes(q) || idStr.includes(q) || docId.includes(q);
      });
    }
    return result;
  }, [list, statusFilter, searchQuery]);

  const getStatusClass = (status: string) => {
    if (status === "Approved") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
  };

  const officeName = (doc: DocumentType) =>
    (doc.current_office ?? (doc as any).currentOffice)?.name ?? "—";
  const typeName = (doc: DocumentType) =>
    (doc.document_type ?? (doc as any).documentType)?.name ?? "—";

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
      <UserSidebar activeTab="documents" />

      <main className="flex-1 bg-white text-neutral-dark rounded-[2.5rem] my-4 mr-4 p-8 shadow-2xl flex flex-col overflow-hidden relative">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-ustp-navy">My Documents</h1>
            <p className="text-gray-500">
              Manage and track your organization&apos;s submissions.
            </p>
          </div>
          <button
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
            onClick={() => window.print()}
          >
            <Download size={18} />
            <span className="text-sm font-semibold">Export Log</span>
          </button>
        </div>

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as DocumentStatus | "")}
            className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 focus:outline-none focus:border-ustp-navy"
            aria-label="Filter by status"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value || "all"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="sr-only" aria-hidden>
            <Filter size={18} />
          </span>
        </div>

        {isError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-4">
            <p className="text-red-600 font-medium">Failed to load documents. Please try again.</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-ustp-navy border-t-transparent rounded-full" />
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
              <FileText className="mx-auto text-gray-300" size={48} />
              <p className="text-gray-500 mt-4">No documents match your filters.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => navigate(`/documents/${doc.id}`)}
                  className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-md hover:border-ustp-navy/20 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-ustp-navy flex items-center justify-center">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg group-hover:text-ustp-navy transition-colors">
                        {doc.event_name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                          DOC-{doc.id}
                        </span>
                        <span>•</span>
                        <span>{typeName(doc)}</span>
                        <span>•</span>
                        <span>
                          {doc.date_received
                            ? format(new Date(doc.date_received), "MMM dd, yyyy")
                            : "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-1 ${getStatusClass(doc.status)}`}
                      >
                        {doc.status}
                      </span>
                      <p className="text-xs text-gray-400 font-medium">At: {officeName(doc)}</p>
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
