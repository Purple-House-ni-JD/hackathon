/**
 * Profile Page - Integrated with Backend API
 * 
 * Displays and allows editing of user profile using React Query:
 * - useCurrentUser: Fetches authenticated user data
 * - Form state managed locally until saved
 * - Future: Add mutation hook for profile updates
 * 
 * The page shows read-only fields (role, department) and editable fields
 * (name, email, bio). Admin-specific fields are indicated appropriately.
 */

import React, { useState, useEffect } from "react";
import { User, Camera, Mail, Shield, Building } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useCurrentUser } from "../hooks/useAuth";

const ProfilePage = () => {
  const { data: currentUser, isLoading } = useCurrentUser();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    bio: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.full_name,
        email: currentUser.email,
        role: currentUser.user_type === 'admin' ? 'Super Admin' : 'Student Organization',
        department: currentUser.organization_id ? 'Student Organization' : 'Student Affairs',
        bio: "Dedicated to improving student document workflow efficiency at USTP.",
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans relative">
        <Sidebar activeTab="profile" />
        <main className="flex-1 bg-white text-neutral-dark lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 shadow-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-ustp-navy border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500 font-medium">Loading profile...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans relative">
      <Sidebar activeTab="profile" />

      <main className="flex-1 bg-white text-neutral-dark lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 shadow-2xl flex flex-col items-center overflow-y-auto scrollbar-hide">
        <div className="w-full max-w-4xl pt-20 lg:pt-0">
          <h1 className="text-3xl lg:text-4xl font-bold text-ustp-navy mb-10 text-center lg:text-left">
            Edit Profile
          </h1>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
                  alt="Profile"
                  className="w-40 h-40 rounded-[2.5rem] object-cover shadow-2xl"
                />
                <button className="absolute inset-0 bg-black/40 rounded-[2.5rem] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera className="text-white" size={32} />
                </button>
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                {currentUser?.user_type === 'admin' ? 'Administrator' : 'Student Org User'}
              </p>
            </div>

            <div className="flex-1 space-y-8 pb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup
                  icon={<User size={18} />}
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputGroup
                  icon={<Mail size={18} />}
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputGroup
                  icon={<Shield size={18} />}
                  label="Role"
                  name="role"
                  value={formData.role}
                  readOnly
                />
                <InputGroup
                  icon={<Building size={18} />}
                  label="Department"
                  name="department"
                  value={formData.department}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-4">
                  About Me
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-3xl outline-none focus:ring-2 focus:ring-ustp-navy/10 text-gray-700 resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => currentUser && setFormData({
                    name: currentUser.full_name,
                    email: currentUser.email,
                    role: currentUser.user_type === 'admin' ? 'Super Admin' : 'Student Organization',
                    department: currentUser.organization_id ? 'Student Organization' : 'Student Affairs',
                    bio: "Dedicated to improving student document workflow efficiency at USTP.",
                  })}
                  className="px-8 py-3 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  className="px-8 py-3 bg-ustp-navy text-white rounded-2xl font-bold shadow-xl hover:bg-[#0c2136] transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const InputGroup = ({ icon, label, name, value, onChange, readOnly = false }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 uppercase ml-4">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full bg-gray-50 border border-gray-100 py-3 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-ustp-navy/10 text-gray-700 ${
          readOnly ? "opacity-60 cursor-not-allowed" : ""
        }`}
      />
    </div>
  </div>
);

export default ProfilePage;