/**
 * Organization Detail Page
 *
 * Displays a single organization and allows updating its details (Create/Update only).
 * Data: useOrganization(id); mutations: useUpdateOrganization. On success invalidates
 * organizations queries. Assumes backend returns 404 for missing org; errors shown inline.
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2 } from "lucide-react";
import AdminProfile from "../components/AdminProfile";
import Sidebar from "../components/Sidebar";
import { useOrganization } from "../hooks/useOrganizations";
import { useUpdateOrganization } from "../hooks/useOrganizations";
import { useCurrentUser } from "../hooks/useAuth";
import { type UpdateOrganizationData } from "../types";
import { AxiosError } from "axios";

const OrganizationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const orgId = id ? parseInt(id, 10) : NaN;
  const isValidId = Number.isInteger(orgId) && orgId > 0;

  const { data: currentUser } = useCurrentUser();
  const { data: organization, isLoading, isError } = useOrganization(isValidId ? orgId : 0);
  const updateOrg = useUpdateOrganization();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateOrganizationData>({
    name: "",
    abbreviation: "",
    contact_email: "",
    contact_person: "",
    is_active: true,
  });

  useEffect(() => {
    if (organization) {
      setFormData({
        name: organization.name,
        abbreviation: organization.abbreviation ?? "",
        contact_email: organization.contact_email,
        contact_person: organization.contact_person ?? "",
        is_active: organization.is_active,
      });
    }
  }, [organization]);

  const adminData = {
    email: currentUser?.email ?? "Loading...",
    role: currentUser?.user_type === "admin" ? "Super Admin" : "Student Org",
    department: "Student Affairs",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidId) return;
    updateOrg.mutate(
      { id: orgId, data: formData },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (!isValidId) {
    return (
      <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
        <Sidebar activeTab="organizations" />
        <main className="flex-1 bg-white text-neutral-dark lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 font-medium">Invalid organization ID.</p>
            <button
              type="button"
              onClick={() => navigate("/organizations")}
              className="mt-4 px-4 py-2 bg-ustp-navy text-white rounded-xl font-bold hover:bg-[#0c2136]"
            >
              Back to Organizations
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (isLoading || !organization) {
    return (
      <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
        <Sidebar activeTab="organizations" />
        <main className="flex-1 bg-white text-neutral-dark lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 flex items-center justify-center">
          {isError ? (
            <div className="text-center">
              <p className="text-red-600 font-medium">Failed to load organization.</p>
              <button
                type="button"
                onClick={() => navigate("/organizations")}
                className="mt-4 px-4 py-2 bg-ustp-navy text-white rounded-xl font-bold"
              >
                Back to Organizations
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
      <Sidebar activeTab="organizations" />
      <main className="flex-1 bg-white text-neutral-dark lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 shadow-2xl flex flex-col lg:flex-row overflow-hidden relative">
        <div className="flex-1 lg:px-4 pt-20 lg:pt-4 overflow-y-auto scrollbar-hide">
          <button
            type="button"
            onClick={() => navigate("/organizations")}
            className="flex items-center gap-2 text-gray-500 hover:text-ustp-navy font-medium mb-6"
          >
            <ArrowLeft size={18} /> Back to Organizations
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-ustp-navy">
                <Building2 size={28} />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-ustp-navy">{organization.name}</h1>
                <p className="text-gray-500 font-medium">
                  {organization.abbreviation || "No abbreviation"}
                </p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold border ${
                    organization.is_active
                      ? "bg-green-50 text-green-600 border-green-100"
                      : "bg-amber-50 text-amber-600 border-amber-100"
                  }`}
                >
                  {organization.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            {currentUser?.user_type === "admin" && (
              <button
                type="button"
                onClick={() => setIsEditing((prev) => !prev)}
                className="px-6 py-2 bg-ustp-navy text-white text-sm font-bold rounded-xl hover:bg-[#0c2136] transition-colors"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            )}
          </div>

          {updateOrg.isError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {updateOrg.error instanceof AxiosError
                ? (updateOrg.error.response?.data as { message?: string })?.message ??
                  "Failed to update organization."
                : "An error occurred."}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-4 max-w-xl">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Abbreviation</label>
                <input
                  type="text"
                  name="abbreviation"
                  value={formData.abbreviation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contact email</label>
                <input
                  type="email"
                  name="contact_email"
                  required
                  value={formData.contact_email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contact person</label>
                <input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none bg-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_active"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-ustp-navy focus:ring-ustp-navy"
                />
                <label htmlFor="is_active" className="text-sm font-semibold text-gray-700">
                  Active
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateOrg.isPending}
                  className="px-6 py-3 bg-ustp-navy text-white rounded-xl font-bold hover:bg-[#0c2136] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updateOrg.isPending ? "Saving…" : "Save changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 max-w-xl">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Contact</h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-500 font-medium">Contact person</dt>
                  <dd className="text-gray-800 font-semibold">{organization.contact_person || "—"}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 font-medium">Contact email</dt>
                  <dd className="text-gray-800 font-semibold">{organization.contact_email}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>

        <div className="hidden lg:flex w-80 border-l border-gray-100 pl-8 pt-4 flex-col items-center">
          <AdminProfile {...adminData} variant="light" />
        </div>
      </main>
    </div>
  );
};

export default OrganizationDetailPage;
