import React from "react";
import SwapCard from "./SwapCard";

const SwapList = ({
  title,
  swaps,
  type,
  onAccept,
  onReject,
  onCancel,
  onMarkComplete,
  onLeaveFeedback,
  emptyMessage,
}) => {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">{title}</h2>
      {swaps.length === 0 ? (
        <p className="text-gray-600">{emptyMessage}</p>
      ) : (
        swaps.map((swap) => (
          <SwapCard
            key={swap.id}
            swap={swap}
            type={type}
            onAccept={onAccept}
            onReject={onReject}
            onCancel={onCancel}
            onMarkComplete={onMarkComplete}
            onLeaveFeedback={onLeaveFeedback}
          />
        ))
      )}
    </section>
  );
};

export default SwapList;

