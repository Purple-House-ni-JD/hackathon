import React from "react";

interface AdminProfileProps {
    email: string;
    role: string;
    department: string;
    avatarUrl: string;
    variant?: "light" | "dark";
}

const AdminProfile: React.FC<AdminProfileProps> = ({
    email,
    role,
    department,
    avatarUrl,
    variant = "light",
}) => {
    const isDark = variant === "dark";

    return (
        <div className={`flex flex-col items-center w-full ${isDark ? "text-white" : "text-ustp-navy"}`}>
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-6 lg:mb-8 w-full">
                <div className="relative mb-4">
                    <img
                        src={avatarUrl}
                        alt="Profile"
                        className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl object-cover shadow-lg border-2 border-white/20"
                    />
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                        4
                    </div>
                </div>
                <h3 className={`text-xl font-bold text-center ${isDark ? "text-white" : "text-ustp-navy"}`}>
                    Admin Staff
                </h3>
                <p className={`text-sm underline cursor-pointer hover:text-ustp-gold transition-colors ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {email}
                </p>
            </div>

            {/* User Details */}
            <div className={`space-y-4 lg:space-y-6 w-full text-center ${isDark ? "lg:text-center" : "lg:text-left"} mb-8 lg:mb-0`}>
                <div>
                    <label className={`text-xs font-bold uppercase ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        Role
                    </label>
                    <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-ustp-navy"}`}>
                        {role}
                    </p>
                </div>
                <div>
                    <label className={`text-xs font-bold uppercase ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        Department
                    </label>
                    <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-ustp-navy"}`}>
                        {department}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
