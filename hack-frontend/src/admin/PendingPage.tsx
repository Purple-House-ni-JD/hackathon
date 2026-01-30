/**
 * Pending Page - Integrated with Backend API
 *
 * Lists documents with search, status filter, and pagination. Supports Create/Update
 * flow: list is fetched via useDocuments (no fixed status; optional status filter).
 * Assigned office is read from API snake_case (current_office) or camelCase (currentOffice).
 * Row actions navigate to document detail/update page. Mutations invalidate documents query.
 */

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MoreVertical } from "lucide-react";
import AdminProfile from "../components/AdminProfile";
import Sidebar from "../components/Sidebar";
import { useDocuments } from "../hooks/useDocuments";
import { useCurrentUser } from "../hooks/useAuth";
import { type DocumentStatus } from "../types";
import { format } from "date-fns";

const STATUS_OPTIONS: { value: DocumentStatus | ""; label: string }[] = [
  { value: "", label: "All statuses" },
  { value: "Received", label: "Received" },
  { value: "Under Review", label: "Under Review" },
  { value: "Forwarded", label: "Forwarded" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
];

const ITEMS_PER_PAGE = 10;
const FETCH_PER_PAGE = 500;

const PendingPage = () => {
  const navigate = useNavigate();
  const [clientPage, setClientPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DocumentStatus | "">("");

  const { data: currentUser } = useCurrentUser();

  const { data: documentsData, isLoading, isError } = useDocuments({
    per_page: FETCH_PER_PAGE,
    sort_by: 'updated_at',
    sort_order: 'desc',
  });

  const filteredDocuments = useMemo(() => {
    const list = (documentsData?.data ?? []) as any[];

    const byStatus = statusFilter
      ? list.filter((d) => d.status === statusFilter)
      : list;

    const q = searchQuery.trim().toLowerCase();
    if (!q) return byStatus;

    return byStatus.filter((d) => {
      const event = (d.event_name || '').toString().toLowerCase();
      const org = (d.organization?.name || '').toString().toLowerCase();
      const office = ((d.current_office ?? d.currentOffice)?.name || '').toString().toLowerCase();
      const submitter = ((d.submitted_by ?? d.submittedBy)?.full_name || '').toString().toLowerCase();
      const idStr = (d.id || '').toString();
      const docId = `doc-${d.id}`;

      return (
        event.includes(q) ||
        org.includes(q) ||
        office.includes(q) ||
        submitter.includes(q) ||
        idStr.includes(q) ||
        docId.includes(q)
      );
    });
  }, [documentsData, statusFilter, searchQuery]);

  const paginatedDocuments = useMemo(() => {
    const start = (clientPage - 1) * ITEMS_PER_PAGE;
    return filteredDocuments.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDocuments, clientPage]);

  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE));
  const from = filteredDocuments.length === 0 ? 0 : (clientPage - 1) * ITEMS_PER_PAGE + 1;
  const to = Math.min(clientPage * ITEMS_PER_PAGE, filteredDocuments.length);

  const adminData = {
    email: currentUser?.email || "Loading...",
    role: currentUser?.user_type === 'admin' ? "Super Admin" : "Student Org",
    department: "Student Affairs",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
  };

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case "Under Review":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Forwarded":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Received":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans relative">
      <Sidebar activeTab="pending" />

      <main className="flex-1 bg-white text-neutral-dark rounded-none lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 shadow-2xl flex flex-col lg:flex-row overflow-hidden relative">
        <div className="flex-1 lg:px-4 pt-20 lg:pt-4 overflow-y-auto scrollbar-hide">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-ustp-navy">
              Pending Actions
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative group flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ustp-navy transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setClientPage(1);
                  }}
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-ustp-navy/20 focus:border-ustp-navy transition-all w-full"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as DocumentStatus | "");
                  setClientPage(1);
                }}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-ustp-navy/20 text-gray-700 min-w-[140px]"
                aria-label="Filter by status"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value || "all"} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <span className="sr-only" aria-hidden><Filter size={18} /></span>
            </div>
          </div>

          {isError && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl mb-6">
              <p className="text-red-600 font-medium">Failed to load pending documents. Please try again.</p>
            </div>
          )}

          {isLoading ? (
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-8 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-ustp-navy border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium">Loading pending documents...</p>
              </div>
            </div>
          ) : (!filteredDocuments || filteredDocuments.length === 0) ? (
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Pending Documents</h3>
                <p className="text-gray-500">All documents have been processed or no documents match your search.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Event Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Organization</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Current Office</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date Received</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Submitted By</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                      {paginatedDocuments.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <span className="font-bold text-ustp-navy block">{doc.event_name}</span>
                            <span className="text-[10px] text-gray-400 font-mono">DOC-{doc.id}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-medium">
                            {doc.organization?.name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusColor(doc.status)}`}>
                              {doc.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-ustp-gold animate-pulse"></div>
                              <span className="text-gray-600">{(doc.current_office ?? doc.currentOffice)?.name ?? 'Unassigned'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{formatDate(doc.date_received)}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {(() => {
                                const user = doc.submitted_by ?? doc.submittedBy;
                                const initials = user?.full_name?.split(' ').map(n => n[0]).join('') || '?';
                                return (
                                  <>
                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">{initials}</div>
                                    <span className="text-gray-600">{user?.full_name ?? 'Unknown'}</span>
                                  </>
                                );
                              })()}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => navigate(`/documents/${doc.id}`)}
                              className="p-1 text-gray-400 hover:text-ustp-navy transition-colors opacity-0 group-hover:opacity-100"
                              aria-label="View or update document"
                            >
                              <MoreVertical size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                <p className="text-xs text-gray-400 font-medium whitespace-nowrap">
                  Showing {from} to {to} of {filteredDocuments.length} documents
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setClientPage(prev => Math.max(prev - 1, 1))}
                    disabled={clientPage === 1}
                    className={`px-4 py-2 text-xs font-bold transition-colors ${clientPage === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-ustp-navy'}`}
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].slice(0, 5).map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setClientPage(i + 1)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${clientPage === i + 1 ? 'bg-ustp-navy text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setClientPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={clientPage === totalPages}
                    className={`px-4 py-2 text-xs font-bold transition-colors ${clientPage === totalPages ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-ustp-navy'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
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

export default PendingPage;