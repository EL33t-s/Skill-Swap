import express from "express";
import {
  browseUsers,
  signupUser,
  loginUser,
  editProfile,
  getOwnProfile,
  getUserProfile,
  getMe,
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/", browseUsers);

router.get("/me", authMiddleware, getMe); // 🔐 Get profile via token
router.get("/profile/:id", getUserProfile);
router.get("/:userId", getOwnProfile);
router.put("/:userId", editProfile);

export default router;
