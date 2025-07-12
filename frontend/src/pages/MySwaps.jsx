import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import SwapList from "../components/swap/SwapList";

const initialSwaps = {
  incomingRequests: [
    {
      id: 1,
      partnerName: "John Doe",
      location: "Mumbai",
      skillOffered: "Guitar Lessons",
      skillRequested: "Spanish Speaking",
      dateRequested: "2025-07-10",
      availability: "Weekends",
      status: "pending",
    },
  ],
  outgoingRequests: [
    {
      id: 2,
      partnerName: "Priya Singh",
      location: "Delhi",
      skillOffered: "Cooking",
      skillRequested: "ReactJS",
      dateRequested: "2025-07-08",
      availability: "Evenings",
      status: "pending",
    },
  ],
  ongoingSwaps: [
    {
      id: 3,
      partnerName: "Jane Doe",
      location: "Pune",
      skillOffered: "Cooking Lessons",
      skillRequested: "Yoga Training",
      dateRequested: "2025-07-09",
      availability: "Evenings",
      status: "accepted",
      startedOn: "2025-07-09",
    },
  ],
  completedSwaps: [
    {
      id: 4,
      partnerName: "Alex Smith",
      location: "Bangalore",
      skillOffered: "Video Editing",
      skillRequested: "Public Speaking",
      dateRequested: "2025-06-01",
      availability: "Weekends",
      status: "completed",
      completedOn: "2025-07-01",
      rating: 4,
      feedback: "Great swap experience!",
    },
  ],
};

const MySwaps = () => {
  const [tab, setTab] = useState("pending"); // "pending", "ongoing", "completed"
  const [swaps, setSwaps] = useState(initialSwaps);

  // Action Handlers
  const acceptRequest = (id, isIncoming) => {
    // Move swap from pending to ongoing
    setSwaps((prev) => {
      const requestsKey = isIncoming ? "incomingRequests" : "outgoingRequests";
      const requestIndex = prev[requestsKey].findIndex((s) => s.id === id);
      if (requestIndex === -1) return prev;

      const acceptedSwap = {
        ...prev[requestsKey][requestIndex],
        status: "accepted",
        startedOn: new Date().toISOString().slice(0, 10),
      };

      return {
        ...prev,
        [requestsKey]: prev[requestsKey].filter((s) => s.id !== id),
        ongoingSwaps: [acceptedSwap, ...prev.ongoingSwaps],
      };
    });
  };

  const rejectRequest = (id, isIncoming) => {
    // Remove request from pending
    setSwaps((prev) => {
      const requestsKey = isIncoming ? "incomingRequests" : "outgoingRequests";
      return {
        ...prev,
        [requestsKey]: prev[requestsKey].filter((s) => s.id !== id),
      };
    });
  };

  const cancelRequest = (id) => {
    // Remove from outgoingRequests
    setSwaps((prev) => ({
      ...prev,
      outgoingRequests: prev.outgoingRequests.filter((s) => s.id !== id),
    }));
  };

  const markCompleted = (id) => {
    setSwaps((prev) => {
      const ongoingIndex = prev.ongoingSwaps.findIndex((s) => s.id === id);
      if (ongoingIndex === -1) return prev;

      const completedSwap = {
        ...prev.ongoingSwaps[ongoingIndex],
        status: "completed",
        completedOn: new Date().toISOString().slice(0, 10),
      };

      return {
        ...prev,
        ongoingSwaps: prev.ongoingSwaps.filter((s) => s.id !== id),
        completedSwaps: [completedSwap, ...prev.completedSwaps],
      };
    });
  };

  const leaveFeedback = (id) => {
    alert(`Open feedback form for swap id: ${id}`);
    // You can implement modal form here
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 bg-gradient-to-br from-blue-50 to-purple-100 p-8 max-w-5xl mx-auto text-gray-800 overflow-auto">
          <h1 className="text-4xl font-bold mb-2 text-purple-700">My Swaps</h1>
          <p className="mb-8 text-gray-600">
            Manage your swap requests, ongoing swaps, and completed activities here.
          </p>

          {/* Tabs */}
          <div className="flex gap-6 mb-10 border-b border-gray-300">
            <button
              className={`pb-3 font-semibold ${
                tab === "pending"
                  ? "border-b-4 border-purple-700 text-purple-700"
                  : "text-gray-600 hover:text-purple-700"
              }`}
              onClick={() => setTab("pending")}
            >
              📨 Pending Requests
            </button>
            <button
              className={`pb-3 font-semibold ${
                tab === "ongoing"
                  ? "border-b-4 border-purple-700 text-purple-700"
                  : "text-gray-600 hover:text-purple-700"
              }`}
              onClick={() => setTab("ongoing")}
            >
              🔄 Ongoing Swaps
            </button>
            <button
              className={`pb-3 font-semibold ${
                tab === "completed"
                  ? "border-b-4 border-purple-700 text-purple-700"
                  : "text-gray-600 hover:text-purple-700"
              }`}
              onClick={() => setTab("completed")}
            >
              📜 Completed Swaps
            </button>
          </div>

          {/* Tab Content */}
          {tab === "pending" && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">Incoming Requests</h2>
              <SwapList
                swaps={swaps.incomingRequests}
                type="incoming"
                onAccept={(id) => acceptRequest(id, true)}
                onReject={(id) => rejectRequest(id, true)}
                emptyMessage="You have no incoming swap requests. Browse skills to find partners!"
              />

              <h2 className="text-2xl font-semibold mt-10 mb-4 text-purple-700">Outgoing Requests</h2>
              <SwapList
                swaps={swaps.outgoingRequests}
                type="outgoing"
                onCancel={cancelRequest}
                emptyMessage="You have no outgoing swap requests."
              />
            </>
          )}

          {tab === "ongoing" && (
            <SwapList
              swaps={swaps.ongoingSwaps}
              type="ongoing"
              onMarkComplete={markCompleted}
              emptyMessage="No ongoing swaps at the moment. Accept or request swaps to get started!"
            />
          )}

          {tab === "completed" && (
            <SwapList
              swaps={swaps.completedSwaps}
              type="completed"
              onLeaveFeedback={leaveFeedback}
              emptyMessage="Your completed swaps will show up here."
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default MySwaps;
