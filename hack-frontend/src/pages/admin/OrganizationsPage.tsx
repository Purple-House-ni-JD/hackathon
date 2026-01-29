import React from "react";
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
    Search,
    Plus,
    Building2,
    ExternalLink,
} from "lucide-react";
import AdminProfile from "../../components/AdminProfile";

const OrganizationsPage = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 4;

    const adminData = {
        email: "osa.admin@ustp.edu.ph",
        role: "Super Admin",
        department: "Student Affairs",
        avatarUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    };

    const allOrgs = [
        { id: 1, name: "Supreme Student Government", type: "University-wide", members: 45, status: "Active" },
        { id: 2, name: "Engineering Society", type: "College-based", members: 120, status: "Active" },
        { id: 3, name: "Arts & Dance Troupe", type: "Interest-based", members: 30, status: "Probation" },
        { id: 4, name: "VISTA Developers", type: "Tech-based", members: 15, status: "Active" },
        { id: 5, name: "Psychology Society", type: "College-based", members: 85, status: "Active" },
        { id: 6, name: "Music Club", type: "Interest-based", members: 24, status: "Active" },
        { id: 7, name: "Debate Society", type: "Academic", members: 18, status: "Probation" },
        { id: 8, name: "Photography Society", type: "Interest-based", members: 40, status: "Active" },
    ];

    const totalPages = Math.ceil(allOrgs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentOrgs = allOrgs.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans relative">
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-ustp-navy/80 backdrop-blur-xl border-b border-white/5 h-16 px-4 flex items-center justify-between z-50">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl">
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
        lg:translate-x-0 lg:flex w-64 flex flex-col pt-20 lg:pt-12 px-8 pb-8 space-y-10 
        fixed lg:relative inset-y-0 left-0 bg-ustp-navy z-40 transition-transform duration-300
        overflow-y-auto scrollbar-hide
      `}>
                <h2 className="text-xl font-medium text-gray-400 uppercase tracking-widest pl-2">System</h2>
                <nav className="flex flex-col space-y-6 flex-1">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" onClick={() => { setIsSidebarOpen(false); navigate("/dashboard"); }} />
                    <NavItem icon={<Activity size={20} />} label="Activity" onClick={() => { setIsSidebarOpen(false); navigate("/activity"); }} />
                    <NavItem icon={<Clock size={20} />} label="Pending" onClick={() => { setIsSidebarOpen(false); navigate("/pending"); }} />
                    <NavItem icon={<FilePlus size={20} />} label="New Document" onClick={() => { setIsSidebarOpen(false); navigate("/new-document"); }} />
                    <NavItem icon={<Users size={20} />} label="Organizations" active onClick={() => setIsSidebarOpen(false)} />
                    <NavItem icon={<User size={20} />} label="Profile" onClick={() => { setIsSidebarOpen(false); navigate("/profile"); }} />
                </nav>
                <div className="lg:hidden mt-auto pt-8 border-t border-white/10">
                    <AdminProfile {...adminData} variant="dark" />
                </div>
            </aside>

            {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

            <main className="flex-1 bg-white text-neutral-dark lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 shadow-2xl flex flex-col lg:flex-row overflow-hidden relative">
                <div className="flex-1 lg:px-4 pt-20 lg:pt-4 overflow-y-auto scrollbar-hide">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <h1 className="text-3xl lg:text-4xl font-bold text-ustp-navy">Organizations</h1>
                        <div className="flex items-center gap-2">
                            <div className="relative group flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="text" placeholder="Search orgs..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-ustp-navy/20 w-full" />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-ustp-navy text-white text-sm font-bold rounded-xl hover:bg-[#0c2136] transition-colors whitespace-nowrap">
                                <Plus size={18} /> Add New
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentOrgs.map(org => (
                            <div key={org.id} className="p-6 bg-white border border-gray-100 rounded-[2rem] hover:shadow-lg transition-all group overflow-hidden relative">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-ustp-navy group-hover:bg-ustp-navy group-hover:text-white transition-colors duration-300">
                                        <Building2 size={24} />
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${org.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                        {org.status}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-ustp-navy mb-1">{org.name}</h3>
                                    <p className="text-xs text-gray-400 font-medium mb-4">{org.type}</p>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 font-medium">{org.members} Members</span>
                                        <button className="text-ustp-navy font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Details <ExternalLink size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

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
                                {[...Array(totalPages)].map((_, i) => (
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
                </div>

                <div className="hidden lg:flex w-80 border-l border-gray-100 pl-8 pt-4 flex-col items-center">
                    <AdminProfile {...adminData} variant="light" />
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

export default OrganizationsPage;
