import express from "express";
import { createTask, getTaskById, updateTask } from "../controllers/taskController.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/aurhorize.js";

const router = express.Router();

router.post("/" , authMiddleware, authorize("CREATE_TASK"),  createTask )
router.get("/:id" , authMiddleware, getTaskById )
router.patch("/:id", authMiddleware, updateTask )

export default router;