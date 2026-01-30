import React from "react";
import UserSidebar from "../../components/UserSidebar";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  FileText,
  Trash2,
} from "lucide-react";

const UserNotifications = () => {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Document Approved",
      msg: 'Your "General Assembly" design was approved by the Director.',
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "error",
      title: "Action Required",
      msg: "Budget Proposal was returned by Finance Office. Check remarks.",
      time: "Yesterday",
      read: true,
    },
    {
      id: 3,
      type: "info",
      title: "Document Received",
      msg: 'OSA Reception has received your "T-Shirt Request".',
      time: "Jan 28",
      read: true,
    },
  ];

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
      <UserSidebar activeTab="notifications" />

      <main className="flex-1 bg-white text-neutral-dark rounded-[2.5rem] my-4 mr-4 p-8 shadow-2xl flex flex-col overflow-hidden relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-ustp-navy">Notifications</h1>
          <button className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1">
            <Trash2 size={16} /> Clear All
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-5 rounded-2xl flex gap-4 transition-all hover:bg-gray-50 ${notif.read ? "bg-white opacity-70" : "bg-blue-50 border border-blue-100"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  notif.type === "success"
                    ? "bg-green-100 text-green-600"
                    : notif.type === "error"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                }`}
              >
                {notif.type === "success" ? (
                  <CheckCircle size={20} />
                ) : notif.type === "error" ? (
                  <AlertTriangle size={20} />
                ) : (
                  <FileText size={20} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4
                    className={`font-bold text-gray-800 ${!notif.read && "text-ustp-navy"}`}
                  >
                    {notif.title}
                  </h4>
                  <span className="text-xs text-gray-400">{notif.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notif.msg}</p>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserNotifications;
