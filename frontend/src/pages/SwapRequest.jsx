import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const initialIncomingRequests = [
  {
    id: 1,
    userPhoto: "https://i.pravatar.cc/100?img=1",
    name: "Alex Smith",
    skillOffered: "Video Editing",
    skillRequested: "Graphic Design",
    requestedOn: "2025-07-12T15:30:00",
    availability: ["Weekends", "Evenings"],
    message: "Hey! Would love to learn design — available after 6PM!",
    profileLink: "#",
  },
  {
    id: 2,
    userPhoto: "https://i.pravatar.cc/100?img=2",
    name: "Maria Garcia",
    skillOffered: "French",
    skillRequested: "Cooking",
    requestedOn: "2025-07-10T10:00:00",
    availability: ["Mornings"],
    message: "",
    profileLink: "#",
  },
];

const initialOutgoingRequests = [
  {
    id: 101,
    userPhoto: "https://i.pravatar.cc/100?img=3",
    name: "Jane Doe",
    skillOffered: "Digital Marketing",
    skillRequested: "Spanish Conversation",
    requestedOn: "2025-07-10T11:00:00",
    availability: ["Weekdays", "Evenings"],
    status: "Pending", // Pending, Accepted, Rejected
    profileLink: "#",
  },
  {
    id: 102,
    userPhoto: "https://i.pravatar.cc/100?img=4",
    name: "Michael Johnson",
    skillOffered: "Python Programming",
    skillRequested: "Guitar",
    requestedOn: "2025-06-20T09:00:00",
    availability: ["Weekends"],
    status: "Accepted",
    profileLink: "#",
  },
];

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const SwapRequests = () => {
  const [activeTab, setActiveTab] = useState("incoming");
  const [incomingRequests, setIncomingRequests] = useState(initialIncomingRequests);
  const [outgoingRequests, setOutgoingRequests] = useState(initialOutgoingRequests);

  const acceptRequest = (id) => {
    alert(`Accepted request id: ${id}`);
    setIncomingRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const rejectRequest = (id) => {
    if (window.confirm("Are you sure you want to reject this request?")) {
      setIncomingRequests((prev) => prev.filter((req) => req.id !== id));
    }
  };

  const cancelRequest = (id) => {
    if (window.confirm("Cancel this outgoing request?")) {
      setOutgoingRequests((prev) => prev.filter((req) => req.id !== id));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="flex flex-1 pt-[64px]"> {/* Adjust pt to your Navbar height */}
        {/* Fixed Sidebar */}
        <aside className="fixed top-[64px] left-0 bottom-0 w-56 border-r border-gray-200 bg-white z-40 overflow-auto">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="ml-56 flex-1 p-8 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen overflow-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-purple-700 mb-1">Swap Requests</h1>
            <p className="text-gray-600">Manage your incoming and outgoing skill swap requests.</p>
          </header>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-300">
            <button
              onClick={() => setActiveTab("incoming")}
              className={`pb-2 font-semibold ${
                activeTab === "incoming"
                  ? "border-b-4 border-purple-700 text-purple-700"
                  : "text-gray-600 hover:text-purple-700"
              }`}
            >
              📥 Incoming Requests ({incomingRequests.length})
            </button>
            <button
              onClick={() => setActiveTab("outgoing")}
              className={`pb-2 font-semibold ${
                activeTab === "outgoing"
                  ? "border-b-4 border-purple-700 text-purple-700"
                  : "text-gray-600 hover:text-purple-700"
              }`}
            >
              📤 Outgoing Requests ({outgoingRequests.length})
            </button>
          </div>

          {/* Incoming Requests */}
          {activeTab === "incoming" && (
            <>
              {incomingRequests.length === 0 ? (
                <p className="text-gray-600 italic">
                  You have no new swap requests right now. Browse skills to invite swaps!
                </p>
              ) : (
                <div className="flex flex-col gap-6">
                  {incomingRequests.map((req) => (
                    <div
                      key={req.id}
                      className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-start md:items-center gap-4 hover:shadow-lg transition"
                    >
                      <img
                        src={req.userPhoto}
                        alt={req.name}
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{req.name}</p>
                        <p className="text-gray-700">
                          Wants to swap:{" "}
                          <span className="inline-block ml-2 px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">
                            🎯 {req.skillOffered} (offered)
                          </span>{" "}
                          ↔{" "}
                          <span className="inline-block ml-2 px-2 py-0.5 rounded bg-green-100 text-green-800 font-medium">
                            🎯 {req.skillRequested} (requested)
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Requested on: {formatDate(req.requestedOn)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Availability:{" "}
                          {req.availability.length > 0 ? req.availability.join(", ") : "N/A"}
                        </p>
                        {req.message && (
                          <p className="italic text-gray-600 mt-2">Message: "{req.message}"</p>
                        )}
                        <a
                          href={req.profileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-purple-700 hover:underline font-semibold"
                        >
                          View Profile
                        </a>
                      </div>

                      <div className="flex gap-3 mt-4 md:mt-0">
                        <button
                          onClick={() => acceptRequest(req.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow-sm font-semibold transition"
                          aria-label={`Accept request from ${req.name}`}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => rejectRequest(req.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded shadow-sm font-semibold transition"
                          aria-label={`Reject request from ${req.name}`}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Outgoing Requests */}
          {activeTab === "outgoing" && (
            <>
              {outgoingRequests.length === 0 ? (
                <p className="text-gray-600 italic">
                  You haven’t sent any swap requests yet. Find users in Browse Skills to get started.
                </p>
              ) : (
                <div className="flex flex-col gap-6">
                  {outgoingRequests.map((req) => (
                    <div
                      key={req.id}
                      className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-start md:items-center gap-4 hover:shadow-lg transition"
                    >
                      <img
                        src={req.userPhoto}
                        alt={req.name}
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{req.name}</p>
                        <p className="text-gray-700">
                          Your request:{" "}
                          <span className="inline-block ml-2 px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">
                            🎯 {req.skillOffered} (offered)
                          </span>{" "}
                          ↔{" "}
                          <span className="inline-block ml-2 px-2 py-0.5 rounded bg-green-100 text-green-800 font-medium">
                            🎯 {req.skillRequested} (requested)
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Requested on: {formatDate(req.requestedOn)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Availability:{" "}
                          {req.availability.length > 0 ? req.availability.join(", ") : "N/A"}
                        </p>
                        <p className="text-sm mt-1">
                          Status:{" "}
                          <span
                            className={`font-semibold ${
                              req.status === "Pending"
                                ? "text-yellow-600"
                                : req.status === "Accepted"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {req.status}
                          </span>
                        </p>
                        <a
                          href={req.profileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-purple-700 hover:underline font-semibold"
                        >
                          View Profile
                        </a>
                      </div>

                      {req.status === "Pending" && (
                        <div className="flex gap-3 mt-4 md:mt-0">
                          <button
                            onClick={() => cancelRequest(req.id)}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded shadow-sm font-semibold transition"
                            aria-label={`Cancel request to ${req.name}`}
                          >
                            Cancel Request
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default SwapRequests;
