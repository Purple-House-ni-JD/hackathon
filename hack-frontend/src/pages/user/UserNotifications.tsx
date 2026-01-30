import React from "react";
import UserSidebar from "../../components/UserSidebar";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  FileText,
  Trash2,
  Info,
} from "lucide-react";
import {
  useNotifications,
  useMarkNotificationRead,
  useClearNotifications,
} from "../../hooks/useNotifications";
import { type Notification } from "../../types";

const UserNotifications = () => {
  // 1. Fetch Data
  const { data: notifications = [], isLoading } = useNotifications();
  const markReadMutation = useMarkNotificationRead();
  const clearAllMutation = useClearNotifications();

  // 2. Helper to map Backend Status to UI Styles
  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "document_approved":
      case "approved":
        return {
          style: "bg-green-100 text-green-600",
          icon: <CheckCircle size={20} />,
        };
      case "document_rejected":
      case "returned":
      case "error":
        return {
          style: "bg-red-100 text-red-600",
          icon: <AlertTriangle size={20} />,
        };
      default: // 'info', 'received', 'forwarded'
        return {
          style: "bg-blue-100 text-blue-600",
          icon: <FileText size={20} />,
        };
    }
  };

  const handleMarkRead = (notif: Notification) => {
    if (notif.status !== "read") {
      markReadMutation.mutate(notif.id);
    }
  };

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
      <UserSidebar activeTab="notifications" />

      <main className="flex-1 bg-white text-neutral-dark rounded-[2.5rem] my-4 mr-4 p-8 shadow-2xl flex flex-col overflow-hidden relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-ustp-navy">Notifications</h1>

          {notifications.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Clear all notifications?"))
                  clearAllMutation.mutate();
              }}
              className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors"
            >
              <Trash2 size={16} /> Clear All
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4">
          {isLoading ? (
            <p className="text-gray-400 text-center mt-10">
              Loading updates...
            </p>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-2xl opacity-60">
              <Bell size={40} className="text-gray-300 mb-2" />
              <p className="text-gray-400">No new notifications</p>
            </div>
          ) : (
            notifications.map((notif) => {
              // Determine style based on notification_type from DB
              const { style, icon } = getNotificationStyle(
                notif.notification_type || "info",
              );
              const isRead = notif.status === "read";

              return (
                <div
                  key={notif.id}
                  onClick={() => handleMarkRead(notif)}
                  className={`p-5 rounded-2xl flex gap-4 transition-all cursor-pointer border ${
                    isRead
                      ? "bg-white border-transparent opacity-60"
                      : "bg-blue-50/50 border-blue-100 hover:bg-blue-50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${style}`}
                  >
                    {icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4
                        className={`font-bold text-gray-800 ${!isRead && "text-ustp-navy"}`}
                      >
                        {notif.subject}
                      </h4>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {new Date(notif.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 font-medium">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {!isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default UserNotifications;
