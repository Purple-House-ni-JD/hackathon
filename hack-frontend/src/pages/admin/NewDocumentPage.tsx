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
    Plus,
    History,
    Bell,
    CheckCircle,
    FileText,
} from "lucide-react";
import AdminProfile from "../../components/AdminProfile";

const NewDocumentPage = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const adminData = {
        email: "osa.admin@ustp.edu.ph",
        role: "Super Admin",
        department: "Student Affairs",
        avatarUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
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

            {/* LEFT NAVIGATION */}
            <aside
                className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:flex w-64 flex flex-col pt-20 lg:pt-12 px-8 pb-8 space-y-10 
          fixed lg:relative inset-y-0 left-0 bg-ustp-navy z-40 transition-transform duration-300 ease-in-out
          overflow-y-auto scrollbar-hide
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
                        onClick={() => navigate("/pending")}
                    />
                    <NavItem
                        icon={<FilePlus size={20} />}
                        label="New Document"
                        active
                        onClick={() => setIsSidebarOpen(false)}
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
                <div className="flex-1 lg:px-4 pt-20 lg:pt-4 overflow-y-auto scrollbar-hide">
                    <h1 className="text-3xl lg:text-4xl font-bold text-ustp-navy mb-10">
                        Document Management
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* ACTION CARDS */}
                        <ActionCard
                            icon={<Plus className="text-white" size={32} />}
                            color="bg-purple-600"
                            title="Log New Document"
                            description="Register a new submission from a student organization."
                            buttonLabel="Create Entry"
                        />
                        <ActionCard
                            icon={<History className="text-white" size={32} />}
                            color="bg-ustp-gold"
                            title="Update Status"
                            description="Modify current routing status for existing documents."
                            buttonLabel="Update Record"
                        />
                        <ActionCard
                            icon={<Bell className="text-white" size={32} />}
                            color="bg-blue-600"
                            title="Manual Notifications"
                            description="Send custom alerts to organization representatives."
                            buttonLabel="Send Alert"
                        />
                        <ActionCard
                            icon={<FileText className="text-white" size={32} />}
                            color="bg-green-600"
                            title="Document History"
                            description="View the complete audit trail of status changes."
                            buttonLabel="View History"
                        />
                    </div>

                    {/* Quick Stats or Info */}
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

const ActionCard = ({
    icon,
    color,
    title,
    description,
    buttonLabel,
}: {
    icon: React.ReactNode;
    color: string;
    title: string;
    description: string;
    buttonLabel: string;
}) => (
    <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-start gap-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${color}`}>
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold text-ustp-navy mb-1">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
        <button className="mt-auto px-6 py-2 bg-ustp-navy text-white text-xs font-bold rounded-xl hover:bg-[#0c2136] transition-colors">
            {buttonLabel}
        </button>
    </div>
);

export default NewDocumentPage;
