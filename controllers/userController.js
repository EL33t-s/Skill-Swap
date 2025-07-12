import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Utility to remove password
const sanitizeUser = (user) => {
  const { password, ...userData } = user.toObject();
  return userData;
};

// Browse all users
export const browseUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Browse users error:", err);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

// Signup
export const signupUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json(sanitizeUser(newUser));
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not defined");
      return res.status(500).json({ message: "JWT secret not configured" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token, user: sanitizeUser(user) });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Get logged-in user's profile (via token)
export const getMe = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Get /me error:", err);
    res.status(500).json({ message: "Server error while fetching your profile" });
  }
};

// Get user by :userId (not recommended unless admin)
export const getOwnProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error("Get user profile by ID error:", err);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};

// Get another user's public profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error("Get public user profile error:", err);
    res.status(500).json({ message: "Server error while fetching user profile" });
  }
};

// Update user
export const editProfile = async (req, res) => {
  const { userId } = req.params;
  const {
    fullName,
    email,
    location,
    skills,
    availability,
    status,
    profilePicture,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Apply changes
    if (fullName !== undefined) user.fullName = fullName;
    if (email !== undefined) user.email = email;
    if (location !== undefined) user.location = location;
    if (skills !== undefined) user.skills = skills;
    if (availability !== undefined) user.availability = availability;
    if (status !== undefined) user.status = status;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;

    const updatedUser = await user.save();
    res.status(200).json(sanitizeUser(updatedUser));
  } catch (err) {
    console.error("Edit profile error:", err);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};
