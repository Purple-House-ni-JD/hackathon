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
    Filter,
    MoreVertical,
} from "lucide-react";
import AdminProfile from "../../components/AdminProfile";

const PendingPage = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 5;

    const adminData = {
        email: "osa.admin@ustp.edu.ph",
        role: "Super Admin",
        department: "Student Affairs",
        avatarUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    };

    // Mock data for pending documents (expanded for pagination demo)
    const allPendingDocs = [
        {
            id: "DOC-2026-001",
            eventName: "University Foundation Day",
            organization: "Supreme Student Government",
            currentStatus: "Under Review",
            currentOffice: "Office of Student Affairs",
            dateReceived: "Jan 28, 2026",
            submittedBy: "Juan Dela Cruz",
        },
        {
            id: "DOC-2026-005",
            eventName: "STEM Exhibit 2026",
            organization: "Engineering convergence",
            currentStatus: "Forwarded to OSA",
            currentOffice: "Dean's Office",
            dateReceived: "Jan 29, 2026",
            submittedBy: "Maria Clara",
        },
        {
            id: "DOC-2026-012",
            eventName: "Cultural Night Gala",
            organization: "Arts & Dance Troupe",
            currentStatus: "Under Review",
            currentOffice: "Office of Student Affairs",
            dateReceived: "Jan 30, 2026",
            submittedBy: "Pedro Penduko",
        },
        {
            id: "DOC-2026-015",
            eventName: "Sports Fest 2026",
            organization: "Athletics Club",
            currentStatus: "Under Review",
            currentOffice: "Office of Student Affairs",
            dateReceived: "Jan 31, 2026",
            submittedBy: "Leonor Rivera",
        },
        {
            id: "DOC-2026-018",
            eventName: "Alumni Homecoming",
            organization: "Alumni Association",
            currentStatus: "Forwarded to OSA",
            currentOffice: "President's Office",
            dateReceived: "Feb 01, 2026",
            submittedBy: "Simoun Ibarra",
        },
        {
            id: "DOC-2026-020",
            eventName: "Literary Folio Launch",
            organization: "The Pillar Publication",
            currentStatus: "Under Review",
            currentOffice: "Office of Student Affairs",
            dateReceived: "Feb 02, 2026",
            submittedBy: "Basilio Santos",
        },
    ];

    const totalPages = Math.ceil(allPendingDocs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentDocs = allPendingDocs.slice(startIndex, startIndex + itemsPerPage);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Under Review":
                return "bg-amber-100 text-amber-700 border-amber-200";
            case "Forwarded to OSA":
                return "bg-blue-100 text-blue-700 border-blue-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans relative">
            {/* MOBILE HEADER */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-ustp-navy/80 backdrop-blur-xl border-b border-white/5 h-16 px-4 flex items-center justify-between z-50">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all active:scale-95"
                >
                    {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
                <div className="flex items-center gap-2">
                    <img src="/vistalogo.png" alt="Logo" className="w-7 h-7" />
                    <span className="font-bold tracking-tight text-white">VISTA</span>
                </div>
                <div className="w-10"></div>
            </div>

            {/* SIDE NAVIGATION */}
            <aside
                className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:flex w-64 flex flex-col pt-12 px-8 pb-8 space-y-10 
          fixed lg:relative inset-y-0 left-0 bg-ustp-navy z-40 transition-transform duration-300 ease-in-out
        `}
            >
                <h2 className="text-xl font-medium text-gray-400 uppercase tracking-widest pl-2">
                    System
                </h2>
                <nav className="flex flex-col space-y-6 flex-1">
                    <NavItem
                        icon={<LayoutDashboard size={20} />}
                        label="Dashboard"
                        onClick={() => navigate("/dashboard")}
                    />
                    <NavItem
                        icon={<Activity size={20} />}
                        label="Activity"
                        onClick={() => navigate("/activity")}
                    />
                    <NavItem
                        icon={<Clock size={20} />}
                        label="Pending"
                        active
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    <NavItem
                        icon={<FilePlus size={20} />}
                        label="New Document"
                        onClick={() => {
                            setIsSidebarOpen(false);
                            navigate("/new-document");
                        }}
                    />
                    <NavItem
                        icon={<Users size={20} />}
                        label="Organizations"
                        onClick={() => {
                            setIsSidebarOpen(false);
                            navigate("/organizations");
                        }}
                    />
                    <NavItem
                        icon={<User size={20} />}
                        label="Profile"
                        onClick={() => {
                            setIsSidebarOpen(false);
                            navigate("/profile");
                        }}
                    />
                </nav>
                {/* MOBILE PROFILE */}
                <div className="lg:hidden mt-auto border-t border-white/10 pt-8">
                    <AdminProfile {...adminData} variant="dark" />
                </div>
            </aside>

            {/* OVERLAY */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* MAIN CONTENT */}
            <main className="flex-1 bg-white text-neutral-dark rounded-none lg:rounded-[2.5rem] lg:my-4 lg:mr-4 p-4 lg:p-8 shadow-2xl flex flex-col lg:flex-row overflow-hidden relative">
                <div className="flex-1 lg:px-4 pt-12 lg:pt-4 overflow-y-auto scrollbar-hide">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h1 className="text-3xl lg:text-4xl font-bold text-ustp-navy">
                            Pending Actions
                        </h1>

                        <div className="flex items-center gap-2">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ustp-navy transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search documents..."
                                    className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-ustp-navy/20 focus:border-ustp-navy transition-all w-full md:w-64"
                                />
                            </div>
                            <button className="p-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
                                <Filter size={18} />
                            </button>
                        </div>
                    </div>

                    {/* TABLE CONTAINER */}
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
                                    {currentDocs.map((doc) => (
                                        <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-ustp-navy block">{doc.eventName}</span>
                                                <span className="text-[10px] text-gray-400 font-mono">{doc.id}</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 font-medium">{doc.organization}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusColor(doc.currentStatus)}`}>
                                                    {doc.currentStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-ustp-gold animate-pulse"></div>
                                                    <span className="text-gray-600">{doc.currentOffice}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{doc.dateReceived}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                                        {doc.submittedBy.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <span className="text-gray-600">{doc.submittedBy}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-1 text-gray-400 hover:text-ustp-navy transition-colors opacity-0 group-hover:opacity-100">
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
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, allPendingDocs.length)} of {allPendingDocs.length} pending approvals
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 text-xs font-bold transition-colors ${currentPage === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-ustp-navy'}`}
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
                                className={`px-4 py-2 text-xs font-bold transition-colors ${currentPage === totalPages ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-ustp-navy'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL: Desktop Profile */}
                <div className="hidden lg:flex w-80 border-l border-gray-100 pl-8 pt-4 flex-col items-center">
                    <AdminProfile {...adminData} variant="light" />
                    <div className="mt-auto flex flex-col items-center opacity-80 pb-4">
                        <img src="/vistalogo.png" alt="VISTA" className="w-20 h-20 mb-2 object-contain" />
                        <h2 className="text-2xl font-black text-ustp-navy tracking-tighter">VISTA</h2>
                        <p className="text-xs text-gray-400 font-medium">Track Your Docs.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- Helper Components ---
const NavItem = ({
    icon,
    label,
    active = false,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
}) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-4 cursor-pointer group transition-all duration-200 ${active
            ? "opacity-100 translate-x-2"
            : "opacity-60 hover:opacity-100 hover:translate-x-1"
            }`}
    >
        <div className={`${active ? "text-ustp-gold" : "text-white group-hover:text-ustp-gold"}`}>
            {icon}
        </div>
        <span className={`text-lg font-medium ${active ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
            {label}
        </span>
    </div>
);

export default PendingPage;
