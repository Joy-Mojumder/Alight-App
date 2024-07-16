import express from "express";
import {
  login,
  signup,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import { protectRouter } from "../middleware/protectRouter.js";

const router = express.Router();

router.get("/me", protectRouter, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
