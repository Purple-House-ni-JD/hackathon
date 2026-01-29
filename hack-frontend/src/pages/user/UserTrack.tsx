import React, { useState } from "react";
import UserSidebar from "../../components/UserSidebar";
import { Search, MapPin, Check, Clock, XCircle, FileText } from "lucide-react";

const UserTrack = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Timeline Data
  const timeline = [
    {
      status: "Received",
      office: "OSA Reception",
      date: "Jan 28, 10:00 AM",
      done: true,
      remarks: "Logged by Admin",
    },
    {
      status: "Reviewing",
      office: "Director of Student Affairs",
      date: "Jan 29, 02:30 PM",
      done: true,
      remarks: " Endorsed for budget",
    },
    {
      status: "Pending",
      office: "Budget Office",
      date: "In Progress",
      done: false,
      current: true,
      remarks: "Waiting for liquidation report",
    },
    {
      status: "Forwarding",
      office: "Finance Office",
      date: "---",
      done: false,
      remarks: "",
    },
    {
      status: "Final Approval",
      office: "Chancellor",
      date: "---",
      done: false,
      remarks: "",
    },
  ];

  return (
    <div className="flex h-screen bg-ustp-navy text-white overflow-hidden font-sans">
      <UserSidebar activeTab="track" />

      <main className="flex-1 bg-white text-neutral-dark rounded-[2.5rem] my-4 mr-4 p-8 shadow-2xl flex flex-col overflow-hidden relative">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto w-full text-center mt-8 mb-12">
          <h1 className="text-3xl font-bold text-ustp-navy mb-2">
            Track Your Document
          </h1>
          <p className="text-gray-500 mb-8">
            Enter your Tracking Reference Number (TRN) to see live status.
          </p>

          <div className="relative">
            <input
              type="text"
              placeholder="e.g., DOC-2026-001"
              className="w-full pl-6 pr-16 py-4 bg-white border-2 border-gray-200 rounded-full shadow-sm text-lg focus:outline-none focus:border-ustp-navy focus:ring-4 focus:ring-ustp-navy/10 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-2 top-2 bottom-2 bg-ustp-navy hover:bg-blue-900 text-white px-6 rounded-full font-bold transition flex items-center justify-center">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Result Card (Timeline) */}
        {/* Only show this if they "searched" (or for demo purposes, always show it) */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 md:px-20 pb-10">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            {/* Document Header */}
            <div className="flex items-center gap-4 border-b border-gray-200 pb-6 mb-8">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-ustp-navy">
                <FileText size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-ustp-navy">
                  Founders Day Budget Proposal
                </h2>
                <div className="flex gap-3 mt-1">
                  <span className="text-sm font-mono bg-ustp-navy text-white px-2 py-0.5 rounded">
                    DOC-2026-001
                  </span>
                  <span className="text-sm text-gray-500">
                    Submitted by: Computer Society
                  </span>
                </div>
              </div>
              <div className="ml-auto text-right hidden md:block">
                <p className="text-sm text-gray-500">Current Status</p>
                <p className="text-xl font-bold text-ustp-gold">Under Review</p>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-4">
              {/* Vertical Line */}
              <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gray-200"></div>

              <div className="space-y-8 relative">
                {timeline.map((step, index) => (
                  <div key={index} className="flex gap-6 relative">
                    {/* Dot/Icon */}
                    <div
                      className={`w-14 h-14 rounded-full border-4 flex-shrink-0 flex items-center justify-center z-10 bg-white ${
                        step.done
                          ? "border-green-500 text-green-500"
                          : step.current
                            ? "border-ustp-gold text-ustp-gold"
                            : "border-gray-200 text-gray-300"
                      }`}
                    >
                      {step.done ? (
                        <Check size={24} strokeWidth={3} />
                      ) : step.current ? (
                        <Clock size={24} strokeWidth={3} />
                      ) : (
                        <MapPin size={24} />
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 pt-2 ${step.current ? "opacity-100" : step.done ? "opacity-70" : "opacity-40"}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold text-gray-800">
                            {step.office}
                          </h4>
                          <p className="text-sm font-semibold text-ustp-navy">
                            {step.status}
                          </p>
                        </div>
                        <span className="text-sm font-mono text-gray-500">
                          {step.date}
                        </span>
                      </div>
                      {step.remarks && (
                        <div className="mt-2 bg-white p-3 rounded-lg border border-gray-200 text-sm text-gray-600 inline-block">
                          <span className="font-bold text-xs uppercase text-gray-400 block mb-1">
                            Remarks
                          </span>
                          {step.remarks}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserTrack;
