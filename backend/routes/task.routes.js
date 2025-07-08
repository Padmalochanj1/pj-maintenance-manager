import express from "express";
import { getTasks, getMyTasks, createTask, updateTask } from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.get("/my", authMiddleware, getMyTasks);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);

export default router;
