/**
 * Activity Page - Integrated with Backend API
 * 
 * Displays recent document activity using React Query:
 * - useDocuments: Fetches recent documents sorted by updated_at
 * - Shows real-time document submissions, approvals, and rejections
 * - Supports pagination for browsing historical activity
 * 
 * Activity items are generated from document data including status changes,
 * organization information, and timestamps. The page automatically refreshes
 * when new documents are added or statuses are updated.
 */

import { useState } from "react";
import { FilePlus, AlertCircle, CheckCircle, Clock } from "lucide-react";
import AdminProfile from "../components/AdminProfile";
import Sidebar from "../components/Sidebar";
import { useDocuments } from "../hooks/useDocuments";
import { useCurrentUser } from "../hooks/useAuth";
import { type DocumentStatus } from "../types";
import { format } from "date-fns";

const ActivityPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: currentUser } = useCurrentUser();
  const { data: documentsData, isLoading } = useDocuments({
    sort_by: 'updated_at',
    sort_order: 'desc',
    per_page: itemsPerPage,
    page: currentPage,
  });

  const adminData = {
    email: currentUser?.email || "Loading...",
    role: currentUser?.user_type === 'admin' ? "Super Admin" : "Student Org",
    department: "Student Affairs",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
  };

  const getActivityIcon = (status: DocumentStatus) => {
    switch (status) {
      case 'Approved':
        return { icon: <CheckCircle size={20} />, color: 'bg-status-approved' };
      case 'Rejected':
        return { icon: <AlertCircle size={20} />, color: 'bg-status-rejected' };
      case 'Under Review':
        return { icon: <Clock size={20} />, color: 'bg-ustp-gold' };
      case 'Forwarded':
        return { icon: <Clock size={20} />, color: 'bg-blue-500' };
      default:
        return { icon: <FilePlus size={20} />, color: 'bg-purple-500' };
    }
  };

  const getActionText = (status: DocumentStatus) => {
    switch (status) {
      case 'Approved':
        return 'Approved';
      case 'Rejected':
        return 'Rejected';
      case 'Under Review':
        return 'Under Review';
      case 'Forwarded':
        return 'Forwarded';
      default:
        return 'Submitted';
    }
  };

  const formatTimestamp = (dateString: string) => {
    try {
      return format(new Date(dateString), 'yyyy-MM-dd hh:mm a');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans relative">
      <Sidebar activeTab="activity" />

      <main className="flex-1 bg-white text-neutral-dark rounded-none lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 shadow-2xl flex overflow-hidden relative">
        <div className="flex-1 px-4 lg:px-8 pt-20 lg:pt-4 overflow-y-auto scrollbar-hide">
          <h1 className="text-4xl font-bold text-ustp-navy mb-8">Activity</h1>

          {isLoading ? (
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-100 rounded-xl animate-pulse">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              ))}
            </div>
          ) : !documentsData?.data || documentsData.data.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FilePlus className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Activity Yet</h3>
              <p className="text-gray-500">Document activities will appear here.</p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {documentsData.data.map((doc) => {
                  const { icon, color } = getActivityIcon(doc.status);
                  return (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-4 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${color}`}>
                          {icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">
                            {doc.event_name}
                          </h4>
                          <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            {getActionText(doc.status)} by {doc.current_office?.name || 'Unknown'} - Status: {doc.status}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold text-sm text-gray-500">
                          {formatTimestamp(doc.updated_at)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {documentsData.last_page > 1 && (
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-8 pb-4">
                  <p className="text-xs text-gray-400 font-medium">
                    Page {currentPage} of {documentsData.last_page}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 text-xs font-bold transition-all ${currentPage === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-ustp-navy'}`}
                    >
                      Prev
                    </button>
                    <div className="flex items-center gap-1">
                      {[...Array(Math.min(documentsData.last_page, 5))].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-ustp-navy text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, documentsData.last_page))}
                      disabled={currentPage === documentsData.last_page}
                      className={`px-4 py-2 text-xs font-bold transition-all ${currentPage === documentsData.last_page ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-ustp-navy'}`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
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

export default ActivityPage;