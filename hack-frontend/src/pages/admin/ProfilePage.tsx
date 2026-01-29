import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Activity,
    Clock,
    FilePlus,
    Users,
    User,
    Menu,
    X,
    Camera,
    Mail,
    Shield,
    Building,
} from "lucide-react";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "Isabella Gonzales",
        email: "osa.admin@ustp.edu.ph",
        role: "Super Admin",
        department: "Student Affairs",
        phone: "+63 912 345 6789",
        bio: "Dedicated to improving student document workflow efficiency at USTP.",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans relative">
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-ustp-navy/80 backdrop-blur-xl border-b border-white/5 h-16 px-4 flex items-center justify-between z-50">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2.5 bg-white/5 rounded-xl">
                    {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
                <div className="flex items-center gap-2">
                    <img src="/vistalogo.png" alt="Logo" className="w-7 h-7" />
                    <span className="font-bold tracking-tight">VISTA</span>
                </div>
                <div className="w-10"></div>
            </div>

            <aside className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:flex w-64 flex flex-col pt-12 px-8 pb-8 space-y-10 
        fixed lg:relative inset-y-0 left-0 bg-ustp-navy z-40 transition-transform duration-300
      `}>
                <h2 className="text-xl font-medium text-gray-400 uppercase tracking-widest pl-2">System</h2>
                <nav className="flex flex-col space-y-6 flex-1">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" onClick={() => navigate("/dashboard")} />
                    <NavItem icon={<Activity size={20} />} label="Activity" onClick={() => navigate("/activity")} />
                    <NavItem icon={<Clock size={20} />} label="Pending" onClick={() => navigate("/pending")} />
                    <NavItem icon={<FilePlus size={20} />} label="New Document" onClick={() => navigate("/new-document")} />
                    <NavItem icon={<Users size={20} />} label="Organizations" onClick={() => navigate("/organizations")} />
                    <NavItem icon={<User size={20} />} label="Profile" active />
                </nav>
            </aside>

            {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

            <main className="flex-1 bg-white text-neutral-dark lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 shadow-2xl flex flex-col items-center overflow-y-auto scrollbar-hide">
                <div className="w-full max-w-4xl pt-12 lg:pt-0">
                    <h1 className="text-3xl lg:text-4xl font-bold text-ustp-navy mb-10 text-center lg:text-left">Edit Profile</h1>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* AVATAR SECTION */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80" alt="Profile" className="w-40 h-40 rounded-[2.5rem] object-cover shadow-2xl" />
                                <button className="absolute inset-0 bg-black/40 rounded-[2.5rem] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <Camera className="text-white" size={32} />
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Administrator</p>
                        </div>

                        {/* FORM SECTION */}
                        <div className="flex-1 space-y-8 pb-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup icon={<User size={18} />} label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                                <InputGroup icon={<Mail size={18} />} label="Email Address" name="email" value={formData.email} onChange={handleChange} />
                                <InputGroup icon={<Shield size={18} />} label="Role" name="role" value={formData.role} readOnly />
                                <InputGroup icon={<Building size={18} />} label="Department" name="department" value={formData.department} readOnly />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase ml-4">About Me</label>
                                <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-3xl outline-none focus:ring-2 focus:ring-ustp-navy/10 text-gray-700 resize-none" />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button className="px-8 py-3 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-colors">Discard</button>
                                <button className="px-8 py-3 bg-ustp-navy text-white rounded-2xl font-bold shadow-xl hover:bg-[#0c2136] transition-all">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void; }) => (
    <div onClick={onClick} className={`flex items-center gap-4 cursor-pointer group transition-all duration-200 ${active ? "opacity-100 translate-x-2" : "opacity-60 hover:opacity-100 hover:translate-x-1"}`}>
        <div className={`${active ? "text-ustp-gold" : "text-white group-hover:text-ustp-gold"}`}>{icon}</div>
        <span className={`text-lg font-medium ${active ? "text-white" : "text-gray-300 group-hover:text-white"}`}>{label}</span>
    </div>
);

const InputGroup = ({ icon, label, name, value, onChange, readOnly = false }: any) => (
    <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase ml-4">{label}</label>
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
            <input type="text" name={name} value={value} onChange={onChange} readOnly={readOnly} className={`w-full bg-gray-50 border border-gray-100 py-3 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-ustp-navy/10 text-gray-700 ${readOnly ? "opacity-60 cursor-not-allowed" : ""}`} />
        </div>
    </div>
);

export default ProfilePage;
