import React, { useState } from "react";
import UserSidebar from "../../components/UserSidebar";
import { Search, MapPin, Check, Clock, FileText } from "lucide-react";
import { useDocuments } from "../../hooks/useDocuments";
import { useDocument } from "../../hooks/useDocuments";
import { format } from "date-fns";

const UserTrack = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedId, setSearchedId] = useState<number | null>(null);

  const { data: allData } = useDocuments({
    per_page: 500,
    sort_by: "updated_at",
    sort_order: "desc",
  });
  const documents = allData?.data ?? [];

  const documentId =
    searchedId === -1 ? null : (searchedId ?? (documents.length ? documents[0].id : null));
  const { data: document, isLoading: docLoading } = useDocument(documentId ?? 0);

  const handleSearch = () => {
    const raw = searchTerm.trim();
    if (!raw) {
      setSearchedId(null);
      return;
    }
    const num = parseInt(raw, 10);
    if (!Number.isNaN(num) && num > 0) {
      setSearchedId(num);
      return;
    }
    const m = raw.match(/^DOC-(\d+)$/i);
    if (m) {
      setSearchedId(parseInt(m[1], 10));
      return;
    }
    const found = documents.find(
      (d) =>
        d.event_name?.toLowerCase().includes(raw.toLowerCase()) ||
        (d.id && raw === String(d.id))
    );
    if (found) setSearchedId(found.id);
    else setSearchedId(-1);
  };

  const history = (document?.statusHistory ?? (document as any)?.status_history ?? []) as any[];
  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const displayDoc = document && documentId && documentId > 0 ? document : null;
  const notFound = searchedId === -1 || (searchTerm.trim() && searchedId !== null && !displayDoc);

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
      <UserSidebar activeTab="track" />

      <main className="flex-1 bg-white text-neutral-dark rounded-[2.5rem] my-4 mr-4 p-8 shadow-2xl flex flex-col overflow-hidden relative">
        <div className="max-w-2xl mx-auto w-full text-center mt-8 mb-12">
          <h1 className="text-3xl font-bold text-ustp-navy mb-2">
            Track Your Document
          </h1>
          <p className="text-gray-500 mb-8">
            Enter your Tracking Reference Number (TRN) or document ID to see live status.
          </p>

          <div className="relative flex gap-2 w-full max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="e.g., DOC-1 or 1"
              className="flex-1 pl-6 pr-24 py-4 bg-white border-2 border-gray-200 rounded-full shadow-sm text-lg focus:outline-none focus:border-ustp-navy focus:ring-4 focus:ring-ustp-navy/10 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              type="button"
              onClick={handleSearch}
              className="absolute right-2 top-2 bottom-2 bg-ustp-navy hover:bg-blue-900 text-white px-6 rounded-full font-bold transition flex items-center justify-center"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 md:px-20 pb-10">
          {notFound && searchTerm.trim() ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <p className="text-red-700 font-medium">No document found for &quot;{searchTerm}&quot;.</p>
              <p className="text-sm text-gray-600 mt-2">Try DOC-{'{id}'} or event name.</p>
            </div>
          ) : docLoading && documentId ? (
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex items-center justify-center min-h-[200px]">
              <div className="animate-spin w-12 h-12 border-4 border-ustp-navy border-t-transparent rounded-full" />
            </div>
          ) : displayDoc ? (
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center gap-4 border-b border-gray-200 pb-6 mb-8">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-ustp-navy">
                  <FileText size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-ustp-navy">
                    {displayDoc.event_name}
                  </h2>
                  <div className="flex gap-3 mt-1">
                    <span className="text-sm font-mono bg-ustp-navy text-white px-2 py-0.5 rounded">
                      DOC-{displayDoc.id}
                    </span>
                    <span className="text-sm text-gray-500">
                      Submitted by: {(displayDoc.organization as any)?.name ?? "—"}
                    </span>
                  </div>
                </div>
                <div className="ml-auto text-right hidden md:block">
                  <p className="text-sm text-gray-500">Current Status</p>
                  <p className="text-xl font-bold text-ustp-gold">{displayDoc.status}</p>
                </div>
              </div>

              <div className="relative pl-4">
                <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gray-200" />
                <div className="space-y-8 relative">
                  {sortedHistory.length === 0 ? (
                    <div className="flex gap-6">
                      <div className="w-14 h-14 rounded-full border-4 border-ustp-gold flex-shrink-0 flex items-center justify-center z-10 bg-white">
                        <Clock size={24} strokeWidth={3} />
                      </div>
                      <div className="pt-2">
                        <h4 className="text-lg font-bold text-gray-800">{displayDoc.status}</h4>
                        <p className="text-sm text-gray-500">
                          Current office: {(displayDoc.current_office ?? (displayDoc as any).currentOffice)?.name ?? "—"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    sortedHistory.map((step, index) => {
                      const isLast = index === sortedHistory.length - 1;
                      const office = (step.new_office ?? step.newOffice) ?? (step.previous_office ?? step.previousOffice);
                      const officeName = office?.name ?? "—";
                      return (
                        <div key={step.id ?? index} className="flex gap-6 relative">
                          <div
                            className={`w-14 h-14 rounded-full border-4 flex-shrink-0 flex items-center justify-center z-10 bg-white ${
                              isLast ? "border-ustp-gold text-ustp-gold" : "border-green-500 text-green-500"
                            }`}
                          >
                            {isLast ? (
                              <Clock size={24} strokeWidth={3} />
                            ) : (
                              <Check size={24} strokeWidth={3} />
                            )}
                          </div>
                          <div className="flex-1 pt-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-lg font-bold text-gray-800">{officeName}</h4>
                                <p className="text-sm font-semibold text-ustp-navy">
                                  {step.new_status ?? step.new_status}
                                </p>
                              </div>
                              <span className="text-sm font-mono text-gray-500">
                                {step.created_at
                                  ? format(new Date(step.created_at), "MMM dd, hh:mm a")
                                  : "—"}
                              </span>
                            </div>
                            {step.remarks && (
                              <div className="mt-2 bg-white p-3 rounded-lg border border-gray-200 text-sm text-gray-600 inline-block">
                                <span className="font-bold text-xs uppercase text-gray-400 block mb-1">
                                  Remarks
                                </span>
                                {step.remarks}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          ) : !documentId && documents.length === 0 ? (
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 text-center">
              <FileText className="mx-auto text-gray-300" size={48} />
              <p className="text-gray-600 mt-4">No documents to track. Submit documents via OSA.</p>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default UserTrack;
