import express from "express";
import { login, register, getUsers } from "../controllers/auth.controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", authMiddleware, adminMiddleware, register);
router.get("/users", authMiddleware, adminMiddleware, getUsers);

export default router;
