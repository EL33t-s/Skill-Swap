import mongoose from "mongoose";

const swapRequestSchema = new mongoose.Schema({
  partnerName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "",
  },
  skillOffered: {
    type: String,
    required: true,
  },
  skillRequested: {
    type: String,
    required: true,
  },
  dateRequested: {
    type: Date,
    required: true,
  },
  availability: {
    type: String,
    enum: ["Weekends", "Evenings", "Mornings"],
    default: "Weekends",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
    default: "pending",
  },
  startedOn: {
    type: Date,
  },
  completedOn: {
    type: Date,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  feedback: {
    type: String,
    default: "",
  }
});

const swapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  incomingRequests: [swapRequestSchema],
  outgoingRequests: [swapRequestSchema],
  ongoingSwaps: [swapRequestSchema],
  completedSwaps: [swapRequestSchema],
}, { timestamps: true });

const Swap = mongoose.model("Swap", swapSchema);
export default Swap;
