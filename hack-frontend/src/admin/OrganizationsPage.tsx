/**
 * Organizations Page - Integrated with Backend API
 * 
 * Displays student organizations using React Query:
 * - useOrganizations: Fetches all organizations with search support
 * - Supports client-side pagination for better UX
 * - Loading and error states handled gracefully
 * - Admin users can view inactive organizations
 * 
 * Search functionality filters organizations by name or abbreviation.
 * Organizations are displayed in a grid with status badges and member counts.
 */

import { useState, useMemo } from "react";
import { Search, Plus, Building2, ExternalLink } from "lucide-react";
import AdminProfile from "../components/AdminProfile";
import Sidebar from "../components/Sidebar";
import { useOrganizations } from "../hooks/useOrganizations";
import { useCurrentUser } from "../hooks/useAuth";

const OrganizationsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;

  const { data: currentUser } = useCurrentUser();
  const { data: organizations, isLoading, isError } = useOrganizations({
    search: searchQuery || undefined,
  });

  const paginatedOrgs = useMemo(() => {
    if (!organizations) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return organizations.slice(startIndex, startIndex + itemsPerPage);
  }, [organizations, currentPage]);

  const totalPages = Math.ceil((organizations?.length || 0) / itemsPerPage);

  const adminData = {
    email: currentUser?.email || "Loading...",
    role: currentUser?.user_type === 'admin' ? "Super Admin" : "Student Org",
    department: "Student Affairs",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
  };

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans relative">
      <Sidebar activeTab="organizations" />

      <main className="flex-1 bg-white text-neutral-dark lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 shadow-2xl flex flex-col lg:flex-row overflow-hidden relative">
        <div className="flex-1 lg:px-4 pt-20 lg:pt-4 overflow-y-auto scrollbar-hide">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-ustp-navy">Organizations</h1>
            <div className="flex items-center gap-2">
              <div className="relative group flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search orgs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-ustp-navy/20 w-full"
                />
              </div>
              {currentUser?.user_type === 'admin' && (
                <button className="flex items-center gap-2 px-4 py-2 bg-ustp-navy text-white text-sm font-bold rounded-xl hover:bg-[#0c2136] transition-colors whitespace-nowrap">
                  <Plus size={18} /> Add New
                </button>
              )}
            </div>
          </div>

          {isError && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl mb-6">
              <p className="text-red-600 font-medium">Failed to load organizations. Please try again.</p>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-6 bg-gray-100 rounded-[2rem] animate-pulse">
                  <div className="h-12 w-12 bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : !organizations || organizations.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Organizations Found</h3>
                <p className="text-gray-500">
                  {searchQuery ? 'No organizations match your search.' : 'No organizations have been added yet.'}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedOrgs.map(org => (
                  <div key={org.id} className="p-6 bg-white border border-gray-100 rounded-[2rem] hover:shadow-lg transition-all group overflow-hidden relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-ustp-navy group-hover:bg-ustp-navy group-hover:text-white transition-colors duration-300">
                        <Building2 size={24} />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${org.is_active ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                        {org.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-ustp-navy mb-1">{org.name}</h3>
                      <p className="text-xs text-gray-400 font-medium mb-4">
                        {org.abbreviation || 'No abbreviation'}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-gray-500 font-medium text-xs">Contact</p>
                          <p className="text-gray-700 font-semibold">{org.contact_person || 'N/A'}</p>
                        </div>
                        <button className="text-ustp-navy font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Details <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-8 pb-4">
                  <p className="text-xs text-gray-400 font-medium whitespace-nowrap">
                    Page {currentPage} of {totalPages}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 text-xs font-bold transition-all ${currentPage === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-ustp-navy'}`}
                    >
                      Previous
                    </button>
                    <div className="flex items-center gap-1">
                      {[...Array(Math.min(totalPages, 5))].map((_, i) => (
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
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 text-xs font-bold transition-all ${currentPage === totalPages ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-ustp-navy'}`}
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
        </div>
      </main>
    </div>
  );
};

export default OrganizationsPage;