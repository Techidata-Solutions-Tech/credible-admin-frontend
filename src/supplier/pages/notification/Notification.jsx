import React, { useState, useEffect } from "react";

const messages = {
  Order: ["New order received", "Order processed", "Order shipped"],
  Cancel: ["Order cancelled", "Cancellation requested"],
  Pickup: ["Ready for pickup", "Pickup scheduled"],
  Return: ["Return initiated", "Return processed"],
  Replacement: ["Replacement approved", "Replacement shipped"],
  "Low Stock": ["Stock running low", "Inventory alert"],
  "Dead Stock": ["Dead stock detected", "No movement in 30 days"],
  Rejected: ["Application rejected", "Review rejected"],
  Approved: ["Application approved", "Request approved"],
  Ticket: ["New support ticket", "Ticket status updated"],
  Review: ["New product review", "Review received"],
  Payment: ["Payment received", "Refund issued"],
  "GST Update": ["GST rules updated", "New GST alert"],
  "Policy Update": ["Policy changes", "New policy published"],
  Campaign: ["New marketing campaign", "Campaign success report"],
  Alert: ["System alert", "Security notification"],
  Update: ["Version update", "Feature release"],
  default: ["General notification", "Attention required"],
};

const NotificationPage = () => {
  const tabs = ["All Notifications", ...Object.keys(messages)];
  const [activeTab, setActiveTab] = useState("All Notifications");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (activeTab === "All Notifications") {
      const all = Object.values(messages).flat();
      setFilteredMessages(all);
    } else {
      setFilteredMessages(messages[activeTab] || []);
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
        </button>
        <h1 className="text-xl font-semibold capitalize text-gray-800">
          {activeTab}
        </h1>
      </header>

      <div className="flex flex-1 overflow-hidden mt-4">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-gray-700 text-white p-6 overflow-y-auto transition-all duration-300">
            <h2 className="text-lg font-semibold mb-4">Notification Types</h2>
            <ul className="space-y-2">
              {tabs.map((tab) => {
                const count =
                  tab === "All Notifications"
                    ? Object.values(messages).flat().length
                    : messages[tab]?.length || 0;

                return (
                  <li
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex justify-between items-center cursor-pointer px-4 py-2 rounded transition ${
                      activeTab === tab ? "bg-blue-600" : "hover:bg-gray-700"
                    }`}
                  >
                    <span>{tab}</span>
                    <span className="text-sm bg-white text-gray-800 rounded-full px-2 py-0.5">
                      {count}
                    </span>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="max-w-5xl mx-auto">
            {filteredMessages.length > 0 ? (
              <ul className="space-y-4">
                {filteredMessages.map((msg, index) => (
                  <li
                    key={index}
                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <p className="text-gray-800">{msg}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500 mt-12 text-lg">
                No messages available.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotificationPage;
