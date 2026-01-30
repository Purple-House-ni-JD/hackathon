/**
 * New Document Page - Integrated with Backend API
 * 
 * Provides document creation interface using React Query:
 * - useOrganizations: Loads organization dropdown options
 * - useDocumentTypes: Loads document type dropdown options
 * - useOffices: Loads office dropdown options
 * - useCreateDocument: Mutation hook for submitting new documents
 * 
 * The form validates all required fields before submission.
 * Success redirects to the pending page, errors display inline.
 */

import React, { useState } from "react";
import { Plus, History, Bell, FileText, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminProfile from "../components/AdminProfile";
import Sidebar from "../components/Sidebar";
import { useCurrentUser } from "../hooks/useAuth";
import { useOrganizations } from "../hooks/useOrganizations";
import { useDocumentTypes, useOffices } from "../hooks/useMetadata";
import { useCreateDocument } from "../hooks/useDocuments";
import { type CreateDocumentData, type DocumentStatus } from "../types";
import { AxiosError } from "axios";

const NewDocumentPage = () => {
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUser();
  const { data: organizations } = useOrganizations();
  const { data: documentTypes } = useDocumentTypes();
  const { data: offices } = useOffices();
  const createMutation = useCreateDocument();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CreateDocumentData>({
    organization_id: 0,
    document_type_id: 0,
    event_name: "",
    status: "Received" as DocumentStatus,
    current_office_id: undefined,
    date_received: new Date().toISOString().split('T')[0],
  });

  const adminData = {
    email: currentUser?.email || "Loading...",
    role: currentUser?.user_type === 'admin' ? "Super Admin" : "Student Org",
    department: "Student Affairs",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: () => {
        setShowCreateForm(false);
        setFormData({
          organization_id: 0,
          document_type_id: 0,
          event_name: "",
          status: "Received",
          current_office_id: undefined,
          date_received: new Date().toISOString().split('T')[0],
        });
        navigate('/pending');
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans relative">
      <Sidebar activeTab="docs" />

      <main className="flex-1 bg-white text-neutral-dark rounded-none lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 shadow-2xl flex flex-col lg:flex-row overflow-hidden relative">
        <div className="flex-1 lg:px-4 pt-20 lg:pt-4 overflow-y-auto scrollbar-hide">
          <h1 className="text-3xl lg:text-4xl font-bold text-ustp-navy mb-10">
            Document Management
          </h1>

          {!showCreateForm ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ActionCard
                  icon={<Plus className="text-white" size={32} />}
                  color="bg-purple-600"
                  title="Log New Document"
                  description="Register a new submission from a student organization."
                  buttonLabel="Create Entry"
                  onClick={() => setShowCreateForm(true)}
                />
                <ActionCard
                  icon={<History className="text-white" size={32} />}
                  color="bg-ustp-gold"
                  title="Update Status"
                  description="Modify current routing status for existing documents."
                  buttonLabel="Update Record"
                  onClick={() => navigate('/pending')}
                />
                <ActionCard
                  icon={<Bell className="text-white" size={32} />}
                  color="bg-blue-600"
                  title="Manual Notifications"
                  description="Send custom alerts to organization representatives."
                  buttonLabel="Send Alert"
                  onClick={() => { }}
                />
                <ActionCard
                  icon={<FileText className="text-white" size={32} />}
                  color="bg-green-600"
                  title="Document History"
                  description="View the complete audit trail of status changes."
                  buttonLabel="View History"
                  onClick={() => navigate('/activity')}
                />
              </div>

              <div className="mt-12 p-6 bg-gray-50 border border-gray-100 rounded-[2rem]">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="text-green-500" size={20} />
                  <h3 className="font-bold text-ustp-navy">OSA Staff Guidelines</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-600 ml-8 list-disc">
                  <li>Ensure all physical copies match the digital metadata before logging.</li>
                  <li>Status updates should include clear remarks for organization clarity.</li>
                  <li>Manual notifications are reserved for urgent revisions or follow-ups.</li>
                  <li>Document history is immutable and serves as the official transaction log.</li>
                </ul>
              </div>
            </>
          ) : (
            <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-ustp-navy">Create New Document</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
              </div>

              {createMutation.isError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">
                    {createMutation.error instanceof AxiosError
                      ? createMutation.error.response?.data?.message || "Failed to create document. Please try again."
                      : "An error occurred. Please try again."}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Organization</label>
                    <select
                      name="organization_id"
                      required
                      value={formData.organization_id}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none bg-gray-50"
                    >
                      <option value={0}>Select Organization</option>
                      {organizations?.map(org => (
                        <option key={org.id} value={org.id}>{org.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Document Type</label>
                    <select
                      name="document_type_id"
                      required
                      value={formData.document_type_id}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none bg-gray-50"
                    >
                      <option value={0}>Select Document Type</option>
                      {documentTypes?.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">Event Name</label>
                    <input
                      type="text"
                      name="event_name"
                      required
                      value={formData.event_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none bg-gray-50"
                      placeholder="Enter event name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Current Office</label>
                    <select
                      name="current_office_id"
                      value={formData.current_office_id || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none bg-gray-50"
                    >
                      <option value="">None (Unassigned)</option>
                      {offices?.map(office => (
                        <option key={office.id} value={office.id}>{office.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Date Received</label>
                    <input
                      type="date"
                      name="date_received"
                      required
                      value={formData.date_received}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ustp-navy focus:border-ustp-navy outline-none bg-gray-50"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="px-8 py-3 bg-ustp-navy text-white rounded-xl font-bold hover:bg-[#0c2136] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createMutation.isPending ? 'Creating...' : 'Create Document'}
                  </button>
                </div>
              </form>
            </div>
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

const ActionCard = ({
  icon,
  color,
  title,
  description,
  buttonLabel,
  onClick,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
}) => (
  <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-start gap-4">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${color}`}>
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold text-ustp-navy mb-1">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
    <button
      onClick={onClick}
      className="mt-auto px-6 py-2 bg-ustp-navy text-white text-xs font-bold rounded-xl hover:bg-[#0c2136] transition-colors"
    >
      {buttonLabel}
    </button>
  </div>
);

export default NewDocumentPage;