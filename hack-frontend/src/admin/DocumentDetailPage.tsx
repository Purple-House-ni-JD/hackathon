/**
 * Document Detail / Update Status Page
 *
 * Shows a single document and allows updating its status (Create/Update only).
 * Data: useDocument(id), useOffices for office dropdown; mutations: useUpdateDocumentStatus.
 * On success invalidates documents queries and shows success; errors shown inline.
 * Assumes backend returns snake_case relations (current_office, etc.); both camel and snake used for display.
 */

import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AdminProfile from "../components/AdminProfile";
import Sidebar from "../components/Sidebar";
import { useDocument } from "../hooks/useDocuments";
import { useUpdateDocumentStatus } from "../hooks/useDocuments";
import { useOffices } from "../hooks/useMetadata";
import { useCurrentUser } from "../hooks/useAuth";
import { type DocumentStatus } from "../types";
import { format } from "date-fns";
import { AxiosError } from "axios";

const STATUS_OPTIONS: DocumentStatus[] = [
  "Received",
  "Under Review",
  "Forwarded",
  "Approved",
  "Rejected",
];

const DocumentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const documentId = id ? parseInt(id, 10) : NaN;
  const isValidId = Number.isInteger(documentId) && documentId > 0;

  const { data: currentUser } = useCurrentUser();
  const { data: document, isLoading: docLoading, isError: docError } = useDocument(isValidId ? documentId : 0);
  const { data: offices } = useOffices();
  const updateStatus = useUpdateDocumentStatus();

  const [statusOverride, setStatusOverride] = useState<DocumentStatus | null>(null);
  const [officeOverride, setOfficeOverride] = useState<number | null | "">("");
  const [remarks, setRemarks] = useState("");

  const submittedByUser = document?.submitted_by ?? document?.submittedBy;
  const submittedByName =
    submittedByUser && typeof submittedByUser === "object" && "full_name" in submittedByUser
      ? (submittedByUser as { full_name?: string }).full_name
      : undefined;
  const org = document?.organization;

  const effectiveStatus = statusOverride ?? document?.status ?? "";
  const effectiveOfficeId =
    officeOverride !== "" && officeOverride !== null
      ? officeOverride
      : (document?.current_office_id ?? "");

  const adminData = useMemo(
    () => ({
      email: currentUser?.email ?? "Loading...",
      role: currentUser?.user_type === "admin" ? "Super Admin" : "Student Org",
      department: "Student Affairs",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    }),
    [currentUser]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidId || !effectiveStatus) return;
    updateStatus.mutate(
      {
        id: documentId,
        data: {
          status: effectiveStatus as DocumentStatus,
          ...(effectiveOfficeId !== "" && effectiveOfficeId !== null ? { current_office_id: Number(effectiveOfficeId) } : {}),
          ...(remarks.trim() ? { remarks: remarks.trim() } : {}),
        },
      },
      {
        onSuccess: () => {
          setRemarks("");
        },
      }
    );
  };

  if (!isValidId) {
    return (
      <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
        <Sidebar activeTab="pending" />
        <main className="flex-1 bg-white text-neutral-dark lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 font-medium">Invalid document ID.</p>
            <button
              type="button"
              onClick={() => navigate("/pending")}
              className="mt-4 px-4 py-2 bg-ustp-navy text-white rounded-xl font-bold hover:bg-[#0c2136]"
            >
              Back to Pending
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (docLoading || !document) {
    return (
      <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
        <Sidebar activeTab="pending" />
        <main className="flex-1 bg-white text-neutral-dark lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 flex items-center justify-center">
          {docError ? (
            <div className="text-center">
              <p className="text-red-600 font-medium">Failed to load document.</p>
              <button
                type="button"
                onClick={() => navigate("/pending")}
                className="mt-4 px-4 py-2 bg-ustp-navy text-white rounded-xl font-bold"
              >
                Back to Pending
              </button>
            </div>
          ) : (
            <div className="animate-spin w-12 h-12 border-4 border-ustp-navy border-t-transparent rounded-full" />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans relative">
      <Sidebar activeTab="pending" />
      <main className="flex-1 bg-white text-neutral-dark lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 shadow-2xl flex flex-col lg:flex-row overflow-hidden relative">
        <div className="flex-1 lg:px-4 pt-20 lg:pt-4 overflow-y-auto scrollbar-hide">
          <button
            type="button"
            onClick={() => navigate("/pending")}
            className="flex items-center gap-2 text-gray-500 hover:text-ustp-navy font-medium mb-6"
          >
            <ArrowLeft size={18} /> Back to Pending
          </button>

          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-ustp-navy mb-1">{document.event_name}</h1>
            <p className="text-sm text-gray-500 font-mono">DOC-{document.id}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Details</h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-500 font-medium">Organization</dt>
                  <dd className="text-gray-800 font-semibold">{org?.name ?? "N/A"}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 font-medium">Status</dt>
                  <dd className="text-ustp-navy font-bold">{document.status}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 font-medium">Current office</dt>
                  <dd className="text-gray-800">{(document.current_office ?? document.currentOffice)?.name ?? "Unassigned"}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 font-medium">Date received</dt>
                  <dd className="text-gray-800">
                    {document.date_received
                      ? (() => {
                          try {
                            return format(new Date(document.date_received), "MMM dd, yyyy");
                          } catch {
                            return document.date_received;
                          }
                        })()
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500 font-medium">Submitted by</dt>
                  <dd className="text-gray-800">{submittedByName ?? "Unknown"}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Update status</h2>
              {updateStatus.isError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                  {updateStatus.error instanceof AxiosError
                    ? (updateStatus.error.response?.data as { message?: string })?.message ?? "Failed to update status."
                    : "An error occurred."}
                </div>
              )}
              {updateStatus.isSuccess && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 font-medium">
                  Status updated successfully.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={effectiveStatus}
                    onChange={(e) => setStatusOverride(e.target.value as DocumentStatus)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none bg-gray-50"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Assigned office</label>
                  <select
                    value={effectiveOfficeId}
                    onChange={(e) =>
                      setOfficeOverride(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none bg-gray-50"
                  >
                    <option value="">Unassigned</option>
                    {offices?.map((office) => (
                      <option key={office.id} value={office.id}>
                        {office.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Remarks (optional)</label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none bg-gray-50 resize-none"
                    placeholder="Add remarks for this status change"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/pending")}
                    className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateStatus.isPending}
                    className="px-6 py-3 bg-ustp-navy text-white rounded-xl font-bold hover:bg-[#0c2136] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updateStatus.isPending ? "Updating…" : "Update status"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex w-80 border-l border-gray-100 pl-8 pt-4 flex-col items-center">
          <AdminProfile {...adminData} variant="light" />
        </div>
      </main>
    </div>
  );
};

export default DocumentDetailPage;
