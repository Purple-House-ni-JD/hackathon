import React from "react";
import UserSidebar from "../../components/UserSidebar";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  FileText,
  Trash2,
} from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";
import type { Notification as NotificationType } from "../../types";
import { formatDistanceToNow } from "date-fns";

const UserNotifications = () => {
  const { data: notifications = [], isLoading, isError } = useNotifications();

  const getType = (n: NotificationType): "success" | "error" | "info" => {
    const t = (n.notification_type ?? n.subject ?? "").toLowerCase();
    if (t.includes("approv")) return "success";
    if (t.includes("reject") || t.includes("action") || t.includes("return")) return "error";
    return "info";
  };

  const getTitle = (n: NotificationType): string => {
    if (n.subject) return n.subject;
    const t = (n.notification_type ?? "").toLowerCase();
    if (t.includes("approv")) return "Document Approved";
    if (t.includes("reject") || t.includes("return")) return "Action Required";
    return "Document Received";
  };

  const getTime = (n: NotificationType): string => {
    if (!n.created_at) return "";
    try {
      return formatDistanceToNow(new Date(n.created_at), { addSuffix: true });
    } catch {
      return n.created_at;
    }
  };

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
      <UserSidebar activeTab="notifications" />

      <main className="flex-1 bg-white text-neutral-dark rounded-[2.5rem] my-4 mr-4 p-8 shadow-2xl flex flex-col overflow-hidden relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-ustp-navy">Notifications</h1>
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1"
            aria-label="Clear all (UI only)"
          >
            <Trash2 size={16} /> Clear All
          </button>
        </div>

        {isError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-4">
            <p className="text-red-600 font-medium">Failed to load notifications.</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin w-12 h-12 border-4 border-ustp-navy border-t-transparent rounded-full" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
            <Bell className="mx-auto text-gray-300" size={48} />
            <p className="text-gray-500 mt-4">No notifications yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => {
              const type = getType(notif);
              const title = getTitle(notif);
              const time = getTime(notif);
              return (
                <div
                  key={notif.id}
                  className={`p-5 rounded-2xl flex gap-4 transition-all hover:bg-gray-50 ${
                    type === "info" ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-100"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      type === "success"
                        ? "bg-green-100 text-green-600"
                        : type === "error"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {type === "success" ? (
                      <CheckCircle size={20} />
                    ) : type === "error" ? (
                      <AlertTriangle size={20} />
                    ) : (
                      <FileText size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-800">{title}</h4>
                      <span className="text-xs text-gray-400">{time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserNotifications;
