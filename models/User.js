import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Optional fields for future profile features
  location: {
    type: String,
    default: "",
  },

  profilePicture: {
    type: String,
    default: "",
  },

  skills: {
    type: [String],
    default: [],
  },

  availability: {
    type: [String],
    enum: ["Weekends", "Evenings", "Mornings"],
    default: [],
  },

  status: {
    type: String,
    enum: ["Public", "Private"],
    default: "Public",
  }
});

const User = mongoose.model("User", userSchema);
export default User;
