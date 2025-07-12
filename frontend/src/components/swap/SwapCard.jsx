import React from "react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const SwapCard = ({
  swap,
  type, // "incoming", "outgoing", "ongoing", "completed"
  onAccept,
  onReject,
  onCancel,
  onMarkComplete,
  onLeaveFeedback,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-5 mb-4 hover:shadow-lg transition flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-200 rounded-full flex-shrink-0" />
        <div>
          <h3 className="text-lg font-semibold">{swap.partnerName}</h3>
          <p className="text-sm text-gray-600 mb-1">{swap.location}</p>
          <div className="flex flex-wrap gap-2 text-sm mb-1">
            <Badge className="bg-green-100 text-green-800">
              They offer: {swap.skillOffered}
            </Badge>
            <Badge className="bg-purple-100 text-purple-800">
              You offer: {swap.skillRequested}
            </Badge>
          </div>
          <p className="text-xs text-gray-500">
            Requested on: {new Date(swap.dateRequested).toLocaleDateString()}
          </p>
          {swap.availability && (
            <p className="text-xs text-gray-500">Availability: {swap.availability}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-end">
        {type === "incoming" && (
          <>
            <Button size="sm" onClick={() => onAccept(swap.id)}>
              Accept
            </Button>
            <Button size="sm" variant="outline" onClick={() => onReject(swap.id)}>
              Reject
            </Button>
          </>
        )}
        {type === "outgoing" && (
          <Button size="sm" variant="outline" onClick={() => onCancel(swap.id)}>
            Cancel
          </Button>
        )}
        {type === "ongoing" && (
          <>
            <Button size="sm" onClick={() => onMarkComplete(swap.id)}>
              Mark as Completed
            </Button>
            {/* Add Message button if chat exists */}
          </>
        )}
        {type === "completed" && (
          <Button size="sm" variant="outline" onClick={() => onLeaveFeedback(swap.id)}>
            Leave Feedback
          </Button>
        )}
      </div>
    </div>
  );
};

export default SwapCard;
